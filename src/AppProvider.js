import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { Utils } from './utilities/utils';

const AppContext = React.createContext();

const AppProvider = props => {
  const [appointment, setAppointment] = useState({});
  const [notifications, setNotifications] = useState([]);
  const [notificationCount, setNotificationCount] = useState(0);
  const [authUser, setAuthUser] = useState();

  const isAuthenticated = async () => {
    const token = await AsyncStorage.getItem('@access_token');
    if (token !== null) {
       setAuthUser(Utils.getAuthUser(token));
    }
    return token !== null;
  };

  const addNotification = notification => {
    setNotificationCount(count => count + 1);
    setNotifications(_list =>  [notification, ..._list]);
  };

  const store = {
    /**
     * global state
     */
    authUser: {get: authUser, set: setAuthUser},
    appointment: {get: appointment, set: setAppointment},
    notifications: {
      get: notifications,
      set: setNotifications,
      add: addNotification,
    },
    notificationCount: {get: notificationCount, set: setNotificationCount},
    /**
     * global function
     */
    isAuthenticated: isAuthenticated
  };

  useEffect(() => {
    AsyncStorage.getItem('@notification_count').then(count => {
      setNotificationCount(+count || 0);
    });
  }, []);

  return (
    <AppContext.Provider value={store}>{props.children}</AppContext.Provider>
  );
};

export {AppContext, AppProvider as default};
