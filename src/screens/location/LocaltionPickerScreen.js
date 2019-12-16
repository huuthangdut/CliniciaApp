import React, { useState, useEffect, useRef } from 'react'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import MapView, { Polyline, Marker, Callout } from 'react-native-maps'
import theme from '../../styles/theme'
import { Icon } from 'react-native-elements'
import { StyleSheet, Dimensions, Image, Text, View, Button } from "react-native";
import Geolocation from '@react-native-community/geolocation'
import Carousel from 'react-native-snap-carousel'
import WithContext from '../../components/core/WithContext'
import { AuthService } from '../../services/AuthService'

const MapStyle = [
  {
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#ebe3cd"
      }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#523735"
      }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#f5f1e6"
      }
    ]
  },
  {
    "featureType": "administrative",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#c9b2a6"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#dcd2be"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#ae9e90"
      }
    ]
  },
  {
    "featureType": "landscape.natural",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dfd2ae"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dfd2ae"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#93817c"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#a5b076"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#447530"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#f5f1e6"
      }
    ]
  },
  {
    "featureType": "road.arterial",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#fdfcf8"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#f8c967"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#e9bc62"
      }
    ]
  },
  {
    "featureType": "road.highway.controlled_access",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#e98d58"
      }
    ]
  },
  {
    "featureType": "road.highway.controlled_access",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#db8555"
      }
    ]
  },
  {
    "featureType": "road.local",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#806b63"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dfd2ae"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#8f7d77"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#ebe3cd"
      }
    ]
  },
  {
    "featureType": "transit.station",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dfd2ae"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#b9d3c2"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#92998d"
      }
    ]
  }
]

const { width: screenWidth } = Dimensions.get('window')

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1,
  },
  mapContainer: {
    position: 'absolute',
    padding: 10,
    backgroundColor: 'transparent',
    zIndex: 1000,
    width: '100%',
  },
  listView: {
    backgroundColor: theme.colors.white,
    borderRadius: 5
  },
  textInputContainer: {
    backgroundColor: theme.colors.white,
    borderRadius: 5,
    marginBottom: 7,
  },
  poweredContainer: {
    display: 'none'
  },
  rightBtn: {
  },
  btnContainer: {
    justifyContent: 'center',
    padding: 10,
    zIndex: 10000000
  },
  myLocation: {
    width: 50,
    height: 50,
    backgroundColor: 'red',
    zIndex: 10000,
    position: 'absolute',
    bottom: 20,
    right: 20,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.white,
    borderColor: theme.colors.primary,
    borderWidth: 3
  },
  chooseBtn: {
    width: '50%',
    alignSelf: 'center',
    top: '91.5%',
    zIndex: 1000000
  },
  slide: {
    height: 200
  },
  hideChooseBtn: {
    display: 'none'
  }
});

const LocationPickerScreen = props => {
  const { navigation, context } = props
  const { changeTemptLocation, user } = context

  const [lat, setLat] = useState(16.0216792)
  const [long, setLong] = useState(108.2257474)
  const [error, setError] = useState('')
  const [inputLocation, setInputLocation] = useState('')
  const inputLocationRef = useRef()
  const [addressTextInput, setAddressTextInput] = useState('')
  const mapRef = useRef()
  const [choosenGeometry, setChoosenGeometry] = useState()

  useEffect(() => {
    Geolocation.getCurrentPosition(
      (position) => {
        changeTemptLocation({
          lat: position.coords.latitude,
          long: position.coords.longitude
        })
        setLat(position.coords.latitude)
        setLong(position.coords.longitude)
      },
      (error) => setError(error.message),
      { enableHighAccuracy: false, timeout: 200000, maximumAge: 1000 },
    );

    setAddressTextInput(inputLocationRef.current.getAddressText())
  }, [])

  const clearText = () => {
    inputLocationRef.current.setAddressText('')
  }

  const goBackMyLocation = () => {
    mapRef.current.animateCamera({
      center: {
        latitude: lat,
        longitude: long
      },
      pitch: 2,
      heading: 20,
      altitude: 200,
      zoom: 17
    }, 1000)
  }

  const goToLocation = (latt, longg) => {
    mapRef.current.animateCamera({
      center: {
        latitude: latt,
        longitude: longg
      },
      pitch: 2,
      heading: 20,
      altitude: 200,
      zoom: 17
    }, 1000)
  }

  const _renderItem = ({ item, index }) => {
    return (
      <View style={styles.slide}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.name}>{item.name}</Text>
      </View>
    )
  }
  const [data, setData] = useState([
    { name: 'phuc', title: 'sss',  },
    { name: 'phuc', title: 'sss',  },
    { name: 'phuc', title: 'sss',  },
    { name: 'phuc', title: 'sss',  }
  ])
  const [showCarousel, setShowCarousel] = useState(false)

  const goBack = () => {
    navigation.goBack()
  }

  const addUserLocation = () => {
    let data = {
      userId: user.userId,
      address: inputLocationRef.current.state.text,
      lat: choosenGeometry.lat,
      long: choosenGeometry.long
    }

    AuthService.addAddress(
      data,
      res => {
        navigation.navigate('Account', {newAddresses: res.data.data.addLocation.location})        
      },
      err => {
        alert(err)
      }
    )
  }

  return (
    <>
      <GooglePlacesAutocomplete
        ref={inputLocationRef}
        placeholder='Search'
        minLength={2} // minimum length of text to search
        autoFocus={false}
        returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
        // keyboardAppearance={'light'} // Can be left out for default keyboardAppearance https://facebook.github.io/react-native/docs/textinput.html#keyboardappearance
        listViewDisplayed='false'    // true/false/undefined
        fetchDetails={true}
        // renderDescription={row => row.description} // custom description render
        onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
          const { location } = details.geometry
          setChoosenGeometry({
            lat: location.lat,
            long: location.lng
          })
          setAddressTextInput(inputLocationRef.current.state.text)

          goToLocation(location.lat, location.lng)
        }}

        getDefaultValue={() => ''}

        query={{
          // available options: https://developers.google.com/places/web-service/autocomplete
          key: 'AIzaSyD8fv7iKhenaSeUhpzU2hbMmJ3ZaBhw4rI',
          language: 'vi', // language of the results
          // types: '(cities)' // default: 'geocode'
        }}

        styles={{
          container: styles.mapContainer,
          listView: styles.listView,
          textInputContainer: styles.textInputContainer,
          poweredContainer: styles.poweredContainer,
          textInput: styles.textInput
        }}

        nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
        GoogleReverseGeocodingQuery={{
          // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
        }}
        GooglePlacesSearchQuery={{
          // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
          rankby: 'distance',
          type: 'cafe'
        }}

        GooglePlacesDetailsQuery={{
          // available options for GooglePlacesDetails API : https://developers.google.com/places/web-service/details
          fields: 'formatted_address',
        }}

        filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
        // predefinedPlaces={[homePlace, workPlace]}
        renderRightButton={() => {
          let textRef = inputLocationRef.current
          if (!textRef || textRef.getAddressText() !== '') {
            return (
              <View style={styles.btnContainer} >
                <Icon type='material' name='close' onPress={clearText} />
              </View>
            )
          }
        }
        }
        renderLeftButton={() =>
          
          <View style={styles.btnContainer}>
            <Icon type='material-community' name='chevron-left' color={theme.colors.primary} onPress={() => goBack()}/>
          </View>
        }
        debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
      />

      <MapView
        ref={mapRef}
        onTouchStart={() => { inputLocationRef.current.triggerBlur() }}
        style={styles.map}
        region={{
          latitude: lat,
          longitude: long,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}
        customMapStyle={MapStyle}
        showsMyLocationButton={true}
        showsUserLocation={true}
      >
        {/* {!!lat && !!long && (
          <>
          <Marker
            coordinate={{ "latitude": lat, "longitude": long }}
            title={"Your Location"}
            onPress={() => setShowCarousel(true)}
          />
          
          </>
        )} */}
          
      </MapView>
      <View style={addressTextInput ? styles.chooseBtn : styles.hideChooseBtn} >
        <Button title='Choose this location' color={theme.colors.primary} onPress={addUserLocation}/>
      </View>
      <View style={styles.myLocation} >
        <Icon
          type='font-awesome'
          name='location-arrow'
          size={30}
          color={theme.colors.primary}
          onPress={goBackMyLocation}
        />
      </View>
      {showCarousel && <Carousel
        // ref={carouselRef}
        sliderWidth={screenWidth}
        itemWidth={screenWidth - 100}
        data={data}
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
          backgroundColor: theme.colors.white,
        }}
        style={{
          backfaceVisibility: 'visible'
        }}
        sliderHeight={300}
      
      />}
    </>
  )
}

export default WithContext(LocationPickerScreen)