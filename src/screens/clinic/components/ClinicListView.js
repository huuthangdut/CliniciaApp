import React from 'react';
import ClinicItem from './ClinicItem';
import {StyleSheet, FlatList} from 'react-native';

const ClinicListView = props => {
  return (
    <FlatList
      style={styles.list}
      data={props.items}
      renderItem={({item}) => <ClinicItem item={item} />}
      keyExtractor={item => item.id.toString()}
    />
  );
};

const styles = StyleSheet.create({
  list: {
      marginHorizontal: 15,
      marginTop: 5
  }
});

export default ClinicListView;