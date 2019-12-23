import React, {useRef, useState, useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {Keyboard} from 'react-native';
import TextField from '../../components/core/TextField';
import Button from '../../components/core/Button';
import theme from '../../styles/theme';
import {AuthService} from '../../services/AuthService';
import validate from '../../common/validate';
import { Toast } from '../../utilities/toast';

const RegisterScreen = props => {
  const {navigation} = props;

  const lastNameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const phoneNumberRef = useRef();
  const clinicRef = useRef();

  const [firstName, setFirstName] = useState();
  const [firstNameError, setFirstNameError] = useState();
  const [lastName, setLastName] = useState();
  const [lastNameError, setLastNameError] = useState();
  const [clinic, setClinic] = useState();
  const [clinicError, setClinicError] = useState();
  const [email, setEmail] = useState();
  const [emailError, setEmailError] = useState();
  const [password, setPassword] = useState();
  const [passwordError, setPasswordError] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [phoneNumberError, setPhoneNumberError] = useState();
  const [isRegistering, setIsRegistering] = useState(false);

  const focusLastName = () => lastNameRef.current.focus();
  const focusClinic = () => clinicRef.current.focus();
  const focusEmail = () => emailRef.current.focus();
  const focusPassword = () => passwordRef.current.focus();
  const focusPhoneNumber = () => phoneNumberRef.current.focus();

  const goToLogin = () => navigation.replace({routeName: 'Login'});

  const register = async () => {
    const firstNameError = validate('firstName', firstName);
    const lastNameError = validate('lastName', lastName);
    const phoneNumberError = validate('phoneNumber', phoneNumber);
    const passwordError = validate('password', password);
    const emailError = validate('email', email);
    const clinicError = validate('clinic', clinic);

    setFirstNameError(firstNameError);
    setLastNameError(lastNameError);
    setPhoneNumberError(phoneNumberError);
    setPasswordError(passwordError);
    setEmailError(emailError);
    setClinicError(clinicError);

    if(firstNameError || lastNameError || phoneNumberError || passwordError || emailError || clinicError) {
      return;
    }

    try {
      setIsRegistering(true);
      const result = await AuthService.register({
        firstName,
        lastName,
        clinic,
        email,
        password,
        phoneNumber,
      });

      if (result && result.token) {
        navigation.navigate('Verify', {token: result.token});
      }
      setIsRegistering(false);
    } catch (error) {
      setIsRegistering(false);
      Toast.error(error.errorMessage);
    }
  };

  return (
    <ScrollView>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.container}>
          <View style={styles.form}>
            <Text style={styles.heading}>Đăng ký</Text>
            <Text style={styles.title}>Đăng ký tài khoản mới</Text>
            <TextField
              placeholder="Họ và tên đệm"
              onChangeText={value => setFirstName(value)}
              onBlur={() => setFirstNameError(validate('firstName', firstName))}
              onSubmitEditing={focusLastName}
              value={firstName}
              error={firstNameError}
              returnKeyType="next"
            />
            <TextField
              ref={lastNameRef}
              placeholder="Tên"
              onChangeText={value => setLastName(value)}
              onBlur={() => setLastNameError(validate('lastName', lastName))}
              onSubmitEditing={focusClinic}
              value={lastName}
              error={lastNameError}
              returnKeyType="next"
            />
             <TextField
              ref={clinicRef}
              placeholder="Tên phòng khám"
              onChangeText={value => setClinic(value)}
              onBlur={() => setClinicError(validate('clinic', clinic))}
              onSubmitEditing={focusEmail}
              value={clinic}
              error={clinicError}
              returnKeyType="next"
            />
            <TextField
              ref={emailRef}
              placeholder="Email"
              keyboardType="email-address"
              onChangeText={value => setEmail(value)}
              onBlur={() => setEmailError(validate('email', email))}
              onSubmitEditing={focusPhoneNumber}
              value={email}
              error={emailError}
              returnKeyType="next"
            />
            <TextField
              ref={phoneNumberRef}
              placeholder="Số điện thoại"
              keyboardType="phone-pad"
              onChangeText={value => setPhoneNumber(value)}
              onBlur={() => setPhoneNumberError(validate('phoneNumber', phoneNumber))}
              onSubmitEditing={focusPassword}
              value={phoneNumber}
              error={phoneNumberError}
              returnKeyType="next"
            />
            <TextField
              ref={passwordRef}
              placeholder="Mật khẩu"
              onChangeText={value => setPassword(value)}
              onBlur={() => setPasswordError(validate('password', password))}
              value={password}
              error={passwordError}
              returnKeyType="done"
              secureTextEntry={true}
            />
             <View
              style={{
                ...styles.row,
                marginBottom: 16,
              }}>
          </View>
            <Button
              title="Đăng ký"
              primary
              onPress={register}
              loading={isRegistering}
            />
          </View>
          <Text style={styles.signInLabel} onPress={() => goToLogin()}>
            Đã có tài khoản? Đăng nhập
          </Text>
        </View>
      </TouchableWithoutFeedback>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
    padding: 25,
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
  signInLabel: {
    textAlign: 'center',
    marginTop: 35,
    marginBottom: 8,
    fontSize: 17,
    fontFamily: 'SF-Pro-Text-Regular',
    color: theme.colors.gray,
  },
});

export default RegisterScreen;
