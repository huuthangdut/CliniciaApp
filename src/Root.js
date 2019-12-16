import React from 'react'
import App from './App'
import NotificationProvider from './components/core/NotificationsContext'
import AppProvider from './AppProvider'

const Root = () => {
  return (
    <AppProvider>
    <NotificationProvider>
      <App />
    </NotificationProvider>
    </AppProvider>
  );
};

export default Root;