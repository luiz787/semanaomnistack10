import React, { useEffect, useState } from 'react';
import { StyleSheet, Image, View, Text, TextInput, TouchableOpacity } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import { requestPermissionsAsync, getCurrentPositionAsync } from 'expo-location';
import { MaterialIcons } from '@expo/vector-icons';

import api from '../services/api';

const Main = ({ navigation }) => {
  const [developers, setDevelopers] = useState([]);
  const [currentRegion, setCurrentRegion] = useState(null);
  const [technologies, setTechnologies] = useState('');

  useEffect(() => {
    async function loadInitialPosition() {
      const { granted } = await requestPermissionsAsync();
      if (granted) {
        const { coords } = await getCurrentPositionAsync({
          enableHighAccuracy: true,
        });
        const { latitude, longitude } = coords;
        setCurrentRegion({
          latitude,
          longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        });
      }
    };
    loadInitialPosition();
  }, []);

  const loadDevelopers = async () => {
    console.log('loaddevs');
    const { latitude, longitude } = currentRegion;
    const response = await api.get('/search', {
      params: {
        latitude,
        longitude,
        technologies,
      },
    });
    console.log(response.data);
    setDevelopers(response.data.developers);
  };

  const handleRegionChanged = (region) => {
    setCurrentRegion(region);
  };

  if (!currentRegion) {
    return null;
  }

  return (
    <>
      <MapView
        style={styles.map}
        initialRegion={currentRegion}
        onRegionChangeComplete={handleRegionChanged}
      >
        {developers.map(developer => (
          <Marker
            key={developer.githubUsername}
            coordinate={{
              longitude: developer.location.coordinates[0],
              latitude: developer.location.coordinates[1],
            }}
          >
            <Image
              style={styles.avatar}
              source={{
                uri: developer.avatarUrl,
              }}
            />
            <Callout onPress={() => {
              navigation.navigate('Profile', {
                githubUsername: developer.githubUsername,
              });
            }}>
              <View style={styles.callout}>
                <Text style={styles.developerName}>{developer.name}</Text>
                <Text style={styles.developerBio}>{developer.bio}</Text>
                <Text style={styles.developerTechnologies}>{developer.technologies.join(', ')}</Text>
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>
      <View style={styles.searchForm}>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar devs por techs..."
          placeholderTextColor="#999"
          autoCapitalize="words"
          autoCorrect={false}
          value={technologies}
          onChangeText={setTechnologies}
        />
        <TouchableOpacity
          onPress={loadDevelopers}
          style={styles.loadButton}
        >
          <MaterialIcons
            name="my-location"
            size={20}
            color="#FFF"
          />
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
  avatar: {
    width: 54,
    height: 54,
    borderRadius: 4,
    borderWidth: 4,
    borderColor: '#FFF',
  },
  callout: {
    width: 260,
  },
  developerName: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  developerBio: {
    color: '#666',
    marginTop: 5,
  },
  developerTechnologies: {
    marginTop: 5,
  },
  searchForm: {
    position: 'absolute',
    top: 20,
    left: 20,
    right: 20,
    zIndex: 5,
    flexDirection: 'row',
  },
  searchInput: {
    flex: 1,
    height: 50,
    backgroundColor: '#FFF',
    color: '#333',
    borderRadius: 25,
    paddingHorizontal: 20,
    fontSize: 16,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 4,
      height: 4,
    },
    elevation: 2,
  },
  loadButton: {
    width: 50,
    height: 50,
    backgroundColor: '#8E4DFF',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 15,
  },
});

export default Main;
