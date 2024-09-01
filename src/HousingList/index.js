import {View, Text, StyleSheet, FlatList, Image, TouchableOpacity} from 'react-native';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from '../Components/Loader';
import { useNavigation } from '@react-navigation/native';
import NormaliseSize, { normalizeFont } from '../Utils/NormaliseSize';

const HousingList = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    const navigation = useNavigation();

    const fetchHousingList = async () => {
        setLoading(true);
        const ApiResponse = await axios.get('https://run.mocky.io/v3/f3ef8073-da03-47fb-b2cb-b166e43ad331');
        if (ApiResponse.status === 200) {
            setData(ApiResponse?.data);
            setLoading(false);
        }
    };

    const handledSelectedHouse = (value) => {
        navigation.navigate('HouseDetail', {
            selectedHouseData: value,
        });
    };

    useEffect(() => {
        fetchHousingList();
    }, []);

  const HomeCard = ({item}) => (
    <TouchableOpacity style={styles.card} onPress={() => handledSelectedHouse(item)}>
      <Image source={{ uri: item?.imageUrl }} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.address}>{item?.address}</Text>
        <Text style={styles.description}>{item?.description}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View>
      <FlatList
        data={data}
        renderItem={HomeCard}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
      />
      <Loader loading={loading}/>
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    padding: 10,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: NormaliseSize.nW(8),
    overflow: 'hidden',
    marginBottom: NormaliseSize.nH(15),
    elevation: 3, // For Android shadow
    shadowColor: '#000', // For iOS shadow
    shadowOffset: {width: 0, height: 2}, // For iOS shadow
    shadowOpacity: 0.3, // For iOS shadow
    shadowRadius: 3, // For iOS shadow
  },
  image: {
    width: '100%',
    height: 200,
  },
  textContainer: {
    padding: 15,
  },
  address: {
    fontSize: normalizeFont(18),
    fontWeight: 'bold',
    marginBottom: NormaliseSize.nH(10),
  },
  description: {
    fontSize: normalizeFont(14),
    color: '#666',
  },
});

export default HousingList;
