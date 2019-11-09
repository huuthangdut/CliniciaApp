import React from 'react';
import WithContext from '../../components/core/WithContext';
import {StyleSheet, ScrollView, View, Text} from 'react-native';
import UserInfo from './components/UserInfo';
import Option from './components/Option';
import Setting from './components/Setting';
import Address from './components/Address';
import theme from '../../styles/theme';

const AccountScreen = props => {
  return (
    <ScrollView style={styles.container}>
        {/* <Text style={styles.header}>Tài khoản</Text> */}
        <UserInfo />
        <Option navigation={props.navigation} />
        <Address />
        <Setting navigation={props.navigation} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white
  },
  header: {
    fontSize: 34,
    fontFamily: 'SF-Pro-Display-Bold',
    paddingHorizontal: 20,
  }
});

export default WithContext(AccountScreen);
