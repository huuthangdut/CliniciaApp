import React, { useEffect, useContext } from 'react';
import Navigator from './Navigator';
import AppProvider, { AppContext } from './AppProvider';
import { Platform, Alert } from 'react-native';
import firebase from 'react-native-firebase';
import NotificationProvider, { NotificationContext } from './components/core/NotificationsContext';
import { NavigationService } from './services/NavigationService';


const App = () => {
  const notificationContext = useContext(NotificationContext)
  console.log(notificationContext)

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
      Alert.alert(fcmToken);
      console.log(fcmToken);
      // const deviceUuid = DeviceInfo.getUniqueId();
      // await DeviceService.addOrUpdateDevice(fcmToken, Platform.OS, deviceUuid);
    } else {
      console.log('No token received');
    }
  };

  const requestPermission = async () => {
    try {
      await firebase.messaging().requestPermission();
    } catch (error) { }
  };

  const messageListener = async () => {
    /*
     * Triggered when a particular notification has been received in foreground
     * */
    const notificationListener = firebase
      .notifications()
      .onNotification(notification => {
        const { title, body, data } = notification;
        Alert.alert(title);
      });

    /*
     * If your app is in background, you can listen for when a notification is clicked / tapped / opened as follows:
     * */
    const notificationOpenedListener = firebase
      .notifications()
      .onNotificationOpened(notificationOpen => {
        const { title, body } = notificationOpen.notification;
      });

    /*
     * If your app is closed, you can check if it was opened by a notification being clicked / tapped / opened as follows:
     * */
    const notificationOpen = await firebase
      .notifications()
      .getInitialNotification();
    if (notificationOpen) {
      const { title, body } = notificationOpen.notification;
    }

    /*
     * Triggered for data only payload in foreground
     * */
    firebase.messaging().onMessage(message => {
      console.log('FCM Message Data:', message.data);
    });
  };

  useEffect(() => {
    checkPermission();
    messageListener();
  }, []);

  return (
    <AppProvider>
        <Navigator
          screenProps={
            {
              notificationCount: notificationContext.notificationCount.get, 
              setNotificationCount: notificationContext.notificationCount.set
            }}
          ref={navigationRef =>
            NavigationService.setTopLevelNavigator(navigationRef)
          }
        />
    </AppProvider>
  );
};

export default App