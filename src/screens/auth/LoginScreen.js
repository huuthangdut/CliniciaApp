import React, {useRef, useState, useContext} from 'react';
import {
  TouchableWithoutFeedback,
  View,
  Text,
  Keyboard,
  StyleSheet,
} from 'react-native';
import TextField from '../../components/core/TextField';
import Button from '../../components/core/Button';
import theme from '../../styles/theme';
import {AuthService} from '../../services/AuthService';
import AsyncStorage from '@react-native-community/async-storage';
import { AppContext } from '../../AppProvider';
import {Utils} from '../../utilities/utils';
import {DeviceService} from '../../services/DeviceService';
import DeviceInfo from 'react-native-device-info';
import { ApiErrorCode } from '../../common/enums';
import validate from '../../common/validate';

const LoginScreen = props => {
  const {navigation} = props;
  const context = useContext(AppContext);

  const passwordRef = useRef();

  const [username, setUsername] = useState();
  const [usernameError, setUsernameError] = useState();
  const [password, setPassword] = useState();
  const [passwordError, setPasswordError] = useState();
  const [isLogging, setIsLogging] = useState(false);

  const focusPassword = () => passwordRef.current.focus();

  const onChangeUsername = (value) => {
    value = value.replace(/[^0-9+]+/g, '');
    setUsername(value);
  };

  const onChangePassword = (value) => {
    setPassword(value);
  }

  const login = async () => { 
    const userNameError = validate('phoneNumber', username);
    const passwordError = validate('password', password);
    setUsernameError(userNameError);
    setPasswordError(passwordError);

    if(usernameError || passwordError) {
      return;
    }

    try {
      setIsLogging(true);
      const result = await AuthService.login(username, password);
      if (result) {
        await AsyncStorage.setItem('@access_token', result.accessToken);
        context.authUser.set(Utils.getAuthUser(result.accessToken));

        await DeviceService.addOrUpdateDevice(context.deviceToken.get, Platform.OS, DeviceInfo.getUniqueId());
        
        navigation.navigate('App');
      }
      setIsLogging(false);
    } catch (error) {
      if(error.errorCode === ApiErrorCode.RequireConfirmedPhoneNumber) {
        AuthService.request2fa(username).then(result => {
          setIsLogging(false);
          // console.log(result);
          navigation.navigate('Verify', { token: result.token });
        });
        
      } else {
        setIsLogging(false);
        console.log(error);
      }
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <View style={styles.form}>
          <Text style={styles.heading}>Đăng nhập</Text>
          <Text style={styles.title}>Đăng nhập bằng số điện thoại</Text>
          <TextField
            placeholder="Số điện thoại"
            keyboardType="phone-pad"
            onChangeText={value => onChangeUsername(value)}
            onBlur={() => setUsernameError(validate('phoneNumber', username))}
            error={usernameError}
            value={username}
            onSubmitEditing={focusPassword}
            returnKeyType="next"
          />
          <TextField
            ref={passwordRef}
            placeholder="Mật khẩu"
            onChangeText={value => onChangePassword(value)}
            onBlur={() => setPasswordError(validate('password', password))}
            error={passwordError}
            value={password}
            returnKeyType="done"
            secureTextEntry={true}
          />
          <View
            style={{
              ...styles.row,
              marginBottom: 16,
            }}>
            {/* <Text style={styles.forgotPasswordLabel}>Quên mật khẩu?</Text> */}
          </View>
          <Button title="Đăng nhập" primary onPress={login} loading={isLogging}/>
        </View>
        <Text style={styles.signUpLabel} onPress={() => navigation.navigate('Register')}>
          Chưa có tài khoản? Đăng kí  
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
    padding: 25
  },
  row: {
    flexDirection: 'row',
  },
  form: {
    flexGrow: 2,
    marginTop: 20,
  },
  heading: {
    fontSize: 40,
    fontFamily: 'SF-Pro-Display-Bold',
    marginVertical: 16,
  },
  title: {
    fontSize: 17,
    fontFamily: 'SF-Pro-Text-Regular',
    color: theme.colors.darkGray,
    marginVertical: 28,
  },
  forgotPasswordLabel: {
    flex: 1,
    textAlign: 'right',
    color: theme.colors.gray,
    fontSize: 15,
    fontFamily: 'SF-Pro-Text-Regular',
    marginBottom: 5,
  },
  signUpLabel: {
    textAlign: 'center',
    marginVertical: 8,
    fontSize: 17,
    fontFamily: 'SF-Pro-Text-Regular',
    color: theme.colors.gray,
  },
});

export default LoginScreen;
