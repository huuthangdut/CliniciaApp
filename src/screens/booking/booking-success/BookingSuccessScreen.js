import React from 'react';
import {Text, View, StyleSheet, ScrollView} from 'react-native';
import theme from '../../../styles/theme';
import {Icon, Avatar} from 'react-native-elements';
import Button from '../../../components/core/Button';

const BookingSuccessScreen = props => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.textWrapper}>
        <Icon
          name="checkbox-marked-circle"
          type="material-community"
          size={45}
          style={styles.alertIcon}
          color={theme.colors.secondary}></Icon>
        <Text style={styles.header}>Success!</Text>
        <Text style={styles.subHeader}>
          Thank you for choosing our service and trust our doctors to take care
          your health
        </Text>
      </View>
      <View style={styles.content}>
        <View style={styles.card}>
          <View style={styles.avatar}>
            <Avatar
              size="medium"
              rounded
              source={{
                uri:
                  'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
              }}
            />
          </View>
          <View style={styles.row}>
            <Text style={styles.body}>Edward Janowski</Text>
            <Text style={styles.specialty}>Accident and Emergency</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.title}>Date & Time</Text>
            <Text style={styles.body}>Monday, October 24</Text>
            <Text style={styles.subTitle}>10:00 AM</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.title}>Address</Text>
            <Text style={styles.body}>Hoan my Clinic Saigon</Text>
            <Text style={styles.subTitle}>San Francisco, California</Text>
            <Text style={styles.subTitle}>0.31 mi away</Text>
          </View>
        </View>
        <Button primary title="Check details" style={styles.button}/>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
    paddingHorizontal: 15,
    paddingVertical: 30
  },
  textWrapper: {
    marginVertical: 10,
    alignItems: 'center',
  },
  header: {
    fontSize: 40,
    fontFamily: 'SF-Pro-Display-Bold',
  },
  subHeader: {
    textAlign: 'center',
    fontSize: 17,
    fontFamily: 'SF-Pro-Text-Regular',
    color: theme.colors.darkGray,
    lineHeight: 23,
  },
  content: {
    marginHorizontal: 10,
  },
  cardContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: theme.colors.white,
    ...theme.styles.shadow2,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginVertical: 10,
  },
  row: {
    marginVertical: 8,
  },
  avatar: {
    alignItems: 'center',
    marginVertical: 2,
  },
  body: {
    fontSize: 17,
    fontFamily: 'SF-Pro-Text-Semibold',
    textAlign: 'center',
    lineHeight: 25,
  },
  specialty: {
    fontSize: 15,
    fontFamily: 'SF-Pro-Text-Regular',
    textAlign: 'center',
    color: theme.colors.darkGray,
  },
  title: {
    fontSize: 13,
    fontFamily: 'SF-Pro-Text-Regular',
    textAlign: 'center',
    color: theme.colors.darkGray,
    marginBottom: 2,
  },
  subTitle: {
    fontSize: 13,
    fontFamily: 'SF-Pro-Text-Medium',
    textAlign: 'center',
  },
  button: {
    marginTop: 15,
    marginBottom: 5,
  },
});

export default BookingSuccessScreen;