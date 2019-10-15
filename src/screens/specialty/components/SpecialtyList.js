import React from 'react';
import {FlatList} from 'react-native';
import FlatListItemSeperator from '../../../components/core/FlatListItemSeperator';
import SpecialtyItem from './SpecialtyItem';

const SpecialtyList = props => {
  const {items, navigation} = props;

  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      ItemSeparatorComponent={FlatListItemSeperator}
      data={items}
      renderItem={({item}) => <SpecialtyItem item={item} navigation={navigation}/>}
      keyExtractor={item => item.id.toString()}
    />
  );
};

export default SpecialtyList;
