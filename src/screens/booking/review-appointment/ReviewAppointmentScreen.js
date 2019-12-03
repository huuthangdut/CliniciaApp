import React, {Fragment, useContext} from 'react';
import {Text, View, StyleSheet, ScrollView} from 'react-native';
import theme from '../../../styles/theme';
import {Divider, Avatar} from 'react-native-elements';
import Button from '../../../components/core/Button';
import Header from '../../../components/core/Header';
import {DateTime} from '../../../utilities/date-time';
import {AppointmentService} from '../../../services/AppointmentService';
import {AppContext} from '../../../AppProvider';

const ReviewAppointmentScreen = props => {
  const {navigation} = props;
  const context = useContext(AppContext);
  const appointment = context.appointment.get;

  const getAppointmentModel = () => {
    return {
      appointmentDate: DateTime.toDateString(appointment.date + ' ' + appointment.time),
      totalMinutes: appointment.checkingService.durationInMinutes,
      totalPrice: appointment.checkingService.price,
      doctorId: appointment.doctor.id,
      checkingServiceId: appointment.checkingService.id,
      sendNotificationBeforeMinutes: appointment.reminderBefore.value
    };
  };

  const handleNext = () => {
    AppointmentService.addAppointment(getAppointmentModel()).then(() => {
      navigation.replace('BookingSuccess');
    }).catch(e => console.log(e));
  };

  return (
    <Fragment>
      <Header />
      <ScrollView style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.header}>Xác nhận lịch đặt</Text>
          <View style={styles.list}>
            <View style={styles.listItem}>
              <Text style={styles.text}>Thời gian</Text>
              <Text style={styles.body}>{appointment.date}</Text>
              <Text style={styles.text}>{appointment.time}</Text>
              <Divider style={styles.divider} />
            </View>
            <View style={styles.listItem}>
              <View style={styles.row}>
                <View style={{flex: 1}}>
                  <Text style={styles.text}>Bác sĩ</Text>
                  <Text style={styles.body}>
                    {appointment.doctor.firstName +
                      ' ' +
                      appointment.doctor.lastName}
                  </Text>
                  <Text style={styles.text}>
                    {appointment.doctor.specialty.name}
                  </Text>
                </View>
                <View style={styles.avatar}>
                  <Avatar
                    size="medium"
                    rounded
                    source={{
                      uri: appointment.doctor.imageProfile,
                    }}
                  />
                </View>
              </View>
              <Divider style={styles.divider} />
            </View>
            <View style={styles.listItem}>
              <Text style={styles.text}>Địa chỉ</Text>
              <Text style={styles.body}>{appointment.doctor.clinic}</Text>
              <Text style={styles.text}>
                {appointment.doctor.location.address}
              </Text>
            </View>
            <Divider style={styles.divider} />
            <View style={styles.listItem}>
              <Text style={styles.text}>Dịch vụ khám</Text>
              <Text style={styles.body}>
                {appointment.checkingService.name}
              </Text>
              <Text style={styles.text}>
                {appointment.checkingService.description}
              </Text>
              <Divider style={styles.divider} />
            </View>
            <View style={styles.listItem}>
              <Text style={styles.text}>Giá khám</Text>
              <Text style={styles.body}>
                {appointment.checkingService.price
                  ? appointment.checkingService.price
                  : 'Miễn phí'}
              </Text>
              <Divider style={styles.divider} />
            </View>
            <View style={styles.listItem}>
              <Text style={styles.text}>Nhắc nhở</Text>
              <Text style={styles.body}>
                  {appointment.reminderBefore.text}
              </Text>
              <Divider style={styles.divider} />
            </View>
          </View>
        </View>
        <Button
          primary
          title="Xác nhận"
          style={styles.button}
          onPress={() => handleNext()}
        />
      </ScrollView>
    </Fragment>
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
