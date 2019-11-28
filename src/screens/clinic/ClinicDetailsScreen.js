import React, {useState} from 'react';
import {StyleSheet, View, Text, ScrollView} from 'react-native';
import theme from '../../styles/theme';
import {Avatar, Rating} from 'react-native-elements';
import DoctorList from '../doctor/components/StoreList';

const ClinicDetailsScreen = props => {
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
    }
  ]);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.profile}>
        <Avatar
          size="large"
          rounded
          source={{
            uri:
              'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
          }}
        />
        <Text style={styles.title}>Hoan My Clinic Saigon</Text>
        <Rating
          style={styles.ratingStar}
          imageSize={20}
          readonly
          startingValue={4}
          style={styles.rating}
        />
        <View style={styles.rating}>
          <View style={styles.textWrapper}>
            <Text style={styles.number}>72</Text>
            <Text style={styles.text}>Rating</Text>
          </View>
          <View style={styles.textWrapper}>
            <Text style={styles.number}>65</Text>
            <Text style={styles.text}>Reviews</Text>
          </View>
          <View style={styles.textWrapper}>
            <Text style={styles.number}>386</Text>
            <Text style={styles.text}>Patients</Text>
          </View>
        </View>
      </View>
      <View style={styles.content}>
        <View style={styles.location}></View>
        <View style={styles.doctorList}>
          <Text style={styles.ourDoctor}>Our doctors</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
  profile: {
    backgroundColor: '#F9F9F9',
    flexDirection: 'column',
    alignItems: 'center',
    padding: 10,
  },
  title: {
    fontSize: 26,
    fontFamily: 'SF-Pro-Display-Bold',
    paddingVertical: 5,
  },
  rating: {
    flexDirection: 'row',
    marginTop: 5,
  },
  textWrapper: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  number: {
    fontSize: 17,
    fontFamily: 'SF-Pro-Text-Semibold',
  },
  text: {
    fontSize: 13,
    fontFamily: 'SF-Pro-Text-Regular',
  },
  content: {
    paddingHorizontal: 16
  },
  location: {},
  doctorList: {
    marginTop: 10
  },
  ourDoctor: {
    fontSize: 17,
    fontFamily: 'SF-Pro-Text-Bold'
  }
});

export default ClinicDetailsScreen;
