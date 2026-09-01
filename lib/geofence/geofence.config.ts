export interface GeofenceZone {
  id: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  radiusKm: number;
}

export interface GeofenceConfig {
  enabled: boolean;
  zones: GeofenceZone[];
  highAccuracy: boolean;
  timeoutMs: number;
  maximumAgeMs: number;
}

export const DEFAULT_GEOFENCE_ZONES: GeofenceZone[] = [
  {
    id: 'winlos-centre',
    name: 'The Winlos Centre',
    address: 'The Winlos Centre, Benin City, Edo State',
    latitude: 6.2768368,
    longitude: 5.575018,
    radiusKm: 0.25, // 250 meters radius
  },
  {
    id: 'airport-rd-oka',
    name: '144 Airport Road',
    address: '144 Airport Rd, Oka, Benin City 300251, Edo State',
    latitude: 6.2973797,
    longitude: 5.5921004,
    radiusKm: 0.25, // 250 meters radius
  },
  {
    id: 'venue-location-3',
    name: 'Authorized Venue Location 3',
    address: 'Benin City, Edo State (6.26065, 5.60148)',
    latitude: 6.260650427468145,
    longitude: 5.601475436188118,
    radiusKm: 0.25, // 250 meters radius
  },
];

export const GEOFENCE_CONFIG: GeofenceConfig = {
  // Enabled by default unless explicitly set to false
  enabled: process.env.NEXT_PUBLIC_GEOFENCE_ENABLED !== 'false',
  zones: DEFAULT_GEOFENCE_ZONES,
  highAccuracy: true,
  timeoutMs: 15000, // 15 seconds to acquire high-accuracy GPS fix
  maximumAgeMs: 0, // Never use stale cached coordinates
};
