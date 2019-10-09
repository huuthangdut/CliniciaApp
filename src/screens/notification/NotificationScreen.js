import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import NotificationList from './components/NotificationList';

const NotificationScreen = props => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Notifications</Text>
      <NotificationList />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  header: {
    fontSize: 34,
    fontFamily: 'SF-Pro-Display-Bold',
    paddingHorizontal: 20
  },
});

export default NotificationScreen;
