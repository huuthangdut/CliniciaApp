import React from 'react';
import ClinicItem from './ClinicItem';
import {FlatList} from 'react-native';

const ClinicListView = props => {
  return (
    <FlatList
      nestedScrollEnabled={true}
      showsVerticalScrollIndicator={false}
      data={props.items}
      renderItem={({item}) => <ClinicItem item={item} />}
      keyExtractor={item => item.id.toString()}
    />
  );
};

export default ClinicListView;
