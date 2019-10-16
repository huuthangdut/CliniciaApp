import React, { useState } from 'react'
import { 
  ScrollView, 
  StyleSheet,
  View,
  Text
} from "react-native"
import FavoriteList from './components/FavoriteList'
import Header from './components/Header'
import Toolbar from './components/Toolbar'

const FavoriteScreen = () => {
  const [listFavorite, setListFavorite] = useState([

  ])

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Favorite</Text>
      <Toolbar/>
      <FavoriteList/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    flexDirection: 'column'
  },
  title: {
    fontSize: 34,
    fontFamily: 'SF-Pro-Display-Bold',
    paddingVertical: 20,
    paddingHorizontal: 15
  }
})

export default FavoriteScreen