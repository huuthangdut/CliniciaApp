import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import styled from 'styled-components/native';
import theme from '../../../styles/theme';

const AppointmentStatus = props => {
  let statusText = '';
  let backgroundColor = '';
  switch (props.type) {
    case 'confirmed':
      statusText = 'Đã xác nhận';
      backgroundColor = theme.colors.secondary;
      break;
    case 'cancelled':
      statusText = 'Đã huỷ';
      backgroundColor = '#707070';
      break;
  }

  return (
    <View style={[{backgroundColor}, styles.status]}>
      <Text style={styles.statusText}>{statusText}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  status: {
    borderRadius: 10,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    width: 90
  },
  statusText: {
    fontSize: 13,
    fontFamily: 'SF-Pro-Text-Regular',
    color: 'white',
  },
});

export default AppointmentStatus;
