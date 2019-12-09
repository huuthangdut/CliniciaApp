import React, {useState} from 'react';
import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import {Avatar} from 'react-native-elements';
import theme from '../../../styles/theme';
import AppointmentStatus from './AppointmentStatus';
import {DateTime} from '../../../utilities/date-time';

const AppointmentItem = props => {
  const {item, navigation} = props;
  return (
    <TouchableOpacity style={styles.container} activeOpacity={0.7} onPress={() => props.navigation.navigate('AppointmentDetails', { appointment: item })}>
      <View style={styles.image}>
        <Avatar
          size={75}
          rounded
          source={{uri: item.doctor.imageProfile}}
        />
      </View>
      <View style={styles.textWrapper}>
        <Text style={styles.doctorName}>{item.doctor.name}</Text>
        <Text numberOfLines={1} style={styles.clinicName}>{item.doctor.clinic}</Text>
        <Text style={styles.date}>{DateTime.toDateString(item.appointmentDate, 'HH:mm DD/MM/YYYY')}</Text>
        <Text style={styles.date}>{item.totalMinutes} phút</Text>
      </View>
      <View style={styles.timeStatusWrapper}>
          <AppointmentStatus type={item.status}/>
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
    lineHeight: 20
  },
  date: {
      fontSize: 13,
      fontFamily: 'SF-Pro-Text-Regular',
      color: theme.colors.darkGray,
      lineHeight: 20
  },
  timeStatusWrapper: {
      width: 110,
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
