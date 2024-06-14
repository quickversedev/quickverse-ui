// src/mock/campusIds.ts

// Mock data for campus IDs
export const campusIds: string[] = [
  'Campus ID 1',
  'Campus ID 2',
  'Campus ID 3',
  'Campus ID 4',
  'Campus ID 5',
];

// Mock API function to fetch campus IDs
export const fetchCampusIds = (): Promise<string[]> => {
  return new Promise(resolve => {
    // Simulate network delay with setTimeout
    setTimeout(() => {
      resolve(campusIds);
    }, 1000); // 1 second delay
  });
};
