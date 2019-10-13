import React, { useState } from 'react';
import {Text, View, StyleSheet} from 'react-native';
import theme from '../../styles/theme';
import DoctorList from './components/DoctorList';

const DoctorScreen = props => {
  const [doctors, setDoctors] = useState([
    {id: 1, image: '', name: 'Barbara Michelle', specialty: 'Pediatric', pricePerHour: '48', rating: 5, ratingCount: 58, distance: 15 },
    {id: 2, image: '', name: 'Barbara Michelle', specialty: 'Pediatric', pricePerHour: '48', rating: 5, ratingCount: 58, distance: 15 },
    {id: 3, image: '', name: 'Barbara Michelle', specialty: 'Pediatric', pricePerHour: '48', rating: 5, ratingCount: 58, distance: 15 },
    {id: 4, image: '', name: 'Barbara Michelle', specialty: 'Pediatric', pricePerHour: '48', rating: 5, ratingCount: 58, distance: 15 },
    {id: 5, image: '', name: 'Barbara Michelle', specialty: 'Pediatric', pricePerHour: '48', rating: 5, ratingCount: 58, distance: 15 },
    {id: 6, image: '', name: 'Barbara Michelle', specialty: 'Pediatric', pricePerHour: '48', rating: 5, ratingCount: 58, distance: 15 },
    {id: 7, image: '', name: 'Barbara Michelle', specialty: 'Pediatric', pricePerHour: '48', rating: 5, ratingCount: 58, distance: 15 },
    {id: 8, image: '', name: 'Barbara Michelle', specialty: 'Pediatric', pricePerHour: '48', rating: 5, ratingCount: 58, distance: 15 },
    {id: 9, image: '', name: 'Barbara Michelle', specialty: 'Pediatric', pricePerHour: '48', rating: 5, ratingCount: 58, distance: 15 },
    {id: 10, image: '', name: 'Barbara Michelle', specialty: 'Pediatric', pricePerHour: '48', rating: 5, ratingCount: 58, distance: 15 },
  ])

  return (
  <View style={styles.container}>
    <DoctorList items={doctors}/>
  </View>);
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
    paddingHorizontal: 15
  },
});

export default DoctorScreen;
