import React from 'react';
import {Text, View, StyleSheet, FlatList} from 'react-native';
import theme from '../../../styles/theme';
import FlatListItemSeperator from '../../../components/core/FlatListItemSeperator';
import DoctorItem from './DoctorItem';

const DoctorList = props => {
  const {items, navigation} = props;

  return (
    <FlatList
      style={styles.list}
      showsVerticalScrollIndicator={false}
      ItemSeparatorComponent={FlatListItemSeperator}
      data={items}
      renderItem={({item}) => (
        <DoctorItem item={item} navigation={navigation} />
      )}
      keyExtractor={item => item.id.toString()}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    
  }
}); 

export default DoctorList;
