import {Platform} from 'react-native';
import {
  PERMISSIONS,
  request,
  check,
  RESULTS,
  Permission,
} from 'react-native-permissions';

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
    const result = await request(permission);
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
    const result = await request(permission);
    return mapResultToStatus(result);
  } catch (error) {
    console.error('Error requesting photo library permission:', error);
    return 'denied';
  }
};

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
}> => {
  try {
    const camera = await requestCameraPermission();
    const photoLibrary = await requestPhotoLibraryPermission();

    return {camera, photoLibrary};
  } catch (error) {
    console.error('Error requesting all permissions:', error);
    throw error;
  }
};

const checkPermissionStatus = async (
  permission: Permission,
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

    return {camera, photoLibrary};
  } catch (error) {
    console.error('Error checking all permissions:', error);
    throw error;
  }
};
