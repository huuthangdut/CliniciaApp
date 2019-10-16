import React, {useState, Fragment} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import theme from '../../styles/theme';
import DoctorList from './components/DoctorList';
import Header from '../../components/core/Header';

const DoctorScreen = props => {
  const {navigation} = props;
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
    {
      id: 6,
      image: '',
      name: 'Barbara Michelle',
      specialty: 'Pediatric',
      pricePerHour: '48',
      rating: 5,
      ratingCount: 58,
      distance: 15,
    },
    {
      id: 7,
      image: '',
      name: 'Barbara Michelle',
      specialty: 'Pediatric',
      pricePerHour: '48',
      rating: 5,
      ratingCount: 58,
      distance: 15,
    },
    {
      id: 8,
      image: '',
      name: 'Barbara Michelle',
      specialty: 'Pediatric',
      pricePerHour: '48',
      rating: 5,
      ratingCount: 58,
      distance: 15,
    },
    {
      id: 9,
      image: '',
      name: 'Barbara Michelle',
      specialty: 'Pediatric',
      pricePerHour: '48',
      rating: 5,
      ratingCount: 58,
      distance: 15,
    },
    {
      id: 10,
      image: '',
      name: 'Barbara Michelle',
      specialty: 'Pediatric',
      pricePerHour: '48',
      rating: 5,
      ratingCount: 58,
      distance: 15,
    },
  ]);

  return (
    <Fragment>
      <Header />
      <View style={styles.container}>
        <Text style={styles.header}>Doctors</Text>
        <View style={styles.list}>
          <DoctorList items={doctors} navigation={navigation} />
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
    marginTop: 16
  },
});

export default DoctorScreen;
