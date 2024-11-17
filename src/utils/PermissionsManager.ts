import {Platform} from 'react-native';
import {
  PERMISSIONS,
  request,
  check,
  RESULTS,
  Permission,
} from 'react-native-permissions';

// Define a type for the permission status
type PermissionStatus =
  | 'unavailable'
  | 'denied'
  | 'blocked'
  | 'granted'
  | 'limited';

const requestCameraPermission = async (): Promise<PermissionStatus> => {
  const permission: Permission =
    Platform.OS === 'ios' ? PERMISSIONS.IOS.CAMERA : PERMISSIONS.ANDROID.CAMERA;

  try {
    const result = await request(permission); // Correctly passing the permission object
    return mapResultToStatus(result);
  } catch (error) {
    console.error('Error requesting camera permission:', error);
    return 'denied';
  }
};

const requestPhotoLibraryPermission = async (): Promise<PermissionStatus> => {
  const permission: Permission =
    Platform.OS === 'ios'
      ? PERMISSIONS.IOS.PHOTO_LIBRARY
      : PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE;

  try {
    const result = await request(permission); // Correctly passing the permission object
    return mapResultToStatus(result);
  } catch (error) {
    console.error('Error requesting photo library permission:', error);
    return 'denied';
  }
};

const requestLocationPermission = async (): Promise<PermissionStatus> => {
  const permission: Permission =
    Platform.OS === 'ios'
      ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
      : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;

  try {
    const result = await request(permission); // Correctly passing the permission object
    return mapResultToStatus(result);
  } catch (error) {
    console.error('Error requesting location permission:', error);
    return 'denied';
  }
};

// Helper function to map the result to the custom PermissionStatus type
const mapResultToStatus = (result: string): PermissionStatus => {
  switch (result) {
    case RESULTS.GRANTED:
      return 'granted';
    case RESULTS.DENIED:
      return 'denied';
    case RESULTS.BLOCKED:
      return 'blocked';
    case RESULTS.UNAVAILABLE:
      return 'unavailable';
    case RESULTS.LIMITED:
      return 'limited';
    default:
      return 'denied';
  }
};

export const requestAllPermissions = async (): Promise<{
  camera: PermissionStatus;
  photoLibrary: PermissionStatus;
  location: PermissionStatus;
}> => {
  try {
    const camera = await requestCameraPermission();
    const photoLibrary = await requestPhotoLibraryPermission();
    const location = await requestLocationPermission();

    return {camera, photoLibrary, location};
  } catch (error) {
    console.error('Error requesting all permissions:', error);
    throw error;
  }
};

const checkPermissionStatus = async (
  permission: Permission, // Corrected the type to Permission
): Promise<PermissionStatus> => {
  try {
    const result = await check(permission);
    return mapResultToStatus(result);
  } catch (error) {
    console.error('Error checking permission status:', error);
    return 'denied';
  }
};

export const checkAllPermissions = async (): Promise<{
  camera: PermissionStatus;
  photoLibrary: PermissionStatus;
  location: PermissionStatus;
}> => {
  try {
    const camera = await checkPermissionStatus(
      Platform.OS === 'ios'
        ? PERMISSIONS.IOS.CAMERA
        : PERMISSIONS.ANDROID.CAMERA,
    );
    const photoLibrary = await checkPermissionStatus(
      Platform.OS === 'ios'
        ? PERMISSIONS.IOS.PHOTO_LIBRARY
        : PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
    );
    const location = await checkPermissionStatus(
      Platform.OS === 'ios'
        ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
        : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
    );

    return {camera, photoLibrary, location};
  } catch (error) {
    console.error('Error checking all permissions:', error);
    throw error;
  }
};
