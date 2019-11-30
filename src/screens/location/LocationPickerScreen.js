import React, {useState, useEffect, useRef, useContext} from 'react';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import MapView, {Polyline, Marker, Callout} from 'react-native-maps';
import theme from '../../styles/theme';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  StyleSheet,
  Dimensions,
  Image,
  Text,
  View,
  TouchableWithoutFeedback,
} from 'react-native';
import Button from '../../components/core/Button';
import Geolocation from '@react-native-community/geolocation';
import Carousel from 'react-native-snap-carousel';
import {UserService} from '../../services/UserService';
import { AppContext } from '../../AppProvider';
import {Utils} from '../../utilities/utils';

const MapStyle = [
  {
    elementType: 'geometry',
    stylers: [
      {
        color: '#ebe3cd',
      },
    ],
  },
  {
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#523735',
      },
    ],
  },
  {
    elementType: 'labels.text.stroke',
    stylers: [
      {
        color: '#f5f1e6',
      },
    ],
  },
  {
    featureType: 'administrative',
    elementType: 'geometry.stroke',
    stylers: [
      {
        color: '#c9b2a6',
      },
    ],
  },
  {
    featureType: 'administrative.land_parcel',
    elementType: 'geometry.stroke',
    stylers: [
      {
        color: '#dcd2be',
      },
    ],
  },
  {
    featureType: 'administrative.land_parcel',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#ae9e90',
      },
    ],
  },
  {
    featureType: 'landscape.natural',
    elementType: 'geometry',
    stylers: [
      {
        color: '#dfd2ae',
      },
    ],
  },
  {
    featureType: 'poi',
    elementType: 'geometry',
    stylers: [
      {
        color: '#dfd2ae',
      },
    ],
  },
  {
    featureType: 'poi',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#93817c',
      },
    ],
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry.fill',
    stylers: [
      {
        color: '#a5b076',
      },
    ],
  },
  {
    featureType: 'poi.park',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#447530',
      },
    ],
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [
      {
        color: '#f5f1e6',
      },
    ],
  },
  {
    featureType: 'road.arterial',
    elementType: 'geometry',
    stylers: [
      {
        color: '#fdfcf8',
      },
    ],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [
      {
        color: '#f8c967',
      },
    ],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry.stroke',
    stylers: [
      {
        color: '#e9bc62',
      },
    ],
  },
  {
    featureType: 'road.highway.controlled_access',
    elementType: 'geometry',
    stylers: [
      {
        color: '#e98d58',
      },
    ],
  },
  {
    featureType: 'road.highway.controlled_access',
    elementType: 'geometry.stroke',
    stylers: [
      {
        color: '#db8555',
      },
    ],
  },
  {
    featureType: 'road.local',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#806b63',
      },
    ],
  },
  {
    featureType: 'transit.line',
    elementType: 'geometry',
    stylers: [
      {
        color: '#dfd2ae',
      },
    ],
  },
  {
    featureType: 'transit.line',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#8f7d77',
      },
    ],
  },
  {
    featureType: 'transit.line',
    elementType: 'labels.text.stroke',
    stylers: [
      {
        color: '#ebe3cd',
      },
    ],
  },
  {
    featureType: 'transit.station',
    elementType: 'geometry',
    stylers: [
      {
        color: '#dfd2ae',
      },
    ],
  },
  {
    featureType: 'water',
    elementType: 'geometry.fill',
    stylers: [
      {
        color: '#b9d3c2',
      },
    ],
  },
  {
    featureType: 'water',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#92998d',
      },
    ],
  },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapContainer: {
    flex: 1,
    zIndex: 1,
  },
  map: {
    flex: 1,
    // zIndex: 1
  },
  placeContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    padding: 10,
    width: '100%',
    zIndex: 9999,
  },
  placeListView: {
    backgroundColor: theme.colors.white,
    borderRadius: 5,
  },
  placeInputContainer: {
    backgroundColor: theme.colors.white,
    borderRadius: 5,
    marginBottom: 7,
  },
  placePoweredContainer: {
    display: 'none',
  },
  button: {
    justifyContent: 'center',
    paddingRight: 10,
  },
  myLocation: {
    width: 48,
    height: 48,
    zIndex: 9999,
    position: 'absolute',
    top: 60,
    right: 15,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.white,
    borderColor: theme.colors.white,
    borderWidth: 3,
  },
  bottom: {
    flexDirection: 'column',
    height: 110,
    backgroundColor: theme.colors.white,
  },
  addressContainer: {
    flexDirection: 'row',
    marginVertical: 15,
    marginHorizontal: 30,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addressText: {
    padding: 10,
    fontSize: 12,
    fontFamily: 'SF-Pro-Text-Semibold',
  },
  bottomButton: {
    height: 36,
    marginBottom: 15,
    marginHorizontal: 30
  },
  buttonTitle: {
    fontSize: 12,
    fontFamily: 'SF-Pro-Text-Semibold',
  },
});

const LocationPickerScreen = props => {
  const {navigation} = props;
  const shouldGoBack = navigation.getParam('shouldGoBack');
  const context = useContext(AppContext);

  const [currentCoords, setCurrentCoords] = useState({
    latitude: 0,
    longitude: 0,
  });

  const [selectedCoords, setSelectedCoords] = useState({
    latitude: 0,
    longitude: 0,
    formattedAddress: '',
  });

  const mapRef = useRef();
  const placeInputRef = useRef();

  const [placeInputText, setPlaceInputText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        setCurrentCoords({latitude, longitude});
      },
      error => console.log(error.message),
      {enableHighAccuracy: false, timeout: 200000, maximumAge: 1000},
    );
  }, []);

  const clearPlaceTextInput = () => {
    placeInputRef.current.setAddressText('');
  };

  const cameraTo = (latitude, longitude) => {
    mapRef.current.animateCamera(
      {
        center: {
          latitude: latitude,
          longitude: longitude,
        },
        pitch: 2,
        heading: 20,
        altitude: 200,
        zoom: 17,
      },
      1000,
    );
  };

  const goToMyLocation = () => {
    cameraTo(currentCoords.latitude, currentCoords.longitude);
  };

  const setLocation = () => {
    setIsSubmitting(true);
    if (
      selectedCoords.latitude &&
      selectedCoords.longitude &&
      selectedCoords.formattedAddress
    ) {
      UserService.setLocation(selectedCoords.latitude, selectedCoords.longitude, selectedCoords.formattedAddress).then((result) => {
        if(result && result.accessToken) {
          context.authUser.set(Utils.getAuthUser(result.accessToken));
        }

        if(shouldGoBack) {
          navigation.goBack();
        } else {
          navigation.navigate('Tab');
        }
      }).catch(e => {
        setIsSubmitting(false);
        console.log(e);
      });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.mapContainer}>
        <MapView
          ref={mapRef}
          onTouchStart={() => {
            placeInputRef.current.triggerBlur();
          }}
          style={styles.map}
          region={{
            latitude: currentCoords.latitude,
            longitude: currentCoords.longitude,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}
          customMapStyle={MapStyle}
          showsUserLocation={true}
          followsUserLocation={true}
          showsCompass={true}>
          {!!selectedCoords.latitude && !!selectedCoords.longitude && (
            <>
              <Marker
                coordinate={{
                  latitude: selectedCoords.latitude,
                  longitude: selectedCoords.longitude,
                }}
                title={selectedCoords.formattedAddress}
                onPress={() => {}}
              />
            </>
          )}
        </MapView>
      </View>
      <View style={styles.placeContainer}>
        <GooglePlacesAutocomplete
          ref={placeInputRef}
          placeholder="Nhập địa chỉ của bạn"
          minLength={2}
          autoFocus={true}
          returnKeyType={'search'}
          keyboardAppearance={'light'}
          listViewDisplayed="false"
          fetchDetails={true}
          onPress={(data, details = null) => {
            const {location} = details.geometry;
            setSelectedCoords({
              latitude: location.lat,
              longitude: location.lng,
              formattedAddress: details.formatted_address,
            });
            cameraTo(location.lat, location.lng);
          }}
          getDefaultValue={() => ''}
          query={{
            key: 'AIzaSyCrL7txc_1d2P83b0MpSSdZb378Sbkjgq4',
            language: 'vi',
          }}
          styles={{
            listView: styles.placeListView,
            textInputContainer: styles.placeInputContainer,
            poweredContainer: styles.placePoweredContainer,
            textInput: styles.placeInput,
          }}
          nearbyPlacesAPI="GooglePlacesSearch"
          GoogleReverseGeocodingQuery={{}}
          GooglePlacesSearchQuery={{
            rankby: 'distance',
            type: 'cafe',
          }}
          GooglePlacesDetailsQuery={{
            fields: 'formatted_address',
          }}
          filterReverseGeocodingByTypes={[
            'locality',
            'administrative_area_level_3',
          ]}
          debounce={200}
          renderRightButton={() => {
            let placeInput = placeInputRef.current;
            if (!placeInput || placeInput.getAddressText() !== '') {
              return (
                <View style={styles.button}>
                  <Icon
                    name="close"
                    size={20}
                    onPress={clearPlaceTextInput}
                  />
                </View>
              );
            }
          }}
        />
      </View>
      <View style={styles.myLocation}>
        <Icon
          name="my-location"
          size={25}
          color={theme.colors.primary}
          onPress={goToMyLocation}
        />
      </View>
      {!!selectedCoords.formattedAddress && (
        <View style={styles.bottom}>
          <View style={styles.addressContainer}>
            <Icon
              name="location-on"
              size={23}
              color={theme.colors.primary}
            />
            <Text style={styles.addressText}>{selectedCoords.formattedAddress}</Text>
          </View>
          <Button
              title="Đặt làm địa chỉ của tôi"
              primary
              style={styles.bottomButton}
              titleStyle={styles.buttonTitle}
              onPress={() => setLocation()}
              loading={isSubmitting}
            />
        </View>
      )}
    </View>
  );
};

export default LocationPickerScreen;
