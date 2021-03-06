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
    titleStyle = styles.title,
    style,
    loading,
    icon
  } = props;

  let backgroundColor = primary ? theme.colors.primary : theme.colors.lightGray;
  let type = primary ? 'solid' : 'clear';

  return (
    <Button
      icon={icon}
      iconContainerStyle={styles.iconContainerStyle}
      onPress={onPress}
      title={title}
      type={type}
      disabled={disabled}
      loading={loading}
      titleStyle={titleStyle}
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
        borderRadius: 6
    },
    title: {
      fontSize: 17,
      fontFamily: 'SF-Pro-Text-Semibold'
    },
    iconContainerStyle: {
      marginTop: 2,
      marginRight: 10,
      justifyContent: 'center',
      alignItems: 'center',
    }
});

export default CustomButton;
