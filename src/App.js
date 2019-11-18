import React, {Fragment,useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Alert
} from 'react-native';
import Navigator from './Navigator';
import AppProvider from './AppProvider';
import AsyncStorage from '@react-native-community/async-storage';
import firebase from 'react-native-firebase';

const App = () => {

  const checkPermission = async () => {
    const enabled = await firebase.messaging().hasPermission();
    if (enabled) {
        getFcmToken();
    } else {
        requestPermission();
    }
  }

  const getFcmToken = async () => {
    const fcmToken = await firebase.messaging().getToken();
    if (fcmToken) {
      // console.log(fcmToken);
      await AsyncStorage.setItem('@fcm_token', fcmToken);
      showAlert('Your Firebase Token is:', fcmToken);
    } else {
      showAlert('Failed', 'No token received');
    }

    // firebase.messaging().onTokenRefresh(fcmToken => {
    //   // Process your token as required
    // });
  }

  // ios only API
  const requestPermission = async () => {
    try {
      await firebase.messaging().requestPermission();
      // User has authorised
    } catch (error) {
        // User has rejected permissions
    }
  }

  const messageListener = async () => {
    const notificationListener = firebase.notifications().onNotification((notification) => {
        const { title, body } = notification;
        showAlert(title, body);
    });
  
    // mở notification trong khi app đang ở trạng thái background hoặc foreground
    const notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen) => {
        const { title, body } = notificationOpen.notification;
        showAlert(title, body);
        // Get the action triggered by the notification being opened
        const action = notificationOpen.action;
        // Get information about the notification that was opened
        ///
    });
  
    // mở notification khi app closed
    const notificationOpen = await firebase.notifications().getInitialNotification();
    if (notificationOpen) {
        const { title, body } = notificationOpen.notification;
        showAlert(title, body);
    }

    firebase.messaging().setBackgroundMessageHandler((message) => {
      console.log('Background FCM Message Data:', message.data);
    });
  
    // is only called when the app is active (in the foreground)
    firebase.messaging().onMessage((message) => {
      console.log("vo day ne");
      console.log('FCM Message Data:', message.data);
    });
  }

  const showAlert = (title, message) => {
    Alert.alert(
      title,
      message,
      [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ],
      {cancelable: false},
    );
  }

  useEffect(() => {
    checkPermission();
    messageListener();
  }, []);

  return (
    <AppProvider>
      <Navigator/>
    </AppProvider>
  );
};

export default App;