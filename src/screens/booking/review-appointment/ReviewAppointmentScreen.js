import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import theme from '../../../styles/theme';
import {Divider, Avatar} from 'react-native-elements';
import Button from '../../../components/core/Button';

const ReviewAppointmentScreen = props => {
  const {navigation} = props;

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.header}>Review</Text>
        <View style={styles.list}>
          <View style={styles.listItem}>
            <Text style={styles.text}>Date & Time</Text>
            <Text style={styles.body}>Monday, October 24</Text>
            <Text style={styles.text}>10:00 AM</Text>
            <Divider style={styles.divider} />
          </View>
          <View style={styles.listItem}>
            <View style={styles.row}>
              <View style={{flex: 1}}>
                <Text style={styles.text}>Doctor</Text>
                <Text style={styles.body}>Barbara Michelle</Text>
                <Text style={styles.text}>Dermatology</Text>
              </View>
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
            </View>
            <Divider style={styles.divider} />
          </View>
          <View style={styles.listItem}>
            <Text style={styles.text}>Address</Text>
            <Text style={styles.body}>Hoan my Clinic Saigon</Text>
            <Text style={styles.text}>San Francisco, California</Text>
            <Text style={styles.text}>0.31 mi away</Text>
            <Divider style={styles.divider} />
          </View>
          <View style={styles.listItem}>
            <Text style={styles.text}>Need</Text>
            <Text style={styles.body}>Treatment</Text>
            <Text style={styles.text}>Any kind of treatment</Text>
            <Divider style={styles.divider} />
          </View>
          <View style={styles.listItem}>
            <Text style={styles.text}>Fee</Text>
            <Text style={styles.body}>$75</Text>
            <Text style={styles.text}>$75/hour</Text>
            <Divider style={styles.divider} />
          </View>
        </View>
      </View>
      <Button primary title="Confirm" style={styles.button} onPress={() => navigation.navigate('BookingSuccess')}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
    paddingHorizontal: 15,
  },
  content: {
    flex: 1,
    marginVertical: 5,
  },
  header: {
    fontSize: 34,
    fontFamily: 'SF-Pro-Display-Bold',
  },
  list: {
    marginVertical: 10,
  },
  listItem: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
  },
  text: {
    fontSize: 13,
    fontFamily: 'SF-Pro-Text-Regular',
    color: theme.colors.darkGray,
    lineHeight: 24,
  },
  body: {
    fontSize: 17,
    fontFamily: 'SF-Pro-Text-Medium',
    lineHeight: 26,
  },
  divider: {
    backgroundColor: theme.colors.lightGray,
    marginVertical: 10,
  },
  button: {
    marginTop: 20,
    marginBottom: 10,
  },
  avatar: {
    justifyContent: 'center',
  },
});

export default ReviewAppointmentScreen;
