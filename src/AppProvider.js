import React, {useState} from 'react';
import AsyncStorage from '@react-native-community/async-storage';

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
    isAuthenticated: isAuthenticated
  };

  return (
    <AppContext.Provider value={store}>
      {props.children}
    </AppContext.Provider>
  );
};

export {AppContext, AppProvider as default};
