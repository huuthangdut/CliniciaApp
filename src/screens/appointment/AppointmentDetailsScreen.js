import React, {Fragment} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {Avatar, Icon} from 'react-native-elements';
import AppointmentStatus from './components/AppointmentStatus';
import Button from '../../components/core/Button';
import theme from '../../styles/theme';
import Header from '../../components/core/Header';
import { DateTime } from '../../utilities/date-time';

const AppointmentDetailsScreen = props => {
  const { navigation } = props;
  const appointment = navigation.getParam('appointment');

  return (
    <Fragment>
      <Header/>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <View style={styles.headerInfo}>
            <View style={styles.image}>
              <Avatar
                size={60}
                rounded
                source={{ uri: appointment.doctor.imageProfile }}
              />
            </View>
            <View style={styles.headerTextWrapper}>
              <Text style={styles.headerText}>{appointment.doctor.name}</Text>
              <AppointmentStatus type={appointment.status} />
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
              <Text style={styles.smText}>Thời gian</Text>
              <Text style={styles.lgText}>{DateTime.toDateString(appointment.appointmentDate, 'DD/MM/YYYY')}</Text>
              <Text style={styles.smText}>{DateTime.toDateString(appointment.appointmentDate, 'HH:mm')}</Text>
            </View>
            <View style={styles.itemRow}>
              <Text style={styles.smText}>Địa chỉ</Text>
              <Text style={styles.lgText}>{appointment.doctor.clinic}</Text>
              <Text style={styles.smText}>{appointment.doctor.address}</Text>
              {/* <Text style={styles.smText}>0.31 mi away</Text> */}
            </View>
            <View style={styles.itemRow}>
              <Text style={styles.smText}>Giá khám</Text>
              <Text style={styles.lgText}>{appointment.price ? appointment.price + 'đ' : 'Miễn phí'}</Text>
              <Text style={styles.smText}>{appointment.totalMinutes} phút</Text>
            </View>
            <View style={styles.itemRow}>
              <Text style={styles.smText}>Dịch vụ khám</Text>
              <Text style={styles.lgText}>{appointment.checkingService.name}</Text>
              <Text style={styles.smText}>{appointment.checkingService.description}</Text>
            </View>
            <View style={styles.itemRow}>
              <Text style={styles.smText}>Nhắc nhở</Text>
              <Text style={styles.lgText}>Trước 30 phút</Text>
            </View>
          </View>
          <Button title="Cancel" secondary disabled style={styles.button} />
        </View>
      </ScrollView>
    </Fragment>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
    paddingHorizontal: 20
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
    marginVertical: 5,
  },
});

export default AppointmentDetailsScreen;
