import React from 'react';
import ClinicItem from './ClinicItem';
import {FlatList} from 'react-native';

const ClinicListView = props => {
  const {items, navigation} = props;

  return (
    <FlatList
      nestedScrollEnabled={true}
      showsVerticalScrollIndicator={false}
      data={items}
      renderItem={({item}) => <ClinicItem item={item} navigation={navigation}/>}
      keyExtractor={item => item.id.toString()}
    />
  );
};

export default ClinicListView;
