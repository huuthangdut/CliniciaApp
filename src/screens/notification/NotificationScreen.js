import React, {Fragment} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import NotificationList from './components/NotificationList';
import Header from '../../components/core/Header';

const NotificationScreen = props => {
  return (
    <Fragment>
      <Header hasBackIcon={false} hasRightMenu={true}/>
      <View style={styles.container}>
        <Text style={styles.header}>Notifications</Text>
        <NotificationList />
      </View>
    </Fragment>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    fontSize: 34,
    fontFamily: 'SF-Pro-Display-Bold',
    paddingHorizontal: 20,
  },
});

export default NotificationScreen;
