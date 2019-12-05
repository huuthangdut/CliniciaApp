import React from 'react';
import AppProvider from './AppProvider';
import App from './App';
import NotificationProvider from './components/core/NotificationsContext'

const Root = () => {
  return (
    <NotificationProvider>
        <App/>
    </NotificationProvider>
  );
};

export default Root;