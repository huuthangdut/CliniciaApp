import React, {useState, Fragment, useEffect, useContext} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import theme from '../../../styles/theme';
import {Calendar, LocaleConfig} from 'react-native-calendars';
import {Divider, CheckBox, Icon} from 'react-native-elements';
import Button from '../../../components/core/Button';
import Header from '../../../components/core/Header';
import {DoctorService} from '../../../services/DoctorService';
import {DateTime} from '../../../utilities/date-time';
import {AppContext} from '../../../AppProvider';

const getDateString = date => date.toISOString().split('T')[0];

const MakeAppointmentScreen = props => {
  const {navigation} = props;
  const context = useContext(AppContext);
  const doctor = navigation.getParam('doctor');

  const [selectedService, setSelectedService] = useState();
  const [selectedDate, setSelectedDate] = useState(getDateString(new Date()));
  const [selectedTime, setSelectedTime] = useState();
  const [availableTimes, setAvailableTimes] = useState([]);
  const [checkingServices, setCheckingServices] = useState([]);
  const minDate = getDateString(new Date());

  const Loader = () => (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 5,
      }}>
      <ActivityIndicator size={30} style={{color: '#000'}} />
    </View>
  );

  const onDayPress = day => {
    setSelectedDate(day.dateString);
  };

  const loadWorkingTime = (doctorId, date) => {
    DoctorService.getWorkingTime(doctorId, date).then(result => {
      setAvailableTimes(result.workingTimes);
    });
  };

  const loadCheckingServices = doctorId => {
    DoctorService.getCheckingServices(doctorId).then(result => {
      setCheckingServices(result);
    });
  };

  const handleNext = () => {
    context.appointment.set({
      date: selectedDate,
      time: selectedTime,
      checkingService: selectedService,
      doctor: doctor
    });

    navigation.navigate('ReviewAppointment');
  };

  useEffect(() => {
    setAvailableTimes([]);
    setSelectedTime(null);
    loadWorkingTime(doctor.id, DateTime.toDateString(selectedDate, "YYYYMMDD"));
  }, [selectedDate]);

  useEffect(() => {
    loadCheckingServices(doctor.id);
  }, []);

  LocaleConfig.locales['vi'] = {
    monthNames: [
      'Tháng 1',
      'Tháng 2',
      'Tháng 3',
      'Tháng 4',
      'Tháng 5',
      'Tháng 6',
      'Tháng 7',
      'Tháng 8',
      'Tháng 9',
      'Tháng 10',
      'Tháng 11',
      'Tháng 12',
    ],
    monthNamesShort: [
      'Th.1',
      'Th.2',
      'Th.3',
      'Th.4',
      'Th.5',
      'Th.6',
      'Th.7',
      'Th.8',
      'Th.9',
      'Th.10',
      'Th.11',
      'Th.12',
    ],
    dayNames: [
      'Chủ nhật',
      'Thứ 2',
      'Thứ 3',
      'Thứ 4',
      'Thứ 5',
      'Thứ 6',
      'Thứ 7',
    ],
    dayNamesShort: ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'],
    today: 'Hôm nay',
  };
  LocaleConfig.defaultLocale = 'vi';

  return (
    <Fragment>
      <Header />
      <ScrollView style={styles.container}>
        <Calendar
          onDayPress={day => onDayPress(day)}
          markedDates={{
            [selectedDate]: {selected: true, disableTouchEvent: true},
          }}
          minDate={minDate}
          style={styles.calendar}
          theme={{
            arrowColor: theme.colors.darkGray,
            backgroundColor: theme.colors.white,
            calendarBackground: theme.colors.white,
            dayTextColor: theme.colors.black,
            monthTextColor: theme.colors.black,
            selectedDayBackgroundColor: theme.colors.primary,
            selectedDayTextColor: theme.colors.white,
            textDayFontFamily: 'SF-Pro-Text-Regular',
            textDayFontSize: 17,
            textDayHeaderFontFamily: 'SF-Pro-Text-Regular',
            textDayHeaderFontSize: 12,
            textDisabledColor: '#C8C7CC',
            textMonthFontFamily: 'SF-Pro-Display-Bold',
            textMonthFontSize: 32,
            textSectionTitleColor: theme.colors.darkGray,
            todayTextColor: theme.colors.primary,
          }}
        />
        <View style={styles.mainContent}>
          <View style={styles.availableTime}>
            <Text style={styles.title}>Chọn thời gian</Text>
            {availableTimes.length > 0 ? (
              <FlatList
                style={styles.timeList}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                data={availableTimes}
                renderItem={({item, index}) => {
                  const wrapperStyles = [styles.timeSlot];
                  const textStyles = [styles.time];
                  if (item === selectedTime) {
                    wrapperStyles.push(styles.timeSlotSelected);
                    textStyles.push(styles.timeSelected);
                  }

                  return (
                    <TouchableOpacity
                      disabled={item.isSlotFull}
                      style={wrapperStyles}
                      onPress={() => setSelectedTime(item)}>
                      <Text style={textStyles}>{item}</Text>
                    </TouchableOpacity>
                  );
                }}
                keyExtractor={(item, index) => index}
              />
            ) : (
              <Loader />
            )}
          </View>
          <View style={styles.consulation}>
            <Text style={styles.title}>Chọn dịch vụ</Text>
            <View style={styles.selectWrapper}>
              {checkingServices.length > 0 ? (
                checkingServices.map((item, index) => (
                  <View>
                    <TouchableOpacity
                      style={styles.listItem}
                      onPress={() => setSelectedService(item)}>
                      <View style={styles.serviceContainer}>
                        <Text numberOfLines={2} style={styles.body}>
                          {item.name}
                        </Text>
                        <Text style={styles.servicePrice}>
                          {item.price ? item.price : 'Miễn phí'}
                        </Text>
                      </View>
                      <CheckBox
                        containerStyle={styles.checkBox}
                        checkedColor={theme.colors.secondary}
                        checkedIcon="checkbox-marked-circle"
                        uncheckedIcon="checkbox-blank-circle-outline"
                        iconType="material-community"
                        size={22}
                        right
                        checked={
                          selectedService && item.id == selectedService.id
                        }
                        onPress={() => setSelectedService(item)}
                      />
                    </TouchableOpacity>
                    {index != checkingServices.length - 1 ? (
                      <Divider style={styles.divider} />
                    ) : null}
                  </View>
                ))
              ) : (
                <Loader />
              )}
            </View>
          </View>
          <View style={styles.reminder}>
            <Text style={styles.title}>Đặt lịch nhắc</Text>
            <TouchableOpacity style={styles.listItem}>
              <Text style={styles.body}>Thời gian</Text>
              <View style={styles.alert}>
                <Text style={styles.alertText}>Trước 30 phút</Text>
                <Icon
                  name="chevron-right"
                  type="entypo"
                  size={18}
                  style={styles.alertIcon}
                  color={theme.colors.gray}></Icon>
              </View>
            </TouchableOpacity>
          </View>

          <Button primary title="Tiếp tục" onPress={() => handleNext()} />
        </View>
      </ScrollView>
    </Fragment>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
  calendar: {
    marginHorizontal: 5,
    marginBottom: 20,
  },
  title: {
    fontSize: 17,
    fontFamily: 'SF-Pro-Text-Bold',
  },
  mainContent: {
    paddingHorizontal: 20,
    paddingVertical: 5,
  },
  availableTime: {
    marginBottom: 10,
  },
  timeList: {
    paddingVertical: 12,
  },
  timeSlot: {
    height: 30,
    width: 75,
    padding: 2,
    borderRadius: 20,
    borderColor: theme.colors.primary,
    borderWidth: 1,
    backgroundColor: theme.colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  timeSlotSelected: {
    backgroundColor: theme.colors.primary,
  },
  time: {
    color: theme.colors.primary,
    fontSize: 14,
    fontFamily: 'SF-Pro-Text-Regular',
  },
  timeSelected: {
    color: theme.colors.white,
  },
  timeFull: {
    color: '#C8C7CC',
  },
  divider: {
    backgroundColor: theme.colors.lightGray,
  },
  selectWrapper: {
    flexDirection: 'column',
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    maxHeight: 50,
    marginVertical: 5,
  },
  serviceContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  servicePrice: {
    fontSize: 14,
    fontFamily: 'SF-Pro-Text-Regular',
    color: theme.colors.gray,
  },
  body: {
    fontSize: 17,
    fontFamily: 'SF-Pro-Text-Regular',
  },
  checkBox: {
    backgroundColor: theme.colors.white,
    marginRight: 0,
    width: 40,
  },
  consulation: {
    marginBottom: 15,
  },
  reminder: {
    marginBottom: 15,
  },
  alert: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  alertText: {
    fontSize: 17,
    fontFamily: 'SF-Pro-Text-Regular',
    color: theme.colors.gray,
    lineHeight: 20,
  },
  alertIcon: {
    lineHeight: 20,
  },
  textInput: {
    height: 'auto',
    minHeight: 50,
    maxHeight: 90,
    marginTop: 5,
  },
});

export default MakeAppointmentScreen;
