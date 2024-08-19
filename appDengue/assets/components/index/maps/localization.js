import React, { useState, useEffect } from 'react';
import { View, Button, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import axios from 'axios';


export default function Localization({ navigation }) {
  const [region, setRegion] = useState(null);
  const [markerCoordinate, setMarkerCoordinate] = useState(null);
  const [locationName, setLocationName] = useState('');

  useEffect(() => {
    const requestLocationPermission = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permissão de Localização', 'Permissão para acessar a localização é necessária.');
        return;
      }

      const { coords } = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      setRegion({
        latitude: coords.latitude,
        longitude: coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
      setMarkerCoordinate({
        latitude: coords.latitude,
        longitude: coords.longitude,
      });
    };

    requestLocationPermission();
  }, []);

  const handleSave = async () => {
    if (markerCoordinate) {
      try {
        const { latitude, longitude } = markerCoordinate;
        const response = await axios.get(
          `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
        );

        const { address } = response.data;
        const locationName = `${address.road || ''}, ${address.suburb || ''}, ${address.city || ''}`;
        setLocationName(locationName);
        navigation.navigate('LocationDetails', { locationName });
      } catch (error) {
        Alert.alert('Erro', 'Não foi possível obter os dados de localização.');
      }
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {region && (
        <MapView
          style={{ flex: 1 }}
          initialRegion={region}
          onPress={e => setMarkerCoordinate(e.nativeEvent.coordinate)}
        >
          {markerCoordinate && (
            <Marker
              coordinate={markerCoordinate}
              title="Localização"
              description={locationName}
            />
          )}
        </MapView>
      )}
      <Button title="Salvar" onPress={handleSave} />
    </View>
  );
}
