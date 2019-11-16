import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import styled from 'styled-components/native';
import theme from '../../../styles/theme';
import {AppointmentStatus as Status} from '../../../common/enums';

const AppointmentStatus = props => {
  let statusText = '';
  let backgroundColor = '';
  switch (props.type) {
    case Status.Confirming.value:
      statusText = Status.Confirming.name;
      backgroundColor = '#F9A825';
      break;
    case Status.Confirmed.value:
      statusText = Status.Confirmed.name;
      backgroundColor = theme.colors.secondary;
      break;
    case Status.Completed.value:
      statusText = Status.Completed.name;
      backgroundColor = theme.colors.primary;
      break;
    case Status.Cancelled.value:
      statusText = Status.Cancelled.name;
      backgroundColor = '#707070';
      break;
  }

  return (
    <View style={[{backgroundColor}, styles.status]}>
      <Text numberOfLines={1} style={styles.statusText}>{statusText}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  status: {
    borderRadius: 10,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    maxWidth: 110
  },
  statusText: {
    textAlign: 'center',
    fontSize: 13,
    fontFamily: 'SF-Pro-Text-Regular',
    color: 'white',
    paddingHorizontal: 5
  },
});

export default AppointmentStatus;
