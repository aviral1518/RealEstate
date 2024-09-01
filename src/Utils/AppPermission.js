import { Platform } from 'react-native';
import {
  check, request, PERMISSIONS, RESULTS,
} from 'react-native-permissions';

const PLATFORM_CONTACT_PERMISSION = {
  ios: PERMISSIONS.IOS.CONTACTS,
  android: PERMISSIONS.ANDROID.READ_CONTACTS,
};

const PLATFORM_CONTACT_WRITE_PERMISSION = {
  ios: PERMISSIONS.IOS.CONTACTS,
  android: PERMISSIONS.ANDROID.WRITE_CONTACTS,
};

const PLATFORM_LOCATION_PERMISSION = {
  ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
  android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
};

const PLATFORM_LOCATION_PERMISSION_ALWAYS = {
  ios: PERMISSIONS.IOS.LOCATION_ALWAYS,
  android: PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION,
};

const PLATFORM_CAMERA_PERMISSION = {
  ios: PERMISSIONS.IOS.CAMERA,
  android: PERMISSIONS.ANDROID.CAMERA,
};

const PLATFORM_AUDIO_RECORD_PERMISSION = {
  ios: PERMISSIONS.IOS.MICROPHONE,
  android: PERMISSIONS.ANDROID.RECORD_AUDIO,
};

const PLATFORM_WRITE_STORAGE_PERMISSION = {
  ios: PERMISSIONS.IOS.PHOTO_LIBRARY,
  android: PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
};

const REQUEST_PERMISSION_TYPE = {
  location: PLATFORM_LOCATION_PERMISSION,
  locationAlways: PLATFORM_LOCATION_PERMISSION_ALWAYS,
  camera: PLATFORM_CAMERA_PERMISSION,
  mic: PLATFORM_AUDIO_RECORD_PERMISSION,
  writeStorage: PLATFORM_WRITE_STORAGE_PERMISSION,
  readContact:PLATFORM_CONTACT_PERMISSION,
  writeContact:PLATFORM_CONTACT_WRITE_PERMISSION,
};

export const PERMISSIONS_TYPE = {
  location: 'location',
  locationAlways: 'locationAlways',
  camera: 'camera',
  readContact:'readContact',
  writeContact:'writeContact',
  writeStorage:'writeStorage',
};

export const checkPermission = (type) => new Promise((resolve, reject) => {
  const permissions = REQUEST_PERMISSION_TYPE[type][Platform.OS];
  check(permissions)
    .then((result) => {
      if (result === RESULTS.GRANTED) {
        resolve(true);
      } else {
        requestPermission(permissions)
          .then((res) => {
            resolve(res === RESULTS.GRANTED);
          })
          .catch((error) => {
            reject(error);
          });
      }
    })
    .catch((error) => {
      reject(error);
    });
});

const requestPermission = (permissions) => new Promise((resolve, reject) => {
  request(permissions)
    .then((result) => {
      resolve(result);
    })
    .catch((error) => {
      reject(error);
    });
});
