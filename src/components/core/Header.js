import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Icon} from 'react-native-elements';

const CustomHeader = props => {
  const {
    navigation,
    color = 'black',
    title = '',
    hasBackIcon = true,
    hasRightMenu = false,
  } = props;

  return (
    <View style={styles.header}>
      {hasBackIcon ? (
        <TouchableOpacity style={styles.icon}>
          <Icon name="ios-arrow-back" type="ionicon" size={25} color={color} />
        </TouchableOpacity>
      ) : (
        <View style={styles.icon}></View>
      )}
      <View style={styles.title}>
        <Text style={[{color}, styles.texTitle]}>{title}</Text>
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
      ) : (
        <View style={styles.icon}></View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 50,
    paddingHorizontal: 9,
    flexDirection: 'row',
  },
  title: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  texTitle: {
    fontSize: 17,
    fontFamily: 'SF-Pro-Text-Semibold',
  },
  icon: {
    width: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CustomHeader;
