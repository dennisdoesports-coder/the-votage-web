import { GeofenceZone } from './geofence.config';

export interface GeofenceEvaluation {
  isWithinBounds: boolean;
  activeZone: GeofenceZone | null;
  nearestZone: GeofenceZone;
  nearestDistanceKm: number;
  allDistances: Array<{
    zone: GeofenceZone;
    distanceKm: number;
    isInside: boolean;
  }>;
}

/**
 * Calculates the Great-Circle distance between two coordinates using the Haversine formula in Kilometers.
 */
export function calculateDistanceKm(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Earth's radius in kilometers
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function toRad(degrees: number): number {
  return (degrees * Math.PI) / 180;
}

/**
 * Formats a distance in kilometers to a human-readable string.
 * Example: 0.35 km -> "350 m", 2.34 km -> "2.3 km"
 */
export function formatDistance(distanceKm: number): string {
  if (distanceKm < 1) {
    const meters = Math.round(distanceKm * 1000);
    return `${meters} m`;
  }
  return `${distanceKm.toFixed(1)} km`;
}

/**
 * Evaluates whether a given user location is within ANY authorized geofence zone.
 */
export function evaluateGeofence(
  userLat: number,
  userLng: number,
  zones: GeofenceZone[]
): GeofenceEvaluation {
  if (zones.length === 0) {
    throw new Error('No geofence zones provided for evaluation.');
  }

  const allDistances = zones.map((zone) => {
    const distanceKm = calculateDistanceKm(
      userLat,
      userLng,
      zone.latitude,
      zone.longitude
    );
    const isInside = distanceKm <= zone.radiusKm;
    return { zone, distanceKm, isInside };
  });

  // Check if inside any zone
  const insideMatch = allDistances.find((d) => d.isInside);
  const isWithinBounds = !!insideMatch;
  const activeZone = insideMatch ? insideMatch.zone : null;

  // Find nearest zone
  const sorted = [...allDistances].sort((a, b) => a.distanceKm - b.distanceKm);
  const nearest = sorted[0];

  return {
    isWithinBounds,
    activeZone,
    nearestZone: nearest.zone,
    nearestDistanceKm: nearest.distanceKm,
    allDistances,
  };
}
