import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-community/async-storage';

const NotificationContext = React.createContext();

const NotificationProvider = props => {
  const [notifications, setNotifications] = useState([])
  const [notificationCount, setNotificationCount] = useState(0)
  const [fcmToken, setFcmToken] = useState('')
  const [deviceId, setDeviceId] = useState('')
  const [isReloadOrder, setReloadOrder] = useState(false)
  const [isReloadNotification, setReloadNotification] = useState(false)
  const [listNewNotice, setListNewNotive] = useState([])

  const addNotification = notification => {
    setNotificationCount(count => count + 1)
    // setNotifications(_list =>  [notification, ..._list]);
  }

  const store = {
    /**
     * global state
     */
    notifications: {
      get: notifications,
      set: setNotifications,
      add: addNotification
    },
    notificationCount: {
      get: notificationCount, 
      set: setNotificationCount
    },
    fcmToken: {
      get: fcmToken, 
      set: setFcmToken
    },
    deviceId: {
      get: deviceId, 
      set: setDeviceId
    },
    reloadOrder: {
      get: isReloadOrder,
      set: setReloadOrder
    },
    reloadNotification: {
      get: isReloadNotification,
      set: setReloadNotification
    },
    listNewNotice: {
      get: listNewNotice,
      set: setListNewNotive
    }
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
