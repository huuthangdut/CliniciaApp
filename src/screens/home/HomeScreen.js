import React, {useState, useEffect, Fragment} from 'react';
import WithContext from '../../components/core/WithContext';
import {StyleSheet, View} from 'react-native';

import Reminder from './components/Reminder';
import Category from './components/Category';
import {ScrollView} from 'react-native-gesture-handler';
import HomeHeader from './components/HomeHeader';
import Toolbar from './components/Toolbar';
import DoctorList from '../doctor/components/DoctorList';
import {SpecialtyService} from '../../services/SpeicaltyService';

const HomeScreen = props => {
  const {navigation} = props;

  const [specialties, setSpecialties] = useState([]);

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

  const loadSpecialties = () => {
    SpecialtyService.getSpecialties(0, 10)
      .then(result => {
        listSpecialties = result.items;
        setSpecialties(listSpecialties);
      })
      .catch(e => {
      });
  };

  useEffect(() => {
    loadSpecialties();
  }, []);

  return (
    <Fragment>
      <HomeHeader />
      <ScrollView nestedScrollEnabled={true}>
        <View style={styles.container}>
          <Reminder item={reminder} />
          <Category items={specialties} navigation={navigation} />
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
