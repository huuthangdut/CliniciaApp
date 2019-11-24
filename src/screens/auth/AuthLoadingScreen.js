import React, {useContext, useEffect} from 'react';
import {View, ActivityIndicator, StatusBar} from 'react-native';
import {AppContext} from '../../AppProvider';

const AuthLoadingScreen = props => {
  const {navigation} = props;
  const context = useContext(AppContext);

  useEffect(() => {
    context.isAuthenticated().then(loggedIn => {
      if(loggedIn) {
        navigation.navigate('App');
      } else {
        navigation.navigate('Auth');
      }
    });    
  }, []);

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <ActivityIndicator size={40}/>
      <StatusBar barStyle="default" />
    </View>
  );
};

export default AuthLoadingScreen;
