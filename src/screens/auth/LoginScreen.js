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

const LoginScreen = props => {
  const {navigation} = props;

  const passwordRef = useRef();

  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [isLogging, setIsLogging] = useState(false);

  const focusPassword = () => passwordRef.current.focus();

  const onChangeUsername = (value) => {
    value = value.replace(/[^0-9+]+/g, '');
    setUsername(value);
  };

  const login = async () => {
    try {
      setIsLogging(true);
      const result = await AuthService.login(username, password);
      if (result) {
        await AsyncStorage.setItem('@access_token', result.accessToken);
        navigation.navigate('App');
      }
      setIsLogging(false);
    } catch (error) {
      if(error.errorCode === ApiErrorCode.RequireConfirmedPhoneNumber) {
        AuthService.request2fa(username).then(result => {
          setIsLogging(false);
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
            placeholder="Số điện thoại (+84)"
            keyboardType="numeric"
            onChangeText={value => onChangeUsername(value)}
            value={username}
            onSubmitEditing={focusPassword}
            returnKeyType="next"
          />
          <TextField
            ref={passwordRef}
            placeholder="Mật khẩu"
            onChangeText={value => setPassword(value)}
            returnKeyType="done"
            secureTextEntry={true}
          />
          <View
            style={{
              ...styles.row,
              marginBottom: 16,
            }}>
            <Text style={styles.forgotPasswordLabel}>Quên mật khẩu?</Text>
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
