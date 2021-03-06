import React, {useEffect, useContext, useCallback} from 'react';
import Navigator from './Navigator';
import AppProvider, { AppContext } from './AppProvider';
import firebase from 'react-native-firebase';
import {NavigationService} from './services/NavigationService';
import {DeviceService} from './services/DeviceService';
import DeviceInfo from 'react-native-device-info';
import {Platform, Alert} from 'react-native';

const App = () => {
  const context = useContext(AppContext);

  const checkPermission = async () => {
    const enabled = await firebase.messaging().hasPermission();
    if (enabled) {
      getFcmToken();
    } else {
      requestPermission();
    }
  };

  const getFcmToken = async () => {
    const fcmToken = await firebase.messaging().getToken();
    if (fcmToken) {
      console.log(fcmToken);
      const deviceUuid = DeviceInfo.getUniqueId();
      context.deviceToken.set(fcmToken);
    } else {
      console.log('No token received');
    }
  };

  const requestPermission = async () => {
    try {
      await firebase.messaging().requestPermission();
    } catch (error) {}
  };

  const notificationCallback = useCallback((notification) => {
    const {title, body, data} = notification;
    context.notifications.add({id: data.id, title: title, content: body, hasRead: false, notificationDate: data.notificationDate, image: data.image, appointmentId: data.appointmentId});
    context.shouldReloadAppointmentList.set(val => !val);
    context.shouldReloadReminder.set(val => !val);
  }, []);

  
  const messageListener = async () => {
    /*
     * Triggered when a particular notification has been received in foreground
     * */
    const notificationListener = firebase
      .notifications()
      .onNotification(notificationCallback);

    /*
     * If your app is in background, you can listen for when a notification is clicked / tapped / opened as follows:
     * */
    const notificationOpenedListener = firebase
      .notifications()
      .onNotificationOpened(notificationOpen => {
        const {title, body} = notificationOpen.notification;
      });

    /*
     * If your app is closed, you can check if it was opened by a notification being clicked / tapped / opened as follows:
     * */
    const notificationOpen = await firebase
      .notifications()
      .getInitialNotification();
    if (notificationOpen) {
      const {title, body} = notificationOpen.notification;
    }

    /*
     * Triggered for data only payload in foreground
     * */
    firebase.messaging().onMessage(message => {
      console.log('FCM Message Data:', message.data);
    });
    return {
      notificationListener
    };
  };

  useEffect(() => {
    checkPermission();
    messageListener();
    // navigation.setParams({ setNotificationCount: context.notificationCount.set })
  }, []);

  return (
    <Navigator
      screenProps={
        {
          notificationCount: context.notificationCount.get, 
          setNotificationCount: context.notificationCount.set
        }}
      ref={navigationRef =>
        NavigationService.setTopLevelNavigator(navigationRef)
      }
    />
  );
};

export default App;
