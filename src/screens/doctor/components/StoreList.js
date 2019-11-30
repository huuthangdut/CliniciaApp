import React from 'react';
import {Text, View, StyleSheet, FlatList} from 'react-native';
import theme from '../../../styles/theme';
import FlatListItemSeperator from '../../../components/core/FlatListItemSeperator';
import StoreItem from './StoreItem';

const StoreList = props => {
  const {items, navigation} = props;

  return (
    <FlatList
      style={styles.list}
      showsVerticalScrollIndicator={false}
      data={items}
      renderItem={({item}) => (
        <StoreItem item={item} navigation={navigation} />
      )}
      keyExtractor={item => item.id}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    
  }
}); 

export default StoreList;
