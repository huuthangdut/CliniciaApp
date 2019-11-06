import React from 'react';
import {RefreshControl, ActivityIndicator, StyleSheet, FlatList} from 'react-native';
import theme from '../../../styles/theme';
import FlatListItemSeperator from '../../../components/core/FlatListItemSeperator';
import DoctorItem from './DoctorItem';

const DoctorList = props => {
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
      style={styles.list}
      showsVerticalScrollIndicator={false}
      ItemSeparatorComponent={FlatListItemSeperator}
      data={items}
      renderItem={({item}) => (
        <DoctorItem item={item} navigation={navigation} />
      )}
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

const styles = StyleSheet.create({
  list: {
    
  }
}); 

export default DoctorList;
