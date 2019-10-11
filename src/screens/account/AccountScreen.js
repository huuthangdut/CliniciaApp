import React from 'react';
import WithContext from '../../components/core/WithContext'
import {
  StyleSheet,
  ScrollView,
  View,
} from 'react-native';
import Info from './components/Info'
import Option from './components/Option'
import Setting from './components/Setting'
import Address from './components/Address'

const AccountScreen = props => {
  return (
    <ScrollView>
      <View style= {styles.container}>
        <Info/>
        <Option navigation={props.navigation}/>
        <Address/>
        <Setting navigation={props.navigation}/>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  
})

export default WithContext(AccountScreen)