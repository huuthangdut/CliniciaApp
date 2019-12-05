import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-community/async-storage';

const NotificationContext = React.createContext();

const NotificationProvider = props => {
  const [notifications, setNotifications] = useState([]);
  const [notificationCount, setNotificationCount] = useState(0);
  const [authUser, setAuthUser] = useState();

  const addNotification = notification => {
    setNotificationCount(count => count + 1);
    setNotifications(_list =>  [notification, ..._list]);
  };

  const store = {
    /**
     * global state
     */
    notifications: {
      get: notifications,//coi goi ben app js // day copy cua thang chăc ko sai chi mo
      set: setNotifications,
      add: addNotification
    },
    notificationCount: {get: notificationCount, set: setNotificationCount},
    /**
     * global function
     */
  };

  useEffect(() => {
    AsyncStorage.getItem('@notification_count').then(count => {
      setNotificationCount(+count || 0);
    });
  }, []);

  return (
    <NotificationContext.Provider value={store}>{props.children}</NotificationContext.Provider>
  );
};

export {NotificationContext, NotificationProvider as default};
