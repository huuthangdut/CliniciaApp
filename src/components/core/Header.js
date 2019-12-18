import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import theme from '../../styles/theme';

const CustomHeader = props => {
  const {
    navigation,
    color = 'black',
    title = '',
    hasBackIcon = true,
    hasRightMenu = false,
  } = props;

  const goBack = () => {
    navigation.goBack()
  }

  return (
    <View style={styles.header}>
      <View style={styles.icon}>
        {hasBackIcon && <TouchableOpacity onPress={goBack}>
          <Icon name="ios-arrow-back" type="ionicon" size={25} color={theme.colors.white} />
        </TouchableOpacity>}
      </View>
      <View style={styles.title}>
        <Text style={[{ color }, styles.texTitle]}>{title}</Text>
      </View>
      {hasRightMenu ? (
        <TouchableOpacity style={styles.icon}>
          <Icon
            name="dots-horizontal"
            type="material-community"
            size={25}
            color={color}
          />
        </TouchableOpacity>
      ) :
        <TouchableOpacity style={styles.icon}>
          {/* <Icon
            name="dots-horizontal"
            type="material-community"
            size={25}
            color={color}
          /> */}
        </TouchableOpacity>
      }

    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 50,
    paddingHorizontal: 9,
    flexDirection: 'row',
    backgroundColor: theme.colors.primary
  },
  title: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  texTitle: {
    fontSize: 17,
    fontFamily: 'SF-Pro-Text-Semibold',
    color: theme.colors.white
  },
  icon: {
    width: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CustomHeader;
