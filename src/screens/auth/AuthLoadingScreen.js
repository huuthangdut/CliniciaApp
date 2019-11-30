import React, { useEffect } from 'react'
import { View, ActivityIndicator, StatusBar } from 'react-native'
import WithContext from '../../components/core/WithContext'

const AuthLoadingScreen = props => {
  const { navigation, context } = props
  const { isAuthenticated } = context

  useEffect(() => {
    isAuthenticated().then(isLogin => {
      if(isLogin) {
        navigation.navigate('App')
      } else {
        navigation.navigate('Login')
      }
    });
  }, [])

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size={40} />
      <StatusBar barStyle="default" />
    </View>
  )
}

export default WithContext(AuthLoadingScreen);