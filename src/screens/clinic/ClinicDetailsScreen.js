import React, {useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import theme from '../../styles/theme';
import {Avatar, Rating} from 'react-native-elements';

const ClinicDetailsScreen = props => {
  return (
    <View style={styles.container}>
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
        <View style={styles.location}>

        </View>
      </View>
    </View>
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
    marginTop: 5
  },
  textWrapper: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  number: {
    fontSize: 17,
    fontFamily: 'SF-Pro-Text-Semibold',
  },
  text: {
    fontSize: 13,
    fontFamily: 'SF-Pro-Text-Regular',
  },
  location: {
      
  }
});

export default ClinicDetailsScreen;
