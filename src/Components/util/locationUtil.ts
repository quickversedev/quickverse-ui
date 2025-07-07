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
  return R * c; 
};


export const autoSelectCampus = (
  deviceLat: number,
  deviceLon: number,
  campusses: any[],
  radiusKm: number = 25, // Increased default radius to 25km
): string | undefined => {
  let nearestCampus: {campus: any | undefined; distance: number} = {
    campus: undefined,
    distance: Infinity,
  };  
  for (const campus of campusses) {
    // Skip if coordinates are invalid
    if (
      typeof campus.latitude !== 'number' ||
      typeof campus.longitude !== 'number'
    ) {
      // console.log('Skipping campus with invalid coordinates:', campus);
      continue; // Skip this campus
    }

    // Calculate distance
    const distance = haversineDistance(
      deviceLat,
      deviceLon,
      campus.latitude,
      campus.longitude,
    );
    
    // console.log(`Distance to ${(campus as any).displayName} (${(campus as any).value}):`, distance.toFixed(2), 'km');
    
    // Check if the campus is within the radius and closer than the current closest
    if (distance <= radiusKm && distance < nearestCampus.distance) {
      nearestCampus = {campus, distance};
      // console.log(`Found closer campus: ${(campus as any).displayName} at ${distance.toFixed(2)}km`);

      // Early exit if a campus is found within the radius
      if (distance === 0) {
        break; // Exact match, no need to check further
      }
    }
  }
  
      if (nearestCampus.campus) {
      console.log('Selected campus:', (nearestCampus.campus as any).displayName, 'at', nearestCampus.distance.toFixed(2), 'km');
    } else {
    
    // Fallback: Find the nearest campus regardless of radius
    let fallbackNearest = {campus: undefined, distance: Infinity};
    for (const campus of campusses) {
      if (typeof campus.latitude === 'number' && typeof campus.longitude === 'number') {
        const distance = haversineDistance(deviceLat, deviceLon, campus.latitude, campus.longitude);
        if (distance < fallbackNearest.distance) {
          fallbackNearest = {campus, distance};
        }
      }
    }
    
    if (fallbackNearest.campus) {
      // console.log('Fallback: Using nearest campus:', (fallbackNearest.campus as any).displayName, 'at', fallbackNearest.distance.toFixed(2), 'km');
      return (fallbackNearest.campus as any).value;
    }
  }
  
  return (nearestCampus.campus as any)?.value;
};
