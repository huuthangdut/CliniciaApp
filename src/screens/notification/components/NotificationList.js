import React, {useState, useContext, useEffect} from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    RefreshControl,
    ActivityIndicator,
  } from 'react-native';
import FlatListItemSeperator from '../../../components/core/FlatListItemSeperator';
import NotificationItem from './NotificationItem';
import {NotificationService} from '../../../services/NotificationService';
import {AppContext} from '../../../AppProvider';
import { Button } from 'react-native-elements';

const NotificationList = props => {
  const {navigation} = props;
  const context = useContext(AppContext);

  const [page, setPage] = useState(0);
  const [hasMoreItems, setHasMoreItems] = useState(true);
  const [loading, setLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  let pageSize = 10;

  const renderFooter = () => {
    if (!loading) return null;
    return <ActivityIndicator size={30} style={{color: '#000'}} />;
  };

  const loadNotifications = (page, pageSize) => {
    setLoading(true);
    NotificationService.getNotifications(page, pageSize)
      .then(result => {
        const listNotifications = context.notifications.get;
        listNotifications.push(...result.items);
        context.notifications.set(listNotifications);
        setLoading(false);
        setHasMoreItems(result.hasNextPage);
      })
      .catch(e => {
        setLoading(false);
        console.log(e);
      });
  };

  const handleLoadMore = () => {
    if (!loading && hasMoreItems) {
      loadNotifications(page + 1, pageSize);
      setPage(page + 1);
    }
  };

  const handleRefresh = () => {
    setIsRefreshing(true);

    setPage(0);
    NotificationService.getNotifications(0, pageSize)
      .then(result => {
        context.notifications.set(result.items);
        setIsRefreshing(false);
        setHasMoreItems(result.hasNextPage);
      })
      .catch(e => {
        setIsRefreshing(false);
        console.log(e);
      });
  };

  useEffect(() => {
    loadNotifications(page, pageSize);
  },[]);

  return (
    <View style={styles.container}>
      <Button title="Add" style={{height: 50}} onPress={() => context.notifications.add({id: 'random' + Math.random(), title: 'Add' + Math.random(), content: 'Add', hasRead: false, notificationDate: new Date().toISOString()})}/>
      {loading && page === 0 ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size={40} style={{color: '#000'}} />
        </View>
      ) : (
        <FlatList
          style={styles.list}
          data={context.notifications.get}//cho get ni la rang ri 
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => (
            <FlatListItemSeperator marginVertical={0} />
          )}
          renderItem={({item}) => (
            <NotificationItem item={item} navigation={props.navigation} />
          )}
          keyExtractor={item => item.id.toString()}
          ListFooterComponent={() => renderFooter(loading)}
          onEndReachedThreshold={0.4}
          onEndReached={() => handleLoadMore()}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={() => handleRefresh()}
            />
          }
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  list: {
    marginTop: 5,
  },
});

export default NotificationList;
