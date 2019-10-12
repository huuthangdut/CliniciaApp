import React, {useState, Fragment} from 'react';
import WithContext from '../../components/core/WithContext';
import {StyleSheet, View} from 'react-native';

import Reminder from './components/Reminder';
import Category from './components/Category';
import {ScrollView} from 'react-native-gesture-handler';
import Header from '../../components/core/Header';
import Toolbar from './components/Toolbar';
import ClinicListView from '../clinic/components/ClinicListView';

const HomeScreen = props => {
  const { navigation } = props;
  
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
      <Header />
      {/* <ScrollView nestedScrollEnabled={true} > */}
        <View style={styles.container}>
          <Reminder item={reminder} />
          <Category items={categories} navigation={navigation} />
          <Toolbar />
          <ClinicListView items={clinics} navigation={navigation}/>
        </View>
      {/* </ScrollView> */}
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
