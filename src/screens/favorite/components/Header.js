import React, { useState } from 'react'
import { 
  View,
  StyleSheet,
  Image,
  Text
} from "react-native"
import theme from '../../../styles/theme'

const Header = props => {
  return (
    <View style={styles.header}>
      <Image 
        source={theme.tabIcons.backArrow} 
        style={styles.backIcon}
      />
      <Text style={styles.title}>Favorite</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    height: 96
  },
  backIcon: {
    marginTop: 11,
    marginLeft: 9,
    width: 12,
    height: 21,
  },
  title: {
    fontSize: 34,
    fontFamily: 'SF-Pro-Display-Bold',
    marginLeft: 16
  }
})

export default Header