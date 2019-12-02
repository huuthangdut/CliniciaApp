import React from 'react';
import { StyleSheet } from 'react-native';
import StoreItem from './StoreItem';

const StoreList = props => {
  const { items, navigation } = props;

  return (
    <>
      {items.map((item, index) => {
        return (
          <StoreItem item={item} key={index.toString()} navigation={navigation} />
        )
      })}
    </>
  );
};

const styles = StyleSheet.create({
});

export default StoreList;
