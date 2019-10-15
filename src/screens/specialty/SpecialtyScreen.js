import React, {useState, Fragment} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import SpecialtyList from './components/SpecialtyList';
import SpecialtyHeader from './components/SpecialtyHeader';

const SpecialtyScreen = props => {
  const {navigation} = props;

  const [categories, setCategories] = useState([
    {id: 1, icon: 'home', name: 'Dentist', numOfDoctors: 96},
    {id: 2, icon: 'home', name: 'Cardiology', numOfDoctors: 96},
    {id: 3, icon: 'home', name: 'Physician', numOfDoctors: 96},
    {id: 4, icon: 'home', name: 'Dentist', numOfDoctors: 96},
    {id: 5, icon: 'home', name: 'Dentist', numOfDoctors: 96},
    {id: 6, icon: 'home', name: 'Dentist', numOfDoctors: 96},
    {id: 7, icon: 'home', name: 'Dentist', numOfDoctors: 96},
    {id: 8, icon: 'home', name: 'Dentist', numOfDoctors: 96},
    {id: 9, icon: 'home', name: 'Dentist', numOfDoctors: 96},
    {id: 10, icon: 'home', name: 'Dentist', numOfDoctors: 96},
    {id: 11, icon: 'home', name: 'Dentist', numOfDoctors: 96},
    {id: 12, icon: 'home', name: 'Dentist', numOfDoctors: 96},
  ]);

  return (
    <Fragment>
      <SpecialtyHeader/>
      <View style={styles.container}>
        <Text style={styles.header}>Specialities</Text>
        <View style={styles.list}>
          <SpecialtyList items={categories} navigation={props.navigation} />
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

export default SpecialtyScreen;
