import React from 'react';
import {StyleSheet} from 'react-native';
import {Button} from 'react-native-elements';
import theme from '../../styles/theme';

const CustomButton = props => {
  const {
    onPress,
    title,
    primary,
    disabled,
    style,
    loading,
  } = props;

  let backgroundColor = primary ? theme.colors.primary : theme.colors.lightGray;
  let type = primary ? 'solid' : 'clear';

  return (
    <Button
      onPress={onPress}
      title={title}
      type={type}
      disabled={disabled}
      loading={loading}
      titleStyle={styles.title}
      buttonStyle={[styles.button, style, { backgroundColor }]}
    />
  );
};

const styles = StyleSheet.create({
    button: {
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 6,
        borderRadius: 25
    },
    title: {
      fontSize: 17,
      fontFamily: 'SF-Pro-Text-Semibold'
    }
});

export default CustomButton;
