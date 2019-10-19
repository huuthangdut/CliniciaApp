import React from 'react'
import { StyleSheet, View, Image, Text,TouchableOpacity  } from "react-native"
import { Icon } from "react-native-elements"
import theme from '../../styles/theme'
import Button from '../../components/core/Button'

const InitLocation = () => {
  return(
    <View style= {styles.container}>
      <Image source={theme.tabIcons.marker} style={styles.icon}/>
      <Text numberOfLines={2} style= {styles.greeting}>Hello , nice to meet you!</Text>
      <Text style= {styles.constructor}>Set your location to start find doctors around you</Text>
      <Button style= {styles.button} primary title='Use current location'/>
      <TouchableOpacity>
      <Text style= {styles.note}>or set your location manually</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 40,
    paddingVertical: 60,
    flex : 1
  },
  icon: {
    width: 52,
    height: 64
  },
  greeting: {
    marginTop: 40,
    fontSize: 40,
    fontFamily: 'SF-Pro-Display-Bold',
    marginBottom: 16
  },
  constructor: {
    fontSize: 17,
    color: theme.colors.darkGray,
    fontFamily: 'SF-Pro-Text-Regular'
  },
  button: {
    marginTop: 40,
    marginBottom: 16
  },
  note: {
    fontSize: 17,
    color: theme.colors.primary,
    fontFamily: 'SF-Pro-Text-Regular',
    marginTop: 15,
    borderStyle: 'dotted'
  }
})

export default InitLocation