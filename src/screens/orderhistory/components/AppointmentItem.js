import React, {useState} from 'react';
import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import {Avatar} from 'react-native-elements';
import theme from '../../../styles/theme';
import AppointmentStatus from './AppointmentStatus';

const AppointmentItem = props => {
  return (
    <TouchableOpacity style={styles.container} activeOpacity={0.7} onPress={() => props.navigation.navigate('AppointmentDetails')}>
      <View style={styles.textWrapper}>
        <Text style={styles.doctorName}>{props.item.doctor}</Text>
        <Text numberOfLines={1} style={styles.clinicName}>{props.item.clinic}</Text>
        <Text style={styles.date}>{props.item.date} {props.item.time}</Text>
        <Text style={styles.date}>{props.item.total}d, {props.item.totalQuantity} item(s)  </Text>
      </View>
      <View style={styles.timeStatusWrapper}>
          <AppointmentStatus type="waitting"/>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 90,
    flexDirection: 'row'
  },
  image: {
    justifyContent: 'center',
    marginRight: 5,
  },
  textWrapper: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    marginHorizontal: 10
  },
  doctorName: {
    fontSize: 16,
    fontFamily: 'SF-Pro-Display-Semibold',
    lineHeight: 20
  },
  clinicName: {
    fontSize: 13,
    fontFamily: 'SF-Pro-Text-Regular',
    lineHeight: 20,
  },
  date: {
      fontSize: 13,
      fontFamily: 'SF-Pro-Text-Regular',
      color: theme.colors.darkGray,
      lineHeight: 20
  },
  timeStatusWrapper: {
      width: 90,
      height: '100%',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
  },
  timeBeforeNow: {
      fontSize: 13,
      fontFamily: 'SF-Pro-Text-Regular',
      color: theme.colors.darkGray,
      marginBottom: 15
  }
});

export default AppointmentItem;
