// Haversine formula to calculate distance between two coordinates
const haversineDistance = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
): number => {
  const toRadians = (degrees: number) => (degrees * Math.PI) / 180;
  const R = 6371; // Radius of the Earth in km
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) *
      Math.cos(toRadians(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in km
};

// Function to auto-select the nearest campus within a given radius
export const autoSelectCampus = (
  deviceLat: number,
  deviceLon: number,
  campusses: any[],
  radiusKm: number = 10,
): string | undefined => {
  let nearestCampus: {campus: any; distance: number} = {
    campus: undefined,
    distance: Infinity,
  };

  for (const campus of campusses) {
    // Skip if coordinates are invalid
    if (
      typeof campus.latitude !== 'number' ||
      typeof campus.longitude !== 'number'
    ) {
      continue; // Skip this campus
    }

    // Calculate distance
    const distance = haversineDistance(
      deviceLat,
      deviceLon,
      campus.latitude,
      campus.longitude,
    );
    // console.log(`Distance to ${campus.value}:`, distance);
    // Check if the campus is within the radius and closer than the current closest
    if (distance <= radiusKm && distance < nearestCampus.distance) {
      nearestCampus = {campus, distance};

      // Early exit if a campus is found within the radius
      if (distance === 0) {
        break; // Exact match, no need to check further
      }
    }
  }

  // Return the campus ID of the nearest campus
  return nearestCampus.campus?.value;
};
