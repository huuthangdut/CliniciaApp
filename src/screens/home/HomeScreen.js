import React, {useState, Fragment, useEffect} from 'react';
import WithContext from '../../components/core/WithContext';
import {StyleSheet, View, ActivityIndicator} from 'react-native';

import Reminder from './components/Reminder';
import Category from './components/Category';
import {ScrollView} from 'react-native-gesture-handler';
import HomeHeader from './components/HomeHeader';
import Toolbar from './components/Toolbar';
import DoctorList from '../doctor/components/StoreList';
import StoreService from '../../services/StoreService'
import theme from '../../styles/theme';
import AsyncStorage from '@react-native-community/async-storage';

const HomeScreen = props => {
  const {navigation, context} = props;

  const [categories, setCategories] = useState([
    {id: 1, icon: require('../../../assets/icons/rice-bowl.png'), key: 'Cơm', name:'Rice' ,numOfDoctors: 96},
    {id: 2, icon: require('../../../assets/icons/coffee-cup.png'), key: 'Trà sữa', name:'Milk tea' , numOfDoctors: 96},
    {id: 3, icon: require('../../../assets/icons/coffee-cup2.png'), key: 'Coffee', name:'Coffee' , numOfDoctors: 96},
    {id: 4, icon: require('../../../assets/icons/ice-cream.png'), key: 'Kem', name:'Ice cream' , numOfDoctors: 96},
    {id: 6, icon: require('../../../assets/icons/hot-pot.png'), key: 'Lẩu', name:'Hot pot' , numOfDoctorss: 96},
    {id: 7, icon: require('../../../assets/icons/grill.png'), key: 'Nướng', name:'BBQ' , numOfDoctors: 96},
  ]);

  const [restaurant, setRestaurant] = useState([]);

  useEffect(() => {
    getRestaurants()
  }, [])

  const [reminder, setReminder] = useState({
    image: '',
    scheduledTime: '25 Apr 2018 - 9:30 AM',
    doctor: 'Jessica Anderson',
    distance: '0.31 mi away',
    specialty: 'Dentist',
  });

  const getRestaurants = () => {
    StoreService.getRestaurants(
      res => {
        setRestaurant(res.data.data.restaurants)
      },
      err => {
        console.log(err)
        alert(err)
      }
    )
  }
  
  return (
    <Fragment>
      <HomeHeader />
      <ScrollView nestedScrollEnabled={true}>
        <View style={styles.container}>
          <Reminder item={reminder} />
          <Category items={categories} navigation={navigation} />
          <Toolbar />
          {restaurant.length <=0 && (
            <ActivityIndicator  
              color={theme.colors.primary} 
              size='large'
              style={{ marginTop: 50 }} />
          )}
          <DoctorList items={restaurant} navigation={navigation} />
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
