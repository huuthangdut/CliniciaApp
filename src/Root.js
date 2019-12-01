import React from 'react';
import AppProvider from './AppProvider';
import App from './App';

const Root = () => {
  return (
    <AppProvider>
        <App/>
    </AppProvider>
  );
};

export default Root;