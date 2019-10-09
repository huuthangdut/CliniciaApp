import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Avatar, Icon} from 'react-native-elements';
import AppointmentStatus from './components/AppointmentStatus';
import Button from '../../components/core/Button';
import theme from '../../styles/theme';
import {ScrollView} from 'react-native-gesture-handler';

const AppointmentDetailsScreen = props => {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <View style={styles.headerInfo}>
          <View style={styles.image}>
            <Avatar
              size={60}
              rounded
              source={{
                uri:
                  'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
              }}
            />
          </View>
          <View style={styles.headerTextWrapper}>
            <Text style={styles.headerText}>Kristina Clark</Text>
            <AppointmentStatus type="confirmed" />
          </View>
          <View style={styles.contact}>
            <TouchableOpacity style={styles.iconWrapper}>
              <Icon
                iconStyle={styles.icon}
                size={25}
                name="message-circle"
                type="feather"></Icon>
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconWrapper}>
              <Icon
                iconStyle={styles.icon}
                size={25}
                name="phone"
                type="font-awesome"></Icon>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.divider}></View>

        <View style={styles.content}>
          <View style={styles.itemRow}>
            <Text style={styles.smText}>Date & Time</Text>
            <Text style={styles.lgText}>Monday, October 24</Text>
            <Text style={styles.smText}>8:00 AM</Text>
          </View>
          <View style={styles.itemRow}>
            <Text style={styles.smText}>Address</Text>
            <Text style={styles.lgText}>San Francisco, California</Text>
            <Text style={styles.smText}>Hoan My Hospital</Text>
            <Text style={styles.smText}>0.31 mi away</Text>
          </View>
          <View style={styles.itemRow}>
            <Text style={styles.smText}>Fee</Text>
            <Text style={styles.lgText}>$75</Text>
            <Text style={styles.smText}>For 30 minutes</Text>
          </View>
          <View style={styles.itemRow}>
            <Text style={styles.smText}>Need</Text>
            <Text style={styles.lgText}>Treatment</Text>
            <Text style={styles.smText}>Any kind of treatment</Text>
          </View>
          <View style={styles.itemRow}>
            <Text style={styles.smText}>Reminder</Text>
            <Text style={styles.lgText}>30 minutes before</Text>
          </View>
        </View>
        <Button title="Cancel" secondary disabled style={styles.button}/>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
    padding: 20,
  },
  headerInfo: {
    width: '100%',
    height: 80,
    flexDirection: 'row',
  },
  image: {
    justifyContent: 'center',
    marginRight: 15,
  },
  headerTextWrapper: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 20,
    fontFamily: 'SF-Pro-Display-Bold',
    marginBottom: 5,
  },
  contact: {
    width: 100,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconWrapper: {
    width: 45,
    height: 45,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: theme.colors.lightGray,
    borderRadius: 40 / 2,
  },
  icon: {
    color: theme.colors.primary,
  },
  divider: {
    height: 1,
    width: '100%',
    backgroundColor: theme.colors.lightGray,
    marginVertical: 5,
  },
  content: {
    flex: 1,
    flexDirection: 'column',
  },
  itemRow: {
    marginVertical: 10,
  },
  smText: {
    fontSize: 16,
    fontFamily: 'SF-Pro-Text-Medium',
    color: theme.colors.gray,
    lineHeight: 25,
  },
  lgText: {
    fontSize: 19,
    fontFamily: 'SF-Pro-Text-Medium',
    lineHeight: 30,
  },
  button: {
      marginVertical: 5
  }
});

export default AppointmentDetailsScreen;
