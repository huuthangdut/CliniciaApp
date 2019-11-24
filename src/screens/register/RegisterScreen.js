import React, { useRef } from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback, TouchableOpacity, ScrollView } from 'react-native';
import {Keyboard} from 'react-native';
import TextField from '../../components/core/TextField';
import Button from '../../components/core/Button';

const RegisterScreen = props => {
    const lastNameRef = useRef() 
    const emailRef = useRef();
    const passwordRef = useRef();
    const phoneNumberRef = useRef();

    focusLastName = () => lastNameRef.current.focus();
    focusEmail = () => emailRef.current.focus();
    focusPassword = () => passwordRef.current.focus();
    focusPhoneNumber = () => phoneNumberRef.current.focus();

    goToLogin = () => props.navigation.replace({routeName: 'Login'});

    return (
        // <ScrollView> 
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <View style={styles.container}>
                <View style={styles.form}>
                    <Text style={styles.heading}>Đăng ký</Text>
                    <Text style={styles.title}>Đăng ký tài khoản mới</Text>
                    <TextField 
                        placeholder="Họ và tên đệm" 
                        onChangeText={() => {}}
                        onSubmitEditing={this.focusLastName}
                        returnKeyType="next" 
                    />
                    <TextField 
                        ref={this.lastNameField}
                        placeholder="Tên" 
                        onChangeText={() => {}}
                        onSubmitEditing={this.focusEmail}
                        returnKeyType="next" 
                    />
                    <TextField 
                        ref={this.emailField}
                        placeholder="Email" 
                        keyboardType="email-address"
                        onChangeText={() => {}}
                        onSubmitEditing={this.focusPassword}
                        returnKeyType="next" 
                    />
                    <TextField 
                        ref={this.passwordField}
                        placeholder="Mật khẩu" 
                        onChangeText={() => {}}
                        onSubmitEditing={this.focusPhoneNumber}
                        returnKeyType="next"
                        secureTextEntry={true}
                        />
                    <TextField 
                        ref={this.phoneNumberField}
                        placeholder="Số điện thoại" 
                        keyboardType="phone-pad"
                        onChangeText={() => {}}
                        onSubmitEditing={() => {}}
                        returnKeyType="done" 
                    />
                    <Button label="Đăng ký" primary onPress={() => {}}/>
                </View>
                <Text style={styles.signInLabel} onPress={() => this.goToLogin()}>Đã có tài khoản? Đăng nhập</Text>
                </View>
            </TouchableWithoutFeedback>
        // </ScrollView>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
    // padding: styleGuide.spacing.base
  },
  form: {
    flexGrow: 2
  },
  heading: {
    // ...styleGuide.typography.title1,
    // marginVertical: styleGuide.spacing.base
  },
  title: {
    // ...styleGuide.typography.headline,
    // color: styleGuide.palette.gray,
    // marginVertical: styleGuide.spacing.base
  },
  signInLabel: {
    textAlign: 'center',
    // marginVertical: styleGuide.spacing.small,
    // ...styleGuide.typography.headline,
    // color: styleGuide.palette.gray,
  }
});

export default RegisterScreen; 
