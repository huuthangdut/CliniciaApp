import React, { useState } from 'react'
import { 
  ScrollView, 
  StyleSheet,
  View
} from "react-native"
import FavoriteList from './components/FavoriteList'
import Header from './components/Header'
import Toolbar from './components/Toolbar'

const FavoriteScreen = () => {
  const [listFavorite, setListFavorite] = useState([

  ])

  return (
    <View>
      <Header/>
      <Toolbar/>
      <FavoriteList/>
    </View>
  )
}

const styles = StyleSheet.create({
  
})

export default FavoriteScreen