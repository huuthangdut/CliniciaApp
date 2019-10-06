import React from 'react';
import Navigator from './Navigator';
import AppProvider from './AppProvider';

const App = () => {
  return (
    <AppProvider>
      <Navigator/>
    </AppProvider>
  );
};

export default App;