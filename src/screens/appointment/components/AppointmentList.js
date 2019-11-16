import React, {useState, useEffect} from 'react';
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

const AppointmentList = props => {
  const {navigation, type} = props;

  const [loading, setLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [appointments, setAppointments] = useState([]);

  let hasMoreItems;
  let page = 0;
  let pageSize = 10;
  let status;

  if (type === 'Upcoming') {
    status = [
      AppointmentStatus.Confirming.value,
      AppointmentStatus.Confirmed.value,
    ];
  } else if (type === 'Previous') {
    status = [
      AppointmentStatus.Completed.value,
      AppointmentStatus.Cancelled.value,
    ];
  }

  const renderFooter = () => {
    if (!loading) return null;
    return <ActivityIndicator size={30} style={{color: '#000'}} />;
  };

  const loadAppointments = (page, pageSize) => {
    setLoading(true);
    AppointmentService.getAppointments(page, pageSize, status)
      .then(result => {
        const listAppointments = appointments;
        listAppointments.push(...result.items);
        setLoading(false);
        setAppointments(listAppointments);
        hasMoreItems = result.hasNextPage;
      })
      .catch(e => {
        setLoading(false);
        console.log(e);
      });
  };

  const handleLoadMore = () => {
    if (!loading && hasMoreItems) {
      page = page + 1;
      loadAppointments(page, pageSize);
    }
  };

  const handleRefresh = () => {
    setIsRefreshing(true);

    page = 0;
    AppointmentService.getAppointments(page, pageSize, status)
      .then(result => {
        setAppointments(result.items);
        setIsRefreshing(false);
        hasMoreItems = result.hasNextPage;
      })
      .catch(e => {
        setIsRefreshing(false);
        console.log(e);
      });
    
  };

  useEffect(() => {
    loadAppointments(page, pageSize);
  }, []);

  return (
    <View style={styles.container}>
      {loading && page == 0 ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size={40} style={{color: '#000'}} />
        </View>
      ) : (
        <FlatList
          style={styles.list}
          data={appointments}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={FlatListItemSeperator}
          renderItem={({item}) => (
            <AppointmentItem item={item} navigation={props.navigation} />
          )}
          keyExtractor={item => item.id.toString()}
          ListFooterComponent={() => renderFooter(props.loading)}
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
    marginTop: 2,
  },
});

export default AppointmentList;
