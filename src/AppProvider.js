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

  const [isVerifying, setIsVerifying] = useState(false);
  const [isLogging, setIsLogging] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
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
        NavigationService.reset('App');
      }
      setIsLogging(false);
    } catch (error) {
      if(error.errorCode === ApiErrorCode.RequireConfirmedPhoneNumber) {
        AuthService.request2fa(username).then(result => {
          setIsLogging(false);
          NavigationService.reset('Verify', { token: result.token })
        });
        
      } else {
        setIsLogging(false);
        console.log(error);
      }
    }
  };

  const register = async ({firstName, lastName, email, password, phoneNumber}) => {
    try {
      setIsRegistering(true);
      const result  = await AuthService.register({ 
        firstName, 
        lastName, 
        email, 
        password, 
        phoneNumber
      });
      if(result && result.token) {
        NavigationService.reset('Verify', { token: result.token });
      }
      setIsRegistering(false);
    } catch (error) {
      setIsRegistering(false);
      console.log(error);
    }
  };

  const verify = async (code, token) => {
    try {
      setIsVerifying(true);
      const result = await AuthService.verify2fa(code, token);
      if (result && result.accessToken) {
        await AsyncStorage.setItem('@access_token', result.accessToken);
        NavigationService.reset('Tab');
      }
      setIsVerifying(false);
    } catch(error) {
      setIsVerifying(false);
      console.log(error);
    }
  }

  const logout = async () => {
    const uuid = DeviceInfo.getUniqueId();
    await DeviceService.updateStatus(uuid, false);
    await AsyncStorage.removeItem('@access_token');
    NavigationService.reset('Auth');
  };

  const addNotification = (notification) => {
    setNotifications([notification, ...notifications]);
  }

  const store = {
    /**
     * global state
     */
    isVerifying: {get: isVerifying, set: setIsVerifying},
    isLogging: {get: isLogging, set: setIsLogging},
    isRegistering: {get: isRegistering, set: setIsRegistering},
    appointment: {get: appointment, set: setAppointment},
    notifications: {get: notifications, set: setNotifications, add: addNotification},
    notificationCount: {get: notificationCount, set: setNotificationCount},
    activeCounter: {get: activeCounter, set: setActiveCounter},

    /**
     * global function
     */
    isAuthenticated: isAuthenticated,
    login: login,
    register: register,
    logout: logout,
    verify: verify
  };

  return (
    <AppContext.Provider value={store}>
      {props.children}
    </AppContext.Provider>
  );
};

export {AppContext, AppProvider as default};
