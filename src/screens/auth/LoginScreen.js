import React, { useRef, useState } from 'react';
import { TouchableWithoutFeedback, View, Text, Keyboard, StyleSheet, Alert, ImageBackground, Dimensions, ActivityIndicator, ScrollView, ToastAndroid } from 'react-native';
import TextField from '../../components/core/TextField';
import Button from '../../components/core/Button';
import theme from '../../styles/theme';
import WithContext from '../../components/core/WithContext';
import { AuthService } from '../../services/AuthService';

const LoginScreen = props => {
  const { navigation } = props
  const { login, signUp, setTempLocation } = props.context

  const passwordRef = useRef();
  const repasswordRef = useRef();
  const firstNameRef = useRef();
  const lastNameRef = useRef();

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [repassword, setRepassword] = useState('')
  const [signUpMode, setSignUpMode] = useState(false)
  const [isLoading, setLoading] = useState(false)

  const focusNext = () => {
    if(firstNameRef.current) {
      firstNameRef.current.focus()
    } else {
      passwordRef.current.focus()
    }
  }

  const focusPassword = () => {
    passwordRef.current.focus()
  }

  const focusRepassword = () => {
    repasswordRef.current.focus()
  }
  
  const focusLastName = () => {
    lastNameRef.current.focus()
  }
  
  const handleLogin = async () => {
    setLoading(true)

    const merchantApp = true

    AuthService.login(
      username,
      password,
      '',
      '',
      merchantApp,
      res => {
        if (res.data.errors) {
          handleErr(res.data.errors)
        }
        if (res.data.data) {
          console.log(res.data.data)
          props.context && login(res.data.data.login)
          setTempLocation(res.data.data.login.location[0])
          navigation.navigate('ChooseStore', {userId: res.data.data.login.userId})
        }
        setLoading(false)
      },
      err => {
        alert(err)
        setLoading(false)
      }
    );
  }

  const handleErr = errs => {
    let errors = []

    if(errs.length > 0) {
      errs.map(item => {
        errors.push(item.message)
      })
    }

    setLoading(false)
    alert(errors)
  }

  const handleSignUp = () => {
    setLoading(true)

    let data = {
      firstName: firstName,
      lastName: lastName,
      email: username,
      password: password,
      repassword: repassword,
    }

    AuthService.signUp(
      data,
      true,
      res => {
        console.log(res.data)
        if (res.data.errors) {
          handleErr(res.data.errors)
        }
        if (res.data.data) {
          setLoading(false)
          setSignUpMode(false)
          ToastAndroid.show('Create account successfully', ToastAndroid.SHORT)
        }
      },
      err => {
        console.log(err)
        alert(err)
        setLoading(false)
      }
    )
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <ImageBackground source={require('../../../assets/img/login-backgrond.jpg')} style={styles.container}>
        <View style={styles.form}>
        <ScrollView style={{flex: 1}}>
          <Text style={styles.heading}>Welcome to ExFood</Text>
          <Text style={styles.title}>{signUpMode ? "Join with us" : "Sign in to continue"}</Text>
          <>
            <TextField
              placeholder="Email"
              keyboardType="email-address"
              onChangeText={(value) => {
                if(value && value.trim() === '') {
                  setUsername('')
                } 
                setUsername(value)
              }}
              onSubmitEditing={focusNext}
              returnKeyType="next"
            />
            {signUpMode && <>
              <TextField
                ref={firstNameRef}
                placeholder="First Name"
                keyboardType="email-address"
                onChangeText={(value) => setFirstName(value)}
                onSubmitEditing={focusLastName}
                returnKeyType="next"
              />
              <TextField
                ref={lastNameRef}
                placeholder="Last Name"
                keyboardType="email-address"
                onChangeText={(value) => setLastName(value)}
                onSubmitEditing={focusPassword}
                returnKeyType="next"
              />
              <TextField
                ref={passwordRef}
                placeholder="Password"
                onChangeText={(value) => setPassword(value)}
                returnKeyType="done"
                onSubmitEditing={focusRepassword}
                secureTextEntry={true}
              />
              <TextField
                ref={repasswordRef}
                placeholder="Re-enter Password"
                onChangeText={(value) => setRepassword(value)}
                returnKeyType="done"
                secureTextEntry={true}
              />
            </>}
            {!signUpMode && <TextField
              ref={passwordRef}
              placeholder="Password"
              onChangeText={(value) => setPassword(value)}
              returnKeyType="done"
              secureTextEntry={true}
            />}
          </>
          <View
            style={{
              ...styles.row,
              marginBottom: 40,
            }}>
          </View>
          {isLoading ? <ActivityIndicator size={50} color={theme.colors.white}/> 
          :
          <Button title={signUpMode ? "Sign Up" :  "Login"} primary onPress={signUpMode ? handleSignUp : handleLogin} />
          }
          </ScrollView>
        </View>
        <Text
          style={styles.signUpLabel}
          onPress={() => {
            setSignUpMode(!signUpMode)
          }}>
          {signUpMode ? "Back to Sign In" : "Don't have an account? Sign Up"}
        </Text>
      </ImageBackground>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    paddingHorizontal: 25,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
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
    marginVertical: 16,
    color: theme.colors.white
  },
  title: {
    fontSize: 17,
    fontFamily: 'SF-Pro-Text-Regular',
    color: theme.colors.white,
    marginVertical: 28
  },
  forgotPasswordLabel: {
    flex: 1,
    textAlign: 'right',
    color: theme.colors.white,
    fontSize: 15,
    fontFamily: 'SF-Pro-Text-Regular',
    marginBottom: 5
  },
  signUpLabel: {
    textAlign: "center",
    marginVertical: 8,
    fontSize: 17,
    fontFamily: 'SF-Pro-Text-Regular',
    color: theme.colors.white,
    fontWeight: 'bold'
  }
});

export default WithContext(LoginScreen);
