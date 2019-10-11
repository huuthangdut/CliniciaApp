import React, { useState } from 'react'
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableNativeFeedback
} from "react-native"
import { ButtonGroup } from 'react-native-elements'
import theme from '../../../styles/theme'

const Toolbar = props => {
  return (
    <View style= {styles.container}>
      <TouchableNativeFeedback >
        <View style= {styles.filter}>
        <Image style= {styles.icon} source={theme.tabIcons.filter}/>
        <Text style= {styles.text}>Filter</Text>
        </View>
      </TouchableNativeFeedback>
      <TouchableNativeFeedback >
        <View style= {styles.sort}>
        <Image style= {styles.icon} source={theme.tabIcons.sort}/>
        <Text style= {styles.text}>Sort</Text>
        </View>
      </TouchableNativeFeedback>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  filter: {
    flexDirection: 'row',
    height: 44,
    flex : 1,
    justifyContent: 'center',
    display: 'flex',
    alignItems: 'center',
    borderWidth: 1,
    borderTopColor: '#EFEFF4',
    borderBottomColor: '#EFEFF4',
    borderRightColor: '#EFEFF4',
    borderLeftWidth : 0,
    fontFamily: 'SF-Pro-Text-Regular',
    fontSize: 15,
    color: '#666666'
  },
  sort: {
    flexDirection: 'row',
    height: 44,
    flex : 1,
    justifyContent: 'center',
    display: 'flex',
    alignItems: 'center',
    borderWidth: 1,
    borderTopColor: '#EFEFF4',
    borderBottomColor: '#EFEFF4',
    borderRightColor: '#EFEFF4',
    borderLeftWidth : 0,
    borderRightWidth : 0,
  },
  text: {
    fontFamily: 'SF-Pro-Text-Regular',
    fontSize: 15,
    color: theme.colors.darkGray,
    marginLeft: 8
  },
  icon: {
    width: 14,
    height: 17
  }
})

export default Toolbar