import React from 'react';
import WithContext from '../../components/core/WithContext';
import {StyleSheet, ScrollView, View} from 'react-native';
import UserInfo from './components/UserInfo';
import Option from './components/Option';
import Setting from './components/Setting';
import Address from './components/Address';
import theme from '../../styles/theme';

const AccountScreen = props => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.container}>
        <UserInfo />
        <Option navigation={props.navigation} />
        <Address />
        <Setting navigation={props.navigation} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white
  },
});

export default WithContext(AccountScreen);
