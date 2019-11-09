import React from 'react';
import { AuthService } from './services/AuthService';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

const AppContext = React.createContext();

class AppProvider extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      // booking
      appointment: {
        date: null,
        duration: 0,
        price: 0,
        description: 0,
        type: 0,
        doctorId: null
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
          }
        } catch(error) {
          Alert.alert(error.errorMessage);
        }
      },
      logout: async () => {
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