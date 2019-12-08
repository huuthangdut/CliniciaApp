import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import FlatListItemSeperator from '../../../components/core/FlatListItemSeperator';
import AppointmentItem from './AppointmentItem';
import {AppointmentService} from '../../../services/AppointmentService';
import {AppointmentStatus} from '../../../common/enums';
import {AppContext} from '../../../AppProvider';
import EmptyList from '../../../components/core/EmptyList';

const AppointmentList = props => {
  const {navigation, type} = props;
  const context = useContext(AppContext);

  const [page, setPage] = useState(0);
  const [hasMoreItems, setHasMoreItems] = useState(true);
  const [loading, setLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [appointments, setAppointments] = useState([]);

  let pageSize = 10;
  let status;

  if (type === 'Upcoming') {
    status = AppointmentStatus.Confirmed.value;
  } else if (type === 'Confirming') {
    status = AppointmentStatus.Confirming.value;
  } else if (type === 'Done') {
    status = AppointmentStatus.Completed.value;
  } else if (type === 'Cancelled') {
    status = AppointmentStatus.Cancelled.value;
  }

  const renderFooter = () => {
    if (!loading) return null;
    return <ActivityIndicator size={30} style={{color: '#000'}} />;
  };

  const loadAppointments = (page, pageSize) => {
    setLoading(true);
    AppointmentService.getAppointments(page, pageSize, status)
      .then(result => {
        setAppointments(prevAppointments => [
          ...prevAppointments,
          ...result.items,
        ]);
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
      loadAppointments(page + 1, pageSize);
      setPage(page + 1);
    }
  };

  const handleRefresh = () => {
    setIsRefreshing(true);

    setPage(0);
    AppointmentService.getAppointments(0, pageSize, status)
      .then(result => {
        setAppointments(result.items);
        setIsRefreshing(false);
        setHasMoreItems(result.hasNextPage);
      })
      .catch(e => {
        setIsRefreshing(false);
        console.log(e);
      });
  };

  useEffect(() => {
    setAppointments([]);
    loadAppointments(0, pageSize);
  }, [context.shouldReloadAppointmentList.get]);

  return (
    <View style={styles.container}>
      {loading && page === 0 ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size={40} style={{color: '#000'}} />
        </View>
      ) : appointments.length > 0 ? (
        <FlatList
          style={styles.list}
          data={appointments}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={FlatListItemSeperator}
          renderItem={({item}) => (
            <AppointmentItem item={item} navigation={props.navigation} />
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
      ) : (
        <EmptyList text="Không có dữ liệu." />
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
    marginTop: 2,
  },
});

export default AppointmentList;
