import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const OrderHistoryStatus = props => {
  let statusText = '';
  let backgroundColor = '';
  switch (props.type) {
    case 'rejected':
      statusText = 'Rejected';
      backgroundColor = 'red';
      break
    case 'waitting':
      statusText = 'Waitting';
      backgroundColor = 'orange';
      break
    case 'confirmed':
      statusText = 'Confirmed';
      backgroundColor = 'green';
      break
    case 'canceled':
      statusText = 'Canceled';
      backgroundColor = 'gray';
      break
  }

  return (
    <View style={[{backgroundColor}, styles.status]}>
      <Text style={styles.statusText}>{statusText}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  status: {
    borderRadius: 30,
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
