import React, {useState} from 'react';
import WithContext from '../../components/core/WithContext'
import {
  StyleSheet,
  View,
} from 'react-native';

import AppointmentCard from './components/AppointmentCard';
import CategoryCard from './components/CategoryCard';
import ClinicNearYou from './components/ClinicNearYou';

const HomeScreen = props => {
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

  const [clinics, setClinics] = useState([
    {
      id: 1,
      name: 'Hoan My General Hospital',
      address: '200 Nguyen Van Linh',
      distance: '1.5km away',
      rating: 5,
      ratingCount: 69,
    },
    {
      id: 2,
      name: 'Hoan My General Hospital',
      address: '200 Nguyen Van Linh',
      distance: '1.5km away',
      rating: 3,
      ratingCount: 69,
    },
    {
      id: 3,
      name: 'Hoan My General Hospital',
      address: '200 Nguyen Van Linh',
      distance: '1.5km away',
      rating: 4,
      ratingCount: 69,
    },
    {
      id: 4,
      name: 'Hoan My General Hospital',
      address: '200 Nguyen Van Linh',
      distance: '1.5km away',
      rating: 2,
      ratingCount: 69,
    },
    {
      id: 5,
      name: 'Hoan My General Hospital',
      address: '200 Nguyen Van Linh',
      distance: '1.5km away',
      rating: 4,
      ratingCount: 69,
    },
    {
      id: 6,
      name: 'Hoan My General Hospital',
      address: '200 Nguyen Van Linh',
      distance: '1.5km away',
      rating: 5,
      ratingCount: 69,
    },
    {
      id: 7,
      name: 'Hoan My General Hospital',
      address: '200 Nguyen Van Linh',
      distance: '1.5km away',
      rating: 5,
      ratingCount: 69,
    },
  ]);

  return (
    <View style={styles.container}>
      <AppointmentCard
        scheduledTime="25 Apr 2018 - 9:30 AM"
        doctor="Jessica Anderson"
        distance="0.31 mi away"
        speciality="Dentist"
      />
      <CategoryCard items={categories} />
      <ClinicNearYou items={clinics} />
    </View>
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
