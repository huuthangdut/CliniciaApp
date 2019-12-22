import React, {Fragment, useState, useContext, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  Linking,
  Platform,
} from 'react-native';
import {Avatar, Icon} from 'react-native-elements';
import {AppointmentStatus as Status} from '../../common/enums';
import AppointmentStatus from './components/AppointmentStatus';
import Button from '../../components/core/Button';
import theme from '../../styles/theme';
import Header from '../../components/core/Header';
import {DateTime} from '../../utilities/date-time';
import {AppointmentService} from '../../services/AppointmentService';
import {AppContext} from '../../AppProvider';

const AppointmentDetailsScreen = props => {
  const {navigation} = props;
  const id = navigation.getParam('id');

  const context = useContext(AppContext);

  const [appointment, setAppointment] = useState();

  const [isCancelling, setIsCancelling] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);
  const [isCompleting, setIsCompleting] = useState(false);

  const updateAppointmentStatus = (id, status) => {
    if (status === Status.Cancelled.value) {
      setIsCancelling(true);
      AppointmentService.setStatus(id, status)
        .then(() => {
          setIsCancelling(false);
          setAppointment(val => ({
            ...val,
            status: Status.Cancelled.value,
          }));
          context.shouldReloadAppointmentList.set(value => !value);
        })
        .catch(e => {
          setIsCancelling(false);
          console.log(e);
        });
    } else if (status === Status.Confirmed.value) {
      setIsConfirming(true);
      AppointmentService.setStatus(id, status)
        .then(() => {
          setIsConfirming(false);
          setAppointment(val => ({
            ...val,
            status: Status.Confirmed.value,
          }));
          context.shouldReloadAppointmentList.set(value => !value);
        })
        .catch(e => {
          setIsConfirming(false);
          console.log(e);
        });
    } else if (status === Status.Completed.value) {
      setIsCompleting(true);
      AppointmentService.setStatus(id, status)
        .then(() => {
          setIsCompleting(false);
          setAppointment(val => ({
            ...val,
            status: Status.Completed.value,
          }));
          context.shouldReloadAppointmentList.set(value => !value);
        })
        .catch(e => {
          setIsCompleting(false);
          console.log(e);
        });
    }
  };

  const text = phoneNumber => {
    Linking.openURL('sms:' + phoneNumber).catch(e => console.log(e));
  };

  const dial = phoneNumber => {
    if (Platform.OS === 'android') {
      Linking.openURL('tel:' + phoneNumber).catch(e => console.log(e));
    } else {
      Linking.openURL('telprompt:' + phoneNumber).catch(e => console.log(e));
    }
  };

  useEffect(() => {
    AppointmentService.getAppointment(id)
      .then(result => {
        if (result) {
          setAppointment(result);
        }
      })
      .catch(e => {
        console.log(e);
      });
  }, []);

  return (
    <Fragment>
      <Header navigation={navigation}/>
      {
        appointment ? (
          <View style={styles.container}>
          <View style={styles.headerInfo}>
            <View style={styles.image}>
              <Avatar
                size={60}
                rounded
                source={{uri: appointment.patient.imageProfile}}
              />
            </View>
            <View style={styles.headerTextWrapper}>
              <Text style={styles.headerText}>{appointment.patient.name}</Text>
              <AppointmentStatus type={appointment.status} />
            </View>
            <View style={styles.contact}>
              <TouchableOpacity
                style={styles.iconWrapper}
                onPress={() => text(appointment.patient.phoneNumber)}>
                <Icon
                  iconStyle={styles.icon}
                  size={25}
                  name="message-circle"
                  type="feather"></Icon>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.iconWrapper}
                onPress={() => dial(appointment.patient.phoneNumber)}>
                <Icon
                  iconStyle={styles.icon}
                  size={25}
                  name="phone"
                  type="font-awesome"></Icon>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.divider}></View>
          <ScrollView style={styles.content}>
            <View style={styles.itemRow}>
              <Text style={styles.smText}>Thời gian</Text>
              <Text style={styles.lgText}>
                {DateTime.toDateString(appointment.appointmentDate, 'DD/MM/YYYY')}
              </Text>
              <Text style={styles.smText}>
                {DateTime.toDateString(appointment.appointmentDate, 'HH:mm')}
              </Text>
            </View>
            <View style={styles.itemRow}>
              <Text style={styles.smText}>Địa chỉ</Text>
              <Text style={styles.lgText}>{appointment.patient.address}</Text>
            </View>
            <View style={styles.itemRow}>
              <Text style={styles.smText}>Dịch vụ khám</Text>
              <Text style={styles.lgText}>
                {appointment.checkingService.name}
              </Text>
              <Text style={styles.smText}>
                {appointment.checkingService.durationInMinutes} phút
              </Text>
            </View>
          </ScrollView>
          {appointment.status === Status.Confirming.value && (
            <View>
              <Button
                title="Xác nhận"
                primary
                style={styles.button}
                onPress={() =>
                  updateAppointmentStatus(appointment.id, Status.Confirmed.value)
                }
                loading={isConfirming}
              />
              <Button
                title="Huỷ lịch hẹn"
                secondary
                style={styles.button}
                onPress={() =>
                  updateAppointmentStatus(appointment.id, Status.Cancelled.value)
                }
                loading={isCancelling}
              />
            </View>
          )}
          {appointment.status === Status.Confirmed.value && (
            <Button
              title="Hoàn thành"
              primary
              style={styles.button}
              onPress={() =>
                updateAppointmentStatus(appointment.id, Status.Completed.value)
              }
              loading={isConfirming}
            />
          )}
        </View>
        ) : (
          <ActivityIndicator
          size={30}
          style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
        />
        )
      }
    
    </Fragment>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
    paddingHorizontal: 20,
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
    marginBottom: 15,
  },
});

export default AppointmentDetailsScreen;
