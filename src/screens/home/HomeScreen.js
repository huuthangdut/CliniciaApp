import React, {useState, Fragment} from 'react';
import WithContext from '../../components/core/WithContext';
import {StyleSheet, View} from 'react-native';

import Reminder from './components/Reminder';
import Category from './components/Category';
import {ScrollView} from 'react-native-gesture-handler';
import HomeHeader from './components/HomeHeader';
import Toolbar from './components/Toolbar';
import DoctorList from '../doctor/components/DoctorList';

const HomeScreen = props => {
  const {navigation} = props;

  const [categories, setCategories] = useState([
    {id: 1, icon: 'home', name: 'Dentist', numOfDoctors: 96},
    {id: 2, icon: 'home', name: 'Cardiology', numOfDoctors: 96},
    {id: 3, icon: 'home', name: 'Physician', numOfDoctors: 96},
    {id: 4, icon: 'home', name: 'Dentist', numOfDoctors: 96},
    {id: 5, icon: 'home', name: 'Dentist', numOfDoctors: 96},
    {id: 6, icon: 'home', name: 'Dentist', numOfDoctorss: 96},
    {id: 7, icon: 'home', name: 'Dentist', numOfDoctors: 96},
    {id: 8, icon: 'home', name: 'Dentist', numOfDoctors: 96},
    {id: 9, icon: 'home', name: 'Dentist', numOfDoctors: 96},
    {id: 10, icon: 'home', name: 'Dentist', numOfDoctors: 96},
    {id: 11, icon: 'home', name: 'Dentist', numOfDoctors: 96},
    {id: 12, icon: 'home', name: 'Dentist', numOfDoctors: 96},
  ]);

  const [doctors, setDoctors] = useState([
    {
      id: 1,
      image: '',
      name: 'Barbara Michelle',
      specialty: 'Pediatric',
      pricePerHour: '48',
      rating: 5,
      ratingCount: 58,
      distance: 15,
    },
    {
      id: 2,
      image: '',
      name: 'Barbara Michelle',
      specialty: 'Pediatric',
      pricePerHour: '48',
      rating: 5,
      ratingCount: 58,
      distance: 15,
    },
    {
      id: 3,
      image: '',
      name: 'Barbara Michelle',
      specialty: 'Pediatric',
      pricePerHour: '48',
      rating: 5,
      ratingCount: 58,
      distance: 15,
    },
    {
      id: 4,
      image: '',
      name: 'Barbara Michelle',
      specialty: 'Pediatric',
      pricePerHour: '48',
      rating: 5,
      ratingCount: 58,
      distance: 15,
    },
    {
      id: 5,
      image: '',
      name: 'Barbara Michelle',
      specialty: 'Pediatric',
      pricePerHour: '48',
      rating: 5,
      ratingCount: 58,
      distance: 15,
    },
  ]);

  const [reminder, setReminder] = useState({
    image: '',
    scheduledTime: '25 Apr 2018 - 9:30 AM',
    doctor: 'Jessica Anderson',
    distance: '0.31 mi away',
    specialty: 'Dentist',
  });

  return (
    <Fragment>
      <HomeHeader />
      <ScrollView nestedScrollEnabled={true}>
        <View style={styles.container}>
          <Reminder item={reminder} />
          <Category items={categories} navigation={navigation} />
          <Toolbar />
          <DoctorList items={doctors} navigation={navigation} />
        </View>
      </ScrollView>
    </Fragment>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'flex-start',
    paddingHorizontal: 15,
    paddingTop: 10,
  },
});

export default WithContext(HomeScreen);
