'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  GEOFENCE_CONFIG,
  GeofenceZone,
} from '@/lib/geofence/geofence.config';
import {
  evaluateGeofence,
  GeofenceEvaluation,
} from '@/lib/geofence/geo-utils';

export type GeofenceStatus =
  | 'idle'
  | 'checking'
  | 'allowed'
  | 'out_of_bounds'
  | 'permission_denied'
  | 'position_unavailable'
  | 'timeout'
  | 'unsupported'
  | 'disabled';

export interface UseGeofenceReturn {
  status: GeofenceStatus;
  evaluation: GeofenceEvaluation | null;
  userCoords: { latitude: number; longitude: number; accuracy: number } | null;
  errorMessage: string | null;
  isBypassed: boolean;
  zones: GeofenceZone[];
  retryCheck: () => void;
  isRetrying: boolean;
  permissionState: PermissionState | null;
}

export function useGeofence(zonesOverride?: GeofenceZone[]): UseGeofenceReturn {
  const searchParams = useSearchParams();
  const zones: GeofenceZone[] = zonesOverride || GEOFENCE_CONFIG.zones;

  // Developer bypass param (?bypass_geo=true)
  const isBypassed = searchParams?.get('bypass_geo') === 'true';

  const [status, setStatus] = useState<GeofenceStatus>('idle');
  const [isRetrying, setIsRetrying] = useState(false);
  const [evaluation, setEvaluation] = useState<GeofenceEvaluation | null>(null);
  const [userCoords, setUserCoords] = useState<{
    latitude: number;
    longitude: number;
    accuracy: number;
  } | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [permissionState, setPermissionState] = useState<PermissionState | null>(null);

  const watchIdRef = useRef<number | null>(null);
  const watchdogTimerRef = useRef<NodeJS.Timeout | null>(null);

  const processCoordinates = useCallback(
    (latitude: number, longitude: number, accuracy: number) => {
      setUserCoords({ latitude, longitude, accuracy });
      try {
        const evalResult = evaluateGeofence(latitude, longitude, zones);
        setEvaluation(evalResult);

        if (evalResult.isWithinBounds) {
          setStatus('allowed');
        } else {
          setStatus('out_of_bounds');
        }
      } catch (err) {
        setStatus('position_unavailable');
        setErrorMessage(
          err instanceof Error ? err.message : 'Error evaluating geofence location.'
        );
      }
    },
    [zones]
  );

  const requestPositionWithFallback = useCallback(
    (highAccuracy: boolean) => {
      const options: PositionOptions = {
        enableHighAccuracy: highAccuracy,
        timeout: highAccuracy ? GEOFENCE_CONFIG.timeoutMs : 8000,
        maximumAge: GEOFENCE_CONFIG.maximumAgeMs,
      };

      navigator.geolocation.getCurrentPosition(
        (position) => {
          if (watchdogTimerRef.current) {
            clearTimeout(watchdogTimerRef.current);
            watchdogTimerRef.current = null;
          }
          setIsRetrying(false);
          const { latitude, longitude, accuracy } = position.coords;
          processCoordinates(latitude, longitude, accuracy);

          // Start continuous real-time watch
          try {
            if (watchIdRef.current !== null) {
              navigator.geolocation.clearWatch(watchIdRef.current);
            }
            watchIdRef.current = navigator.geolocation.watchPosition(
              (livePos) => {
                const { latitude: liveLat, longitude: liveLng, accuracy: liveAcc } =
                  livePos.coords;
                processCoordinates(liveLat, liveLng, liveAcc);
              },
              () => {},
              { enableHighAccuracy: highAccuracy, maximumAge: 5000 }
            );
          } catch {
            // fallback
          }
        },
        (error) => {
          // If High-Accuracy satellite lock failed/timed out on mobile data, try standard cellular positioning
          if (highAccuracy && (error.code === error.TIMEOUT || error.code === error.POSITION_UNAVAILABLE)) {
            requestPositionWithFallback(false);
            return;
          }

          if (watchdogTimerRef.current) {
            clearTimeout(watchdogTimerRef.current);
            watchdogTimerRef.current = null;
          }

          setTimeout(() => setIsRetrying(false), 400);

          switch (error.code) {
            case error.PERMISSION_DENIED:
              setStatus('permission_denied');
              setErrorMessage(
                'Location permission was denied. Please allow location access in your address bar or device settings.'
              );
              break;
            case error.POSITION_UNAVAILABLE:
              setStatus('position_unavailable');
              setErrorMessage(
                'Location signal is unavailable on your mobile network. Please ensure GPS/Location is enabled on your device.'
              );
              break;
            case error.TIMEOUT:
              setStatus('timeout');
              setErrorMessage(
                'Location request timed out. Please tap Retry to request location again.'
              );
              break;
            default:
              setStatus('position_unavailable');
              setErrorMessage(error.message || 'An error occurred while requesting location.');
              break;
          }
        },
        options
      );
    },
    [processCoordinates]
  );

  const checkLocation = useCallback(
    (isRetryAction = false) => {
      if (!GEOFENCE_CONFIG.enabled) {
        setStatus('disabled');
        setIsRetrying(false);
        return;
      }

      if (isBypassed) {
        setStatus('allowed');
        setIsRetrying(false);
        return;
      }

      if (typeof window === 'undefined' || !navigator.geolocation) {
        setStatus('unsupported');
        setErrorMessage('Geolocation is not supported by your browser.');
        setIsRetrying(false);
        return;
      }

      if (isRetryAction) {
        setIsRetrying(true);
      } else {
        setStatus((prev) => (prev === 'idle' ? 'checking' : prev));
      }
      setErrorMessage(null);

      if (watchIdRef.current !== null) {
        navigator.geolocation.clearWatch(watchIdRef.current);
        watchIdRef.current = null;
      }

      if (watchdogTimerRef.current) {
        clearTimeout(watchdogTimerRef.current);
      }

      // Safety watchdog: prevent mobile browsers from hanging indefinitely without triggering callbacks
      watchdogTimerRef.current = setTimeout(() => {
        setStatus((prev) => {
          if (prev === 'checking') {
            setIsRetrying(false);
            setErrorMessage('Location check is taking longer on mobile network. Please tap Retry.');
            return 'timeout';
          }
          return prev;
        });
      }, 10000);

      // Start with high accuracy, auto-falls back to standard cellular mode if needed
      requestPositionWithFallback(GEOFENCE_CONFIG.highAccuracy);
    },
    [isBypassed, requestPositionWithFallback]
  );

  // Monitor permission state changes
  useEffect(() => {
    if (typeof window !== 'undefined' && navigator.permissions && navigator.permissions.query) {
      navigator.permissions
        .query({ name: 'geolocation' })
        .then((permissionStatus) => {
          setPermissionState(permissionStatus.state);
          permissionStatus.onchange = () => {
            setPermissionState(permissionStatus.state);
            if (permissionStatus.state === 'granted' || permissionStatus.state === 'prompt') {
              checkLocation(false);
            }
          };
        })
        .catch(() => {});
    }
  }, [checkLocation]);

  // Tab focus listener — auto-retry when user returns after changing settings
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleFocus = () => {
      if (
        status === 'permission_denied' ||
        status === 'position_unavailable' ||
        status === 'timeout'
      ) {
        checkLocation(false);
      }
    };

    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, [status, checkLocation]);

  // Initial check on mount
  useEffect(() => {
    checkLocation(false);
    return () => {
      if (watchIdRef.current !== null && typeof window !== 'undefined') {
        navigator.geolocation.clearWatch(watchIdRef.current);
      }
      if (watchdogTimerRef.current) {
        clearTimeout(watchdogTimerRef.current);
      }
    };
  }, [checkLocation]);

  return {
    status,
    evaluation,
    userCoords,
    errorMessage,
    isBypassed,
    zones,
    retryCheck: () => checkLocation(true),
    isRetrying,
    permissionState,
  };
}
