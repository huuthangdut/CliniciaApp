import React, {useState, useEffect} from 'react';
import {AuthService} from './services/AuthService';
import {Alert} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import DeviceInfo from 'react-native-device-info';
import {DeviceService} from './services/DeviceService';
import {Platform} from 'react-native';

const AppContext = React.createContext();

const AppProvider = (props) => {
  const [appointment, setAppointment] = useState({});
  const [notifications, setNotifications] = useState([]);
  const [notificationCount, setNotificationCount] = useState(0);
  const [activeCounter, setActiveCounter] = useState(true);

  const isAuthenticated = async () => {
    const token = await AsyncStorage.getItem('@access_token');
    return token !== null;
  };

  const login = async (username, password) => {
    try {
      const result = await AuthService.login(username, password);
      if (result) {
        await AsyncStorage.setItem('@access_token', result.accessToken);
        const deviceUuid = DeviceInfo.getUniqueId();
        const fcmToken = await AsyncStorage.getItem('@fcm_token');

        if (deviceUuid && fcmToken) {
          await DeviceService.addOrUpdateDevice(
            fcmToken,
            Platform.OS,
            deviceUuid,
          );
        }
      }
    } catch (error) {
      Alert.alert(error.errorMessage);
    }
  };

  const logout = async () => {
    const uuid = DeviceInfo.getUniqueId();
    await DeviceService.updateStatus(uuid, false);
    await AsyncStorage.removeItem('@access_token');
  };

  const addNotification = (notification) => {
    setNotifications([notification, ...notifications]);
  }

  const store = {
    /**
     * global state
     */
    appointment: {get: appointment, set: setAppointment},
    notifications: {get: notifications, set: setNotifications, add: addNotification},
    notificationCount: {get: notificationCount, set: setNotificationCount},
    activeCounter: {get: activeCounter, set: setActiveCounter},

    /**
     * global function
     */
    isAuthenticated: isAuthenticated,
    login: login,
    logout: logout,
  };

  return (
    <AppContext.Provider value={store}>
      {props.children}
    </AppContext.Provider>
  );
};

export {AppContext, AppProvider as default};
