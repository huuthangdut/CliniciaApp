import React from 'react';
import {StyleSheet} from 'react-native';
import {Header} from 'react-native-elements';

const CustomHeader = props => {
  return (
    <Header
      placement='center'
      containerStyle={styles.header}
      leftContainerStyle={[styles.centerVertical]}
      rightContainerStyle={[styles.centerVertical]}
      leftComponent={props.leftComponent}
      rightComponent={props.rightComponent}
    />
  );
};

const styles = StyleSheet.create({
  header: {
    height: 50,
    marginBottom: 5,
    flexDirection: 'row',
    paddingHorizontal: 15,
    backgroundColor: 'white'
  },
  centerVertical: {
    height: 50
  }
});

export default CustomHeader;
