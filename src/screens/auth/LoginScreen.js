import React, { useRef, useState } from 'react';
import {TouchableWithoutFeedback, View, Text, Keyboard, StyleSheet, Alert} from 'react-native';
import TextField from '../../components/core/TextField';
import Button from '../../components/core/Button';
import theme from '../../styles/theme';
import WithContext from '../../components/core/WithContext';

const LoginScreen = props => {
  const passwordRef = useRef();

  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  const focusPassword = () => passwordRef.current.focus();

  const login = async () => {
    await props.context.login(username, password);
    const isAuthenticated = props.context.isAuthenticated();
    if(isAuthenticated) {
      props.navigation.navigate('Tab');
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <View style={styles.form}>
          <Text style={styles.heading}>Welcome back</Text>
          <Text style={styles.title}>Sign in to continue</Text>
          <TextField
            placeholder="Email"
            keyboardType="email-address"
            onChangeText={(value) => setUsername(value)}
            onSubmitEditing={focusPassword}
            returnKeyType="next"
          />
          <TextField
            ref={passwordRef}
            placeholder="Password"
            onChangeText={(value) => setPassword(value)}
            returnKeyType="done"
            secureTextEntry={true}
          />
          <View
            style={{
              ...styles.row,
              marginBottom: 16,
            }}>
            <Text style={styles.forgotPasswordLabel}>
              Forgot password?
            </Text>
          </View>
          <Button title="Sign In" primary onPress={login} />
        </View>
        <Text
          style={styles.signUpLabel}
          onPress={() => {}}>
          Don't have an account? Sign Up
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
      flexDirection: 'row'
    },
    form: {
      flexGrow: 2,
      marginTop: 20
    },
    heading: {
      fontSize: 40,
      fontFamily: 'SF-Pro-Display-Bold',
      marginVertical: 16
    },
    title: {
      fontSize: 17,
      fontFamily: 'SF-Pro-Text-Regular',
      color: theme.colors.darkGray,
      marginVertical: 28
    },
    forgotPasswordLabel: {
      flex: 1,
      textAlign: 'right',
      color: theme.colors.gray,
      fontSize: 15,
      fontFamily: 'SF-Pro-Text-Regular',
      marginBottom: 5
    },
    signUpLabel: {
      textAlign: "center",
      marginVertical: 8,
      fontSize: 17,
      fontFamily: 'SF-Pro-Text-Regular',
      color: theme.colors.gray
    }
  });

export default WithContext(LoginScreen);
