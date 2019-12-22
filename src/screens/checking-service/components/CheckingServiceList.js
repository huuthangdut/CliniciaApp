import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Text,
  ActivityIndicator,
} from 'react-native';
import FlatListItemSeperator from '../../../components/core/FlatListItemSeperator';
import {AppContext} from '../../../AppProvider';
import EmptyList from '../../../components/core/EmptyList';
import { DoctorService } from '../../../services/DoctorService';
import CheckingServiceItem from './CheckingServiceItem';
import {Toast} from '../../../utilities/toast';

const CheckingServiceList = props => {
  const {navigation} = props;
  const context = useContext(AppContext);

  const [loading, setLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [checkingServices, setCheckingServices] = useState([]);

  const loadCheckingServices = () => {
    setLoading(true);
    DoctorService.getCheckingServices()
      .then(result => {
        setCheckingServices(result);
        setLoading(false);
      })
      .catch(error => {
        setLoading(false);
        Toast.error(error.errorMessage);
      });
  };

  useEffect(() => {
    loadCheckingServices();
  }, [context.shouldReloadCheckingService.get]);

  return (
    <View style={styles.container}>
      {loading ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size={40} style={{color: '#000'}} />
        </View>
      ) : checkingServices && checkingServices.length > 0 ? (
        <FlatList
          style={styles.list}
          data={checkingServices}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => (
            <CheckingServiceItem item={item} navigation={navigation}/>
          )}
          keyExtractor={item => item.id.toString()}
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

export default CheckingServiceList;
