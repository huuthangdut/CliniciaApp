import React, {useState, Fragment, useEffect} from 'react';
import {Text, View, StyleSheet, ActivityIndicator} from 'react-native';
import theme from '../../styles/theme';
import DoctorList from './components/DoctorList';
import Header from '../../components/core/Header';
import {DoctorService} from '../../services/DoctorService';

const DoctorScreen = props => {
  const {navigation} = props;
  const specialtyId = navigation.getParam('specialtyId');

  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [doctors, setDoctors] = useState([]);
  const [hasMoreItems, setHasMoreItems] = useState(true);
  const pageSize = 10;

  const loadDoctors = () => {
    setLoading(true);
    DoctorService.getDoctors({
      page,
      pageSize,
      specialtyId,
    })
      .then(result => {
        const listDoctors = doctors;
        listDoctors.push(...result.items);

        setLoading(false);
        setIsRefreshing(false);
        setDoctors(listDoctors);
        setHasMoreItems(result.hasNextPage);
      })
      .catch(e => {
        setLoading(false);
        setIsRefreshing(false);
      });
  };

  const handleLoadMore = () => {
    if (!loading && hasMoreItems) {
      setPage(page + 1);
    }
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setHasMoreItems(true);
    setDoctors([]);
    setPage(0);
  };

  useEffect(() => {
    loadDoctors();
  }, [page]);

  return (
    <Fragment>
      <Header />
      <View style={styles.container}>
        <Text style={styles.header}>Bác sĩ</Text>
        <View style={styles.list}>
          {loading && page == 0 ? (
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <ActivityIndicator size={40} style={{color: '#000'}} />
            </View>
          ) : (
            <DoctorList 
              items={doctors} 
              loading={loading}
              isRefreshing={isRefreshing}
              onLoadMore={() => handleLoadMore()}
              onRefresh={() => handleRefresh()}
              navigation={navigation} />
          )}
        </View>
      </View>
    </Fragment>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
    paddingHorizontal: 15,
  },
  header: {
    fontSize: 34,
    fontFamily: 'SF-Pro-Display-Bold',
  },
  list: {
    flex: 1,
    marginTop: 16,
  },
});

export default DoctorScreen;
