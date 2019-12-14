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
import AsyncStorage from '@react-native-community/async-storage';
import {AuthService} from '../../services/AuthService';
import validate from '../../common/validate';

const VerifyScreen = props => {
  const {navigation} = props;

  const token = navigation.getParam('token');
  const [otpCode, setOtpCode] = useState();
  const [otpCodeError, setOptCodeError] = useState();
  const [isVerifying, setIsVerifying] = useState(false);

  const onChangeOtpCode = (value) => {
    setOtpCode(value);
  };

  const verify = async () => {
    const verifyCodeError = validate('verifyCode', otpCode);
    setOptCodeError(verifyCodeError);
    if(verifyCodeError) {
      return;
    }

    try {
      setIsVerifying(true);
      const result = await AuthService.verify2fa(otpCode, token);
      if (result && result.accessToken) {
        await AsyncStorage.setItem('@access_token', result.accessToken);
        navigation.navigate('InitLocation');
      }
      setIsVerifying(false);
    } catch(error) {
      setIsVerifying(false);
      console.log(error);
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <View style={styles.form}>
          <Text style={styles.heading}>Xác thực</Text>
          <Text style={styles.title}>Xác thực số điện thoại</Text>
          <TextField
            placeholder="Mã xác thực"
            keyboardType="numeric"
            onChangeText={value => onChangeOtpCode(value)}
            onBlur={() => setOptCodeError(validate('verifyCode', otpCode))}
            value={otpCode}
            error={otpCodeError}
            returnKeyType="done"
          />
          <Button title="Xác thực" primary onPress={verify} loading={isVerifying}/>
        </View>
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
  }
});

export default VerifyScreen;
