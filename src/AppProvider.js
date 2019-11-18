import React from 'react';
import { AuthService } from './services/AuthService';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import DeviceInfo from 'react-native-device-info';
import {DeviceService} from './services/DeviceService';
import {Platform} from 'react-native';

const AppContext = React.createContext();

class AppProvider extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      // booking
      appointment: {
        date: null,
        time: null,
        checkingService: null,
        doctor: null
      },

      isAuthenticated: async () => {
        const token = await AsyncStorage.getItem('@access_token');

        // check token expired here
        return token !== null;
      },
      login: async (username, password) => {
        try {
          const result = await AuthService.login(username, password);
          if(result) {
            await AsyncStorage.setItem('@access_token', result.accessToken);
            const deviceUuid = DeviceInfo.getUniqueId();
            const fcmToken = await AsyncStorage.getItem('@fcm_token');

            if(deviceUuid && fcmToken) {
              await DeviceService.addOrUpdateDevice(fcmToken, Platform.OS, deviceUuid);
            }
          }
        } catch(error) {
          Alert.alert(error.errorMessage);
        }
      },
      logout: async () => {
        const uuid = DeviceInfo.getUniqueId();
        await DeviceService.updateStatus(uuid, false);
        await AsyncStorage.removeItem('@access_token');
      },
    };
  }
  
  render() {
    return (
      <AppContext.Provider value={this.state}>
        {this.props.children}
      </AppContext.Provider>
    )
  }
}

export { AppContext, AppProvider as default }