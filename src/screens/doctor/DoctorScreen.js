import React, {useState, Fragment, useEffect} from 'react';
import {Text, View, StyleSheet, ActivityIndicator} from 'react-native';
import theme from '../../styles/theme';
import DoctorList from './components/DoctorList';
import Header from '../../components/core/Header';
import {DoctorService} from '../../services/DoctorService';
import {SearchBar} from 'react-native-elements';

const DoctorScreen = props => {
  const {navigation} = props;
  const {specialtyId, sort, gender, availableToday} = navigation.state.params;

  const [searchTerm, setSearchTerm] = useState('');

  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [doctors, setDoctors] = useState([]);
  const [hasMoreItems, setHasMoreItems] = useState(true);
  const pageSize = 10;

  const loadDoctors = () => {
    setLoading(true);
    DoctorService.getDoctors({
      page,
      pageSize,
      specialtyId,
      sort,
      gender,
      availableToday,
      searchTerm
    })
      .then(result => {
        setLoading(false);
        setDoctors(list => [...list, ...result.items]);
        setHasMoreItems(result.hasNextPage);
      })
      .catch(e => {
        setLoading(false);
      });
  };

  const handleLoadMore = () => {
    if (!loading && hasMoreItems) {
      setPage(page + 1);
    }
  };

  useEffect(() => {
    loadDoctors();
  }, [page]);

  return (
    <Fragment>
      <Header
        hasRightMenu={true}
        onPressRight={() => navigation.navigate('Filter')}
      />
      <View style={styles.container}>
        <Text style={styles.header}>Bác sĩ</Text>
        <SearchBar
          platform="android"
          placeholder="Tìm kiếm"
          underlineColorAndroid={theme.colors.lightGray}
          onChangeText={(text) => setSearchTerm(text)}
          value={searchTerm}
        />
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
              onLoadMore={() => handleLoadMore()}
              navigation={navigation}
            />
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
    marginTop: 5
  },
});

export default DoctorScreen;
