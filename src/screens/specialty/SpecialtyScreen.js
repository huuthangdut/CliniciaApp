import React, {useState, Fragment} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import SpecialtyList from './components/SpecialtyList';
import Header from '../../components/core/Header';
import WithContext from '../../components/core/WithContext'

const SpecialtyScreen = props => {
  const {navigation} = props;

  const [categories, setCategories] = useState([
    {id: 1, icon: 'home', name: 'Cơm', numOfStores: 96},
    {id: 2, icon: 'home', name: 'Trà sữa', numOfStores: 96},
    {id: 3, icon: 'home', name: 'Coffee', numOfStores: 96},
    {id: 4, icon: 'home', name: 'Kem', numOfStores: 96},
    {id: 5, icon: 'home', name: 'Rượu', numOfStores: 96},
    {id: 6, icon: 'home', name: 'Lẩu', numOfStores: 96},
    {id: 7, icon: 'home', name: 'Nướng', numOfStores: 96},
  ]);

  return (
    <Fragment>
      <Header navigation={navigation} title='Specialities'/>
      <View style={styles.container}>
        <View style={styles.list}>
          <SpecialtyList items={categories} navigation={navigation} />
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
    marginTop: 16
  },
});

export default WithContext(SpecialtyScreen);
