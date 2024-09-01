import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import notifee, {AndroidImportance} from '@notifee/react-native';
import {RetrieveData} from '../Database/Database';
import {Appbar} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import NormaliseSize, { normalizeFont, normalizeHeight } from '../Utils/NormaliseSize';

var locationDifference = require('haversine-distance');

const HouseDetails = ({route}) => {
  const {selectedHouseData} = route.params;

  const currentLocation = RetrieveData('currentLocation')[0];

  const navigation = useNavigation();

  async function onDisplayNotification() {
    // Request permissions (required for iOS)
    await notifee.requestPermission();

    // Create a channel (required for Android)
    const channelId = await notifee.createChannel({
      id: 'realestate',
      name: 'Real_Estate_Channel',
      importance: AndroidImportance.HIGH, // Set the importance level to HIGH
      sound: 'default', // Use the default notification sound
    });

    // Display a notification
    await notifee.displayNotification({
      title: 'Real Estate',
      body: 'Horray!! The house is successfully unlocked.',
      android: {
        channelId,
        smallIcon: 'ic_launcher', // optional, defaults to 'ic_launcher'.
      },
    });
  }

  return (
    <>
      <Appbar.Header
        mode="center-aligned"
        style={{backgroundColor: 'transparent'}}>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Title" />
      </Appbar.Header>
      <View style={styles.container}>
        <ScrollView style={styles.container}>
          <Image
            source={{uri: selectedHouseData?.imageUrl}}
            style={styles.image}
          />
          <View style={styles.detailsContainer}>
            <Text style={styles.address}>{selectedHouseData?.address}</Text>
            <Text style={styles.price}>
              $ {selectedHouseData?.price.toLocaleString()}
            </Text>
            <Text style={styles.description}>
              {selectedHouseData?.description}
            </Text>
            <View style={styles.infoContainer}>
              <Text style={styles.infoText}>
                Bedrooms: {selectedHouseData?.bedrooms}
              </Text>
              <Text style={styles.infoText}>
                Bathrooms: {selectedHouseData?.bathrooms}
              </Text>
              <Text style={styles.infoText}>
                Square Feet: {selectedHouseData?.squareFeet} sq ft
              </Text>
            </View>
            <Text style={styles.featuresTitle}>Features:</Text>
            <View style={styles.featuresContainer}>
              {selectedHouseData?.features.map((feature, index) => (
                <Text key={index} style={styles.featureItem}>
                  • {feature}
                </Text>
              ))}
            </View>
          </View>
        </ScrollView>

        <TouchableOpacity
            style={styles.button}
                onPress={() => onDisplayNotification()}
            >
                <Text style={styles.buttonText}>Unlock House</Text>
        </TouchableOpacity>
        {/* {
            locationDifference(selectedHouseData?.coordinates, currentLocation) <= 30 && (    // Uncomment this code if you want to check this scenario "The details screen should display more information about the home and an "Unlock" button. Unlock button should only be visible if the user's current location is within 30m of the home."
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => onDisplayNotification()}
                >
                    <Text style={styles.buttonText}>Unlock House</Text>
              </TouchableOpacity>
            )
        } */}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  image: {
    width: '100%',
    height: NormaliseSize.nH(300),
  },
  detailsContainer: {
    padding: 20,
    backgroundColor: '#fff',
    borderTopLeftRadius: NormaliseSize.nW(20),
    borderTopRightRadius: NormaliseSize.nW(20),
    marginTop: -20,
  },
  address: {
    fontSize: normalizeFont(24),
    fontWeight: 'bold',
    marginBottom: NormaliseSize.nH(10),
  },
  price: {
    fontSize: normalizeFont(20),
    color: '#007bff',
    marginBottom: NormaliseSize.nH(20),
  },
  description: {
    fontSize: normalizeFont(16),
    color: '#666',
    marginBottom: NormaliseSize.nH(20),
    lineHeight: 24,
  },
  infoContainer: {
    marginBottom: NormaliseSize.nH(20),
  },
  infoText: {
    fontSize: normalizeFont(16),
    marginBottom: normalizeHeight(5),
  },
  featuresTitle: {
    fontSize: normalizeFont(18),
    fontWeight: 'bold',
    marginBottom: NormaliseSize.nH(10),
  },
  featuresContainer: {
    paddingLeft: NormaliseSize.nW(10),
  },
  featureItem: {
    fontSize: normalizeFont(16),
    marginBottom: NormaliseSize.nH(5),
  },
  button: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#007bff',
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopLeftRadius: NormaliseSize.nW(20),
    borderTopRightRadius: NormaliseSize.nW(20),
  },
  buttonText: {
    fontSize: normalizeFont(18),
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default HouseDetails;
