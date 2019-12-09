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
import EmptyList from '../../../components/core/EmptyList';

const NotificationList = props => {
  const {navigation} = props;
  const context = useContext(AppContext);

  const [page, setPage] = useState(0);
  const [hasMoreItems, setHasMoreItems] = useState(true);
  const [loading, setLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  let pageSize = 10;

  const renderFooter = () => {
    if (!loading) return null;
    return <ActivityIndicator size={30} style={{color: '#000'}} />;
  };

  const loadNotifications = (page, pageSize) => {
    console.log("load page", page);
    setLoading(true);
    NotificationService.getNotifications(page, pageSize)
      .then(result => {
        if(isFirstLoad) {
          context.notifications.set(result.items);
        } else {
          context.notifications.set(val => [...val, ...result.items]);
        }

        setIsFirstLoad(false);
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
  }, []);

  return (
    <View style={styles.container}>
      {loading && page === 0 ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size={40} style={{color: '#000'}} />
        </View>
      ) : (
        context.notifications.get.length > 0 ? (
          <FlatList
          style={styles.list}
          data={context.notifications.get}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => (
            <FlatListItemSeperator marginVertical={0} />
          )}
          renderItem={({item}) => (
            <NotificationItem item={item} navigation={props.navigation} />
          )}
          keyExtractor={item => item.id.toString()}
          // ListFooterComponent={() => renderFooter(loading)}
          onEndReachedThreshold={0.4}
          onEndReached={() => handleLoadMore()}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={() => handleRefresh()}
            />
          }
        />
        ) : (
          <EmptyList text="Không có thông báo."/>
        )
       
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
