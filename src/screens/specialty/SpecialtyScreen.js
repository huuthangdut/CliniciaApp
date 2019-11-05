import React, {useState, Fragment, useEffect} from 'react';
import {StyleSheet, View, Text, ActivityIndicator} from 'react-native';
import SpecialtyList from './components/SpecialtyList';
import Header from '../../components/core/Header';
import {SpecialtyService} from '../../services/SpeicaltyService';

const SpecialtyScreen = props => {
  const {navigation} = props;
  let pageSize = 10;

  const [hasMoreItems, setHasMoreItems] = useState(true);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [specialties, setSpecialties] = useState([]);

  useEffect(() => {
    loadSpecialties();
  }, [page]);

  const loadSpecialties = () => {
    setLoading(true);
    SpecialtyService.getSpecialties(page, pageSize)
      .then(result => {
        const listSpecialties = specialties;
        listSpecialties.push(...result.items);

        setLoading(false);
        setIsRefreshing(false);
        setSpecialties(listSpecialties);
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
    setSpecialties([]);
    setPage(0);
  };

  return (
    <Fragment>
      <Header />
      <View style={styles.container}>
        <Text style={styles.header}>Specialities</Text>
        <View style={styles.list}>
          {loading && page == 0 ? (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <ActivityIndicator size={40} style={{color: '#000'}} />
            </View>
          ) : (
            <SpecialtyList
              items={specialties}
              loading={loading}
              isRefreshing={isRefreshing}
              onLoadMore={() => handleLoadMore()}
              onRefresh={() => handleRefresh()}
              navigation={props.navigation}
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
    backgroundColor: 'white',
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

export default SpecialtyScreen;
