import React, {useState} from 'react';
import {AuthService} from './services/AuthService';
import AsyncStorage from '@react-native-community/async-storage';
import DeviceInfo from 'react-native-device-info';
import {DeviceService} from './services/DeviceService';
import { ApiErrorCode } from './common/enums';
import {NavigationService} from './services/NavigationService';

const AppContext = React.createContext();

const AppProvider = (props) => {
  const {navigation} = props;

  const [isLogging, setIsLogging] = useState(false);
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
      setIsLogging(true);
      const result = await AuthService.login(username, password);
      if (result) {
        await AsyncStorage.setItem('@access_token', result.accessToken);

        setIsLogging(false);
        NavigationService.reset('Tab');
      }
      setIsLogging(false);
    } catch (error) {
      if(error.errorCode === ApiErrorCode.RequireConfirmedPhoneNumber) {
        AuthService.request2fa(username).then(result => {
          setIsLogging(false);
          NavigationService.navigate('ConfirmPhoneNumber', { token: result.token })
        });
        
      } else {
        setIsLogging(false);
        console.log(error);
      }
    }
  };

  const logout = async () => {
    const uuid = DeviceInfo.getUniqueId();
    await DeviceService.updateStatus(uuid, false);
    await AsyncStorage.removeItem('@access_token');
    // NavigationService.reset('Tab');
  };

  const addNotification = (notification) => {
    setNotifications([notification, ...notifications]);
  }

  const store = {
    /**
     * global state
     */
    isLogging: {get: isLogging, set: setIsLogging},
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
