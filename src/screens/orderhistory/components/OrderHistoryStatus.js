import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import styled from 'styled-components/native';
import theme from '../../../styles/theme';

const OrderHistoryStatus = props => {
  let statusText = '';
  let backgroundColor = '';
  switch (props.type) {
    case 'confirmed':
      statusText = 'Confirmed';
      backgroundColor = theme.colors.secondary;
      break;
    case 'cancelled':
      statusText = 'Cancelled';
      backgroundColor = '#707070';
      break;
    case 'waitting':
      statusText = 'Waitting';
      backgroundColor = '#f5e025';
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
    width: 80
  },
  statusText: {
    fontSize: 13,
    color: 'white',
    fontWeight: 'bold'
  },
});

export default OrderHistoryStatus;
