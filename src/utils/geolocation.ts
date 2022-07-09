import { PermissionsAndroid, Platform } from 'react-native';
import Geolocation from '@react-native-community/geolocation';

import { Logger } from '@utils/logger';

const logger = new Logger('Geolocation');

export const geolocation = {
  async requestPermission() {
    if (Platform.OS === 'ios') {
      Geolocation.requestAuthorization();
      return true;
    }

    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Access Required',
            message: 'Some features require access to your device location',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          logger.log('Location permission granted');
          return true;
        } else {
          logger.log('Location permission denied');
          return false;
        }
      } catch (err) {
        logger.log(err);
        return false;
      }
    }

    return false;
  },

  async getLocation() {
    let res;
    let rej;

    const promise = new Promise((resolve, reject) => {
      res = resolve;
      rej = reject;
    });

    promise.resolve = res;
    promise.reject = rej;

    Geolocation.getCurrentPosition(
      position => promise.resolve(position),
      err => promise.reject(err),
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 1000,
      },
    );

    return promise;
  },
};
