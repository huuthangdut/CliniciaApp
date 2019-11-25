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
import {AppContext} from '../../AppProvider';

const RegisterScreen = props => {
  const {navigation} = props;
  const context = useContext(AppContext);

  const lastNameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const phoneNumberRef = useRef();

  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [phoneNumber, setPhoneNumber] = useState();

  const focusLastName = () => lastNameRef.current.focus();
  const focusEmail = () => emailRef.current.focus();
  const focusPassword = () => passwordRef.current.focus();
  const focusPhoneNumber = () => phoneNumberRef.current.focus();

  const goToLogin = () => navigation.replace({routeName: 'Login'});

  const register = async () => {
    await context.register({
      firstName,
      lastName,
      email,
      password,
      phoneNumber
    });
  }

  return (
    // <ScrollView>
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <View style={styles.form}>
          <Text style={styles.heading}>Đăng ký</Text>
          <Text style={styles.title}>Đăng ký tài khoản mới</Text>
          <TextField
            placeholder="Họ và tên đệm"
            onChangeText={value => setFirstName(value)}
            onSubmitEditing={focusLastName}
            value={firstName}
            returnKeyType="next"
          />
          <TextField
            ref={lastNameRef}
            placeholder="Tên"
            onChangeText={value => setLastName(value)}
            onSubmitEditing={focusEmail}
            value={lastName}
            returnKeyType="next"
          />
          <TextField
            ref={emailRef}
            placeholder="Email"
            keyboardType="email-address"
            onChangeText={value => setEmail(value)}
            onSubmitEditing={focusPassword}
            value={email}
            returnKeyType="next"
          />
          <TextField
            ref={phoneNumberRef}
            placeholder="Số điện thoại"
            keyboardType="phone-pad"
            onChangeText={value => setPhoneNumber(value)}
            onSubmitEditing={() => {}}
            value={phoneNumber}
            returnKeyType="next"
          />
          <TextField
            ref={passwordRef}
            placeholder="Mật khẩu"
            onChangeText={value => setPassword(value)}
            onSubmitEditing={focusPhoneNumber}
            value={password}
            returnKeyType="done"
            secureTextEntry={true}
          />
          <Button title="Đăng ký" primary onPress={register} loading={context.isRegistering.get}/>
        </View>
        <Text style={styles.signInLabel} onPress={() => goToLogin()}>
          Đã có tài khoản? Đăng nhập
        </Text>
      </View>
    </TouchableWithoutFeedback>
    // </ScrollView>
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
  },
  signInLabel: {
    textAlign: 'center',
    marginVertical: 8,
    fontSize: 17,
    fontFamily: 'SF-Pro-Text-Regular',
    color: theme.colors.gray
  },
});

export default RegisterScreen;
