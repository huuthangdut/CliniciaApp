import React from 'react';
import {FlatList, ActivityIndicator, RefreshControl} from 'react-native';
import FlatListItemSeperator from '../../../components/core/FlatListItemSeperator';
import SpecialtyItem from './SpecialtyItem';

const SpecialtyList = props => {
  const {items, navigation, loading} = props;

  const renderFooter = () => {
     if (!loading) return null;
     return (
       <ActivityIndicator
         size={30}
         style={{ color: '#000' }}
       />
     );
   };

  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      ItemSeparatorComponent={FlatListItemSeperator}
      data={items}
      renderItem={({item}) => <SpecialtyItem item={item} navigation={navigation}/>}
      keyExtractor={item => item.id.toString()}
      ListFooterComponent={() => renderFooter(props.loading)}
      onEndReachedThreshold={0.4}
      onEndReached={props.onLoadMore}
      refreshControl={
        <RefreshControl
          refreshing={props.isRefreshing}
          onRefresh={props.onRefresh}
        />
      }
    />
  );
};

export default SpecialtyList;
