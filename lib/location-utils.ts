// lib/location-utils.ts

export interface Coordinates {
    lat: number;
    lng: number;
  }
  
  /**
   * Calculate distance between two coordinates using Haversine formula
   * Returns distance in miles
   */
  export function calculateDistance(
    coord1: Coordinates,
    coord2: Coordinates
  ): number {
    const R = 3959; // Earth's radius in miles
    const dLat = toRad(coord2.lat - coord1.lat);
    const dLng = toRad(coord2.lng - coord1.lng);
  
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(coord1.lat)) *
        Math.cos(toRad(coord2.lat)) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2);
  
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }
  
  function toRad(degrees: number): number {
    return degrees * (Math.PI / 180);
  }
  
  /**
   * Get user's current location
   * Returns a promise that resolves with coordinates or rejects with error
   */
  export function getUserLocation(): Promise<Coordinates> {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocation is not supported by your browser'));
        return;
      }
  
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          let message = 'Unable to retrieve your location';
          switch (error.code) {
            case error.PERMISSION_DENIED:
              message = 'Location permission denied';
              break;
            case error.POSITION_UNAVAILABLE:
              message = 'Location information unavailable';
              break;
            case error.TIMEOUT:
              message = 'Location request timed out';
              break;
          }
          reject(new Error(message));
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        }
      );
    });
  }
  
  /**
   * Check if user is within the allowed radius of a location
   */
  export function isWithinRadius(
    userCoords: Coordinates,
    targetCoords: Coordinates,
    radiusMiles: number = 1
  ): boolean {
    const distance = calculateDistance(userCoords, targetCoords);
    return distance <= radiusMiles;
  }