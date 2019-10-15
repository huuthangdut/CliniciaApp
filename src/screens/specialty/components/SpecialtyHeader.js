import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Icon} from 'react-native-elements';

const SpecialtyHeader = props => {
  const {navigation} = props;

  return (
    <View style={styles.header}>
      <TouchableOpacity style={styles.icon}>
        <Icon name="ios-arrow-back" type="ionicon" size={25} />
      </TouchableOpacity>
      <View style={{flex: 1}}></View>
      <TouchableOpacity style={styles.icon}>
        <Icon name="dots-horizontal" type="material-community" size={25} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 55,
    paddingHorizontal: 9,
    flexDirection: 'row',
  },
  icon: {
    width: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SpecialtyHeader;
