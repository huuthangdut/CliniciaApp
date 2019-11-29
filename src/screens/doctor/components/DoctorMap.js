import React, {useState} from 'react';
import {ActivityIndicator, StyleSheet, FlatList, Text, Dimensions, View} from 'react-native';
import DoctorItem from './DoctorItem';
import MapView, {Polyline, Marker, Callout} from 'react-native-maps';
import Carousel from 'react-native-snap-carousel';

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
  const {items, navigation, loading} = props;

  const [markers, setMarkers] = useState([
    {id: '1', name: 'Bac si 1', latitude: 16.0226792, longitude: 108.2257474},
    {id: '2', name: 'Bac si 2', latitude: 16.0236792, longitude: 108.2257474},
    {id: '3', name: 'Bac si 3', latitude: 16.0246792, longitude: 108.2257474},
    {id: '4', name: 'Bac si 4', latitude: 16.0257792, longitude: 108.2257474},
    {id: '5', name: 'Bac si 5', latitude: 16.0265792, longitude: 108.2257474},
    {id: '6', name: 'Bac si 6', latitude: 16.0276692, longitude: 108.2257474},
  ]);

  const [showCarousel, setShowCarousel] = useState(false);

  const screenWidth = Dimensions.get('window').width;

  const _renderItem = ({item, index}) => {
    return (
      <View style={styles.slide}>
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.name}>{item.name}</Text>
      </View>
    );
  };

  return (
    <>
      <MapView
        style={styles.map}
        region={{
          latitude: 16.0216792,
          longitude: 108.2257474,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}
        customMapStyle={MapStyle}
        showsMyLocationButton={true}
        showsUserLocation={true}>
        {markers.map((item, index) => (
          <Marker
            key={item.id}
            coordinate={{latitude: item.latitude, longitude: item.longitude}}
            title={item.name}
            onPress={() => setShowCarousel(true)}
          />
        ))}
      </MapView>
      {showCarousel && (
        <Carousel
          // ref={carouselRef}
          sliderWidth={screenWidth}
          itemWidth={screenWidth - 100}
          data={markers}
          renderItem={_renderItem}
          hasParallaxImages
          // slideStyle={{ marginLeft: -10, marginRight: 10 }}
          containerCustomStyle={{
            zIndex: 1000,
            // backgroundColor: 'red',
            position: 'absolute',
            bottom: 80,
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
      )}
    </>
  );
};

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  slide: {
    height: 200,
  },
});

export default DoctorMap;
