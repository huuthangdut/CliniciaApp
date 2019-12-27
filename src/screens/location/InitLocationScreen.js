import React, { useContext } from 'react'
import { StyleSheet, View, Image, Text, TouchableOpacity  } from "react-native"
import theme from '../../styles/theme'
import Button from '../../components/core/Button'
import {AppContext} from '../../AppProvider';

const InitLocation = props => {
  const { navigation } = props;

  return(
    <View style= {styles.container}>
      <Image source={theme.tabIcons.marker} style={styles.icon}/>
      <Text numberOfLines={2} style= {styles.greeting}>Welcome!</Text>
      <Text style= {styles.constructor}>Thiết lập địa chỉ của bạn và bắt đầu tìm kiếm bác sĩ xung quanh bạn</Text>
      <Button style= {styles.button} primary title='Bắt đầu' onPress={() => navigation.navigate('SetLocation')}/>
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