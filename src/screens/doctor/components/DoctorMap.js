import React, {useState, useContext, useRef} from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  FlatList,
  Text,
  Dimensions,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import DoctorItem from './DoctorItem';
import MapView, {Polyline, Marker, Callout} from 'react-native-maps';
import Carousel from 'react-native-snap-carousel';
import {AppContext} from '../../../AppProvider';
import {Avatar, Icon, Rating} from 'react-native-elements';
import theme from '../../../styles/theme';

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

const DoctorMap = props => {
  const {navigation, loading} = props;

  const context = useContext(AppContext);
  const authUser = context.authUser.get;

  const items = navigation.getParam('items');

  const [markers, setMarkers] = useState(items);

  const screenWidth = Dimensions.get('window').width;

  const infoWindowRef = useRef();

  const _renderItem = ({item, index}) => {
    return (
      <TouchableOpacity style={styles.slide} activeOpacity={0.7} onPress={() => navigation.navigate('DoctorDetails', {id: item.id})}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            resizeMode="contain"
            source={{
              uri:
                item.imageProfile
            }}
          />
        </View>
        <View style={styles.info}>
          <Text style={styles.title}>
            {item.firstName + ' ' + item.lastName}
          </Text>
          <View style={styles.row}>
            <Text numberOfLines={2} style={styles.address}>
              {item.location.address}
            </Text>
          </View>
          <View style={styles.row}>
            <Icon
              name="map-marker"
              type="font-awesome"
              size={12}
              color="#C8C7CC"
            />
            <Text style={styles.text}>{item.distanceFromPatient} km</Text>
          </View>
          <View style={styles.row}>
            <Rating
              imageSize={10}
              readonly
              startingValue={item.rating}
              style={styles.rating}
            />
            <Text style={styles.text}>{item.ratingCount}</Text>
            <Icon
              containerStyle={styles.text}
              name="dot-single"
              type="entypo"
              size={12}
              color={theme.colors.primary}
            />
            <Text style={styles.text}>{item.specialty.name}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const showInfoWindow = index => {
    infoWindowRef.current.snapToItem(index, true);
  };

  return (
    <>
      <MapView
        style={styles.map}
        region={{
          latitude: +authUser.latitude,
          longitude: +authUser.longitude,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}
        customMapStyle={MapStyle}
        showsMyLocationButton={true}
        showsUserLocation={true}>
        {markers.map((item, index) => (
          <Marker
            key={item.id}
            coordinate={{
              latitude: item.location.latitude,
              longitude: item.location.longitude,
            }}
            title={item.firstName + ' ' + item.lastName}
            onPress={() => showInfoWindow(index)}
          />
        ))}
      </MapView>
      <Carousel
        ref={infoWindowRef}
        sliderWidth={screenWidth}
        itemWidth={screenWidth - 65}
        data={markers}
        renderItem={_renderItem}
        hasParallaxImages
        containerCustomStyle={{
          zIndex: 999,
          position: 'absolute',
          bottom: 70
        }}
        slideStyle={{
          backgroundColor: 'white',
        }}
        style={{
          backfaceVisibility: 'visible',
        }}
        sliderHeight={300}
        activeDotIndex={2}
        dotsLength={markers.length}
      />
    </>
  );
};

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  slide: {
    height: 120,
    flexDirection: 'row',
    borderRadius: 6,
  },
  imageContainer: {
    width: 110,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 90,
    height: 90,
    borderRadius: 4,
  },
  title: {
    fontSize: 16,
    fontFamily: 'SF-Pro-Text-Semibold',
  },
  info: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginHorizontal: 2,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 1,
  },
  text: {
    fontSize: 11,
    fontFamily: 'SF-Pro-Text-Regular',
    color: theme.colors.darkGray,
    paddingHorizontal: 4
  },
  address: {
    fontSize: 11,
    fontFamily: 'SF-Pro-Text-Regular',
    color: theme.colors.darkGray,
    lineHeight: 15,
  },
});

export default DoctorMap;
