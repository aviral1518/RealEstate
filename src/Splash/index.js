import {View, Text, StyleSheet, Platform} from 'react-native';
import React, {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import Geolocation from '@react-native-community/geolocation';
import {insertData} from '../Database/Database';
import {checkPermission} from '../Utils/AppPermission';
import {check, PERMISSIONS, request, RESULTS} from 'react-native-permissions';
import { normalizeFont } from '../Utils/NormaliseSize';

export default function Splash() {
  const navigation = useNavigation();

  const resetNavigation = () => {
    setTimeout(() => {
      navigation.reset({
        index: 0,
        routes: [
          {
            name: 'Login',
          },
        ],
      });
    }, 1500);
  };

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      async position => {
        if (position) {
          console.log(
            'coordinates of current location --->',
            JSON.stringify(position.coords),
          );
          insertData('currentLocation', {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          resetNavigation();
        }
      },
      error => {
        if (error.code === 1) {
          checkPermission('location')
            .then(result => {
              if (result) {
                Geolocation.getCurrentPosition(
                  async position => {
                    if (position) {
                      insertData('currentLocation', {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                      });
                      resetNavigation();
                    }
                  },
                  // eslint-disable-next-line no-shadow
                  error => {},
                  {timeout: 20000, maximumAge: 0},
                );
              } else {
                resetNavigation();
                console.log('unable to fetch!!!!!@@@@@');
              }
            })
            .catch(err => {
              resetNavigation();
              // eslint-disable-next-line no-console
              console.log(err);
            });
        } else if (error.code === 2) {
          resetNavigation();
          // eslint-disable-next-line no-console
          console.log(error);
        }
      },
      {timeout: 20000, maximumAge: 0, showLocationDialog: true},
    );
  };

  useEffect(() => {
    if (Platform.OS === 'android') {
      request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION).then(() => {
        check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION).then(result => {
          console.log('location status ----->', result);
          switch (result) {
            case RESULTS.UNAVAILABLE:
              resetNavigation();
              break;
            case RESULTS.DENIED:
              resetNavigation();
              break;
            case RESULTS.LIMITED:
              resetNavigation();
              break;
            case RESULTS.GRANTED:
              getCurrentLocation();
              break;
            case RESULTS.BLOCKED:
              resetNavigation();
              break;
            default:
              break;
          }
        });
      });
    } else {
      request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE).then(() => {
        check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE).then(result => {
          console.log('location status ----->', result);
          switch (result) {
            case RESULTS.UNAVAILABLE:
              resetNavigation();
              break;
            case RESULTS.DENIED:
              resetNavigation();
              break;
            case RESULTS.LIMITED:
              resetNavigation();
              break;
            case RESULTS.GRANTED:
              getCurrentLocation();
              break;
            case RESULTS.BLOCKED:
              resetNavigation();
              break;
            default:
              break;
          }
        });
      });
    }
  }, []);

  return (
    <View style={styles.mainContainer}>
      <Text style={styles.heading}>Real Estate</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontSize: normalizeFont(20),
    fontWeight: 'bold',
  },
});
