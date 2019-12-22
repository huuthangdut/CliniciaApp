import React, { useEffect } from 'react'
import { View, ActivityIndicator, StatusBar } from 'react-native'
import WithContext from '../../components/core/WithContext'

const AuthLoadingScreen = props => {
  const { navigation, context } = props
  const { isAuthenticated, isStoredRestaurant, user } = context

  useEffect(() => {
    isAuthenticated().then(isLogin => {
      if (isLogin) {
        isStoredRestaurant().then(savedStore => {
          console.log(savedStore);
          
          if (savedStore) {
            navigation.navigate('App')
          } else {
            if (user.userId) {
              navigation.navigate('ChooseStore')
            }
          }
        })
      } else {
        navigation.navigate('Login')
      }
    })
  }, [user])

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size={40} />
      <StatusBar barStyle="default" />
    </View>
  )
}

export default WithContext(AuthLoadingScreen);