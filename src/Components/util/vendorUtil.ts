export const isStoreOpen = (
  openingTime: string,
  closingTime: string,
): boolean => {
  const now = new Date();
  let currentTime = now.getHours() * 60 + now.getMinutes(); // Current time in minutes

  const convertTimeToMinutes = (timeString: string) => {
    const [time, period] = timeString.split(' ');
    const [hours, minutes] = time.split(':').map(Number);

    let hour = hours;
    if (period.toUpperCase() === 'PM' && hour !== 12) {
      hour += 12;
    }
    if (period.toUpperCase() === 'AM' && hour === 12) {
      hour = 0;
    }

    return hour * 60 + minutes;
  };

  const openingMinutes = convertTimeToMinutes(openingTime);
  let closingMinutes = convertTimeToMinutes(closingTime);

  // Handle overnight closing time (e.g., 6:30 PM - 2:30 AM)
  if (closingMinutes < openingMinutes) {
    closingMinutes += 24 * 60;
    if (currentTime < openingMinutes) {
      currentTime += 24 * 60;
    }
  }

  return currentTime >= openingMinutes && currentTime <= closingMinutes;
};
