import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import theme from '../../../styles/theme';
import { Avatar, Icon } from 'react-native-elements'
import {DateTime} from '../../../utilities/date-time';

const Reminder = props => {
  const {item, navigation} = props; 

  const reminder = {
    appointmentId: item.id,
    appointmentDate: DateTime.toDateString(
      item.appointmentDate,
      'HH:mm DD/MM/YYYY',
    ),
    doctor: item.doctor.name,
    specialty: item.doctor.specialty,
    distance: item.doctor.distanceFromPatient,
    image: item.doctor.imageProfile || '',
  };

  console.log(reminder);
  
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Avatar
          size={70}
          source={reminder.image ? {uri: reminder.image} : undefined}
          rounded
          title={reminder.image ? '' : reminder.doctor.charAt(0)}
          activeOpacity={0.7}
        />
        <View style={styles.content}>
          <Text style={styles.time}>{reminder.appointmentDate}</Text>
          <Text numberOfLines={1} style={styles.doctor}>{reminder.doctor}</Text>
          <View style={styles.row}>
            <Icon
              containerStyle={styles.col}
              name="map-marker"
              type="font-awesome"
              size={12}
              color="white"
            />
            <Text style={styles.col}>{reminder.distance} km</Text>
            <Icon containerStyle={styles.col} name="dot-single" type="entypo" size={12} color="white" />
            <Text style={styles.col}>{reminder.specialty}</Text>
          </View>
          <TouchableOpacity style={styles.button} activeOpacity={0.7} onPress={() => navigation.navigate('AppointmentDetails', { appointment: item })}>
            <Text style={styles.text}>Xem chi tiết</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 'auto',
    marginBottom: 10
  },
  card: {
    flexDirection: 'row',
    height: 150,
    width: '100%',
    paddingVertical: 20,
    paddingHorizontal: 22,
    backgroundColor: theme.colors.primary,
    borderRadius: 12,
    ...theme.styles.shadow,
  },
  content: {
    flex: 1,
    marginHorizontal: 20,
  },
  time: {
    color: 'white',
    fontSize: 15,
    fontFamily: 'SF-Pro-Text-Regular',
  },
  doctor: {
    color: 'white',
    fontSize: 21,
    fontFamily: 'SF-Pro-Display-Semibold',
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
    alignItems: 'center'
  },
  col: {
    // flex: 1,
    color: 'white',
    marginRight: 5
  },
  text: {
    color: 'white',
    fontSize: 14,
    fontFamily: 'SF-Pro-Text-Regular',
  },
  button: {
    height: 24,
    width: 100,
    backgroundColor: '#FF9500',
    borderRadius: 30,
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Reminder;