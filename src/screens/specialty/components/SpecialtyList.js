import React from 'react';
import {StyleSheet, FlatList} from 'react-native';
import FlatListItemSeperator from '../../../components/core/FlatListItemSeperator';
import SpecialtyItem from './SpecialtyItem';

const SpecialtyList = props => {
  const {items} = props;

  return (
    <FlatList
      style={styles.list}
      showsVerticalScrollIndicator={false}
      ItemSeparatorComponent={FlatListItemSeperator}
      data={items}
      renderItem={({item}) => <SpecialtyItem item={item} />}
      keyExtractor={item => item.id.toString()}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    marginTop: 10
  },
});

export default SpecialtyList;
