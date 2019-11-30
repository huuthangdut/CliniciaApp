import React, {Fragment} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import NotificationList from './components/NotificationList';
import Header from '../../components/core/Header';

const NotificationScreen = props => {
  const { navigation } = props

  return (
    <Fragment>
      <Header navigation={navigation} title='Notifications'/>
      <View style={styles.container}>
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
});

export default NotificationScreen;
