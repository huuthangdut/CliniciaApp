import React from 'react'
import { View, ImageBackground, Text, StyleSheet } from 'react-native'
import { Icon } from 'react-native-elements'

function Banner(props) {
  const { storeName, address } = props

  return (
    <View>
      <ImageBackground
        source={{ uri: 'http://via.placeholder.com/350x350' }}
        style={styles.backgroundImage}
      >
        <View style={{ backgroundColor: 'rgba(0,0,0,0.17)', flex: 1 }}>
          <View style={styles.container}>
            <Text style={styles.title}>{storeName}</Text>
            <View style={styles.location}>
              <Icon
                type='material-community'
                name='map-marker'
                color='#fff'
                size={15}
              />
              <Text style={styles.locationText}>
                {address}
              </Text>
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
  backgroundImage: {
    width: '100%',
    height: 250,
    resizeMode: 'cover'
  },
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: 10,
    paddingHorizontal: 16,
    alignItems: 'flex-start'
  },
  title: {
    color: '#fff',
    fontSize: 25,
    paddingVertical: 4
  },
  location: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  locationText: {
    color: '#fff',
    fontSize: 12
  }
})

export default Banner