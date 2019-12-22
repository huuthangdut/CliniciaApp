import React, {forwardRef} from 'react';
import {TextInput, StyleSheet, Text, View} from 'react-native';
import theme from '../../styles/theme';

const TextField = forwardRef((props, ref) => {
  return (
    <View style={styles.wrapper}>
      <TextInput
        ref={ref}
        placeholderTextColor={theme.colors.gray}
        style={[
          styles.textInput,
          props.containerStyle,
          props.error && styles.invalid,
        ]}
        {...props}
      />
      { props.error && (
      <Text style={styles.error}>{props.error}</Text>
      )}
    </View>
  );
});

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 20
  },
  textInput: {
    borderRadius: 9,
    height: 45,
    borderWidth: 1,
    borderColor: theme.colors.lightGray,
    paddingHorizontal: 16,
    // marginBottom: 20,
    fontSize: 17,
    fontFamily: 'SF-Pro-Text-Regular',
    backgroundColor: theme.colors.lightGray,
  },
  invalid: {
    borderColor: '#C54842',
    borderWidth: 0.5
  },
  error: {
    color: '#C54842',
    fontSize: 13,
    fontFamily: 'SF-Pro-Text-Regular',
    margin: 2
  },
});

export default TextField;
