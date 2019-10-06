import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import theme from '../../../styles/theme';
import { Avatar } from 'react-native-elements'

const AppointmentCard = props => {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Avatar
          size="large"
          source={props.image ? {uri: props.image} : undefined}
          rounded
          title={props.image ? '' : props.doctor.charAt(0)}
          activeOpacity={0.7}
        />
        <View style={styles.content}>
          <Text style={styles.time}>{props.scheduledTime}</Text>
          <Text numberOfLines={1} style={styles.doctor}>{props.doctor}</Text>
          <View style={styles.row}>
            <Text style={styles.col}>{props.distance}</Text>
            <Text style={styles.col}>{props.speciality}</Text>
          </View>
          <TouchableOpacity style={styles.button} activeOpacity={0.7}>
            <Text style={styles.text}>View</Text>
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
  },
  col: {
    flex: 1,
    color: 'white',
  },
  text: {
    color: 'white',
    fontSize: 14,
    fontFamily: 'SF-Pro-Text-Regular',
  },
  button: {
    height: 24,
    width: 60,
    backgroundColor: '#FF9500',
    borderRadius: 30,
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default AppointmentCard;
