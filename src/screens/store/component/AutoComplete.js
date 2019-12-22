import React, { useState, useEffect, useRef } from 'react'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import { Icon } from 'react-native-elements'
import { StyleSheet, Dimensions, Image, Text, View, Button } from "react-native"
import theme from '../../../styles/theme'

const styles = StyleSheet.create({
  mapContainer: {
    position: 'absolute',
    backgroundColor: 'transparent',
    zIndex: 1000,
    width: '100%',
    paddingHorizontal: 20,
    marginTop: 10
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
  btnContainer: {
    justifyContent: 'center'
  }
});

const AutoComplete = props => {
  const { navigation, sendData, closeAutoComplete } = props

  const inputLocationRef = useRef()
  const [addressTextInput, setAddressTextInput] = useState('')
  const [choosenGeometry, setChoosenGeometry] = useState()

  const clearText = () => {
    inputLocationRef.current.setAddressText('')
  }

  const goBack = () => {
    closeAutoComplete()
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
          sendData({
            lat: location.lat,
            long: location.lng,
            address: inputLocationRef.current.state.text
          })
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
            <Icon type='material-community' name='chevron-left' color={theme.colors.primary} onPress={() => goBack()} />
          </View>
        }
        debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
      />
    </>
  )
}

export default AutoComplete