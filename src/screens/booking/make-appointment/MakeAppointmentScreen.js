import React, {useState, Fragment, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import theme from '../../../styles/theme';
import {Calendar, LocaleConfig} from 'react-native-calendars';
import {Divider, CheckBox, Icon} from 'react-native-elements';
import TextField from '../../../components/core/TextField';
import Button from '../../../components/core/Button';
import Header from '../../../components/core/Header';
import {DoctorService} from '../../../services/DoctorService';
import {DateTime} from '../../../utilities/date-time';
import WithContext from '../../../components/core/WithContext';

const getDateString = date => date.toISOString().split('T')[0];

const MakeAppointmentScreen = props => {
  const {navigation} = props;
  const doctorId = navigation.getParam('doctorId');
  const price = navigation.getParam('price');

  const [selectedConsulationType, setSelectedConsulationType] = useState('');
  const [selectedDate, setSelectedDate] = useState(getDateString(new Date()));
  const [availableTimes, setAvailableTimes] = useState([]);
  const [description, setDescription] = useState('');
  const minDate = getDateString(new Date());

  const onDayPress = day => {
    setSelectedDate(day.dateString);
  };

  const onTimeSlotSelected = (time, index) => {
    const times = availableTimes.map(i =>
      i.selected ? {...i, selected: false} : i,
    );
    times[index].selected = true;
    setAvailableTimes(times);
  };

  const loadWorkingTime = (doctorId, date) => {
    DoctorService.getWorkingTime(doctorId, date).then(result => {
      const workingTimes = result.workingTimes.map(time => ({
        time: time,
        selected: false
      }));
      setAvailableTimes(workingTimes);
    });
  };

  const handleNext = () => {
    console.log("next");
    console.log(selectedDate);
    console.log(availableTimes.find(i => i.selected).time);
    console.log(selectedConsulationType);
    console.log(description);
    props.context.appointment = {
      date: selectedDate + ' ' + availableTimes.find(i => i.selected).time,
      duration: 30,
      price: price,
      description: 0,
      type: selectedConsulationType,
      doctorId: doctorId
    };

    console.log(props.context);
    navigation.navigate('ReviewAppointment');
  };

  useEffect(() => {
    loadWorkingTime(doctorId, DateTime.toUnixTimestamp(selectedDate));
  }, [selectedDate]);

  LocaleConfig.locales['vi'] = {
    monthNames: ['Tháng 1','Tháng 2','Tháng 3','Tháng 4','Tháng 5','Tháng 6','Tháng 7','Tháng 8','Tháng 9','Tháng 10','Tháng 11','Tháng 12'],
    monthNamesShort: ['Th.1','Th.2','Th.3','Th.4','Th.5','Th.6','Th.7','Th.8','Th.9','Th.10','Th.11','Th.12'],
    dayNames: ['Chủ nhật','Thứ 2','Thứ 3','Thứ 4','Thứ 5','Thứ 6','Thứ 7'],
    dayNamesShort: ['CN','T2','T3','T4','T5','T6','T7'],
    today: 'Hôm nay'
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
            {availableTimes.length > 0 && (
              <FlatList
                style={styles.timeList}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                data={availableTimes}
                renderItem={({item, index}) => {
                  const wrapperStyles = [styles.timeSlot];
                  const textStyles = [styles.time];
                  if (item.selected) {
                    wrapperStyles.push(styles.timeSlotSelected);
                    textStyles.push(styles.timeSelected);
                  }

                  return (
                    <TouchableOpacity
                      disabled={item.isSlotFull}
                      style={wrapperStyles}
                      onPress={() => onTimeSlotSelected(item, index)}>
                      <Text style={textStyles}>{item.time}</Text>
                    </TouchableOpacity>
                  );
                }}
                keyExtractor={(item, index) => index}
              />
            )}

            <Divider style={styles.divider} />
          </View>
          <View style={styles.consulation}>
            <Text style={styles.title}>Bạn muốn</Text>
            <View style={styles.selectWrapper}>
              <TouchableOpacity
                style={styles.listItem}
                onPress={() => setSelectedConsulationType('consulation')}>
                <Text style={styles.body}>Tư vấn</Text>
                <CheckBox
                  containerStyle={styles.checkBox}
                  checkedColor={theme.colors.secondary}
                  checkedIcon="checkbox-marked-circle"
                  iconType="material-community"
                  size={22}
                  right
                  uncheckedIcon="checkbox-blank-circle-outline"
                  checked={selectedConsulationType === 'consulation'}
                  onPress={() => setSelectedConsulationType('consulation')}
                />
              </TouchableOpacity>
              <Divider style={styles.divider} />
            </View>
            <View style={styles.selectWrapper}>
              <TouchableOpacity
                style={styles.listItem}
                onPress={() => setSelectedConsulationType('treatment')}>
                <Text style={styles.body}>Điều trị</Text>
                <CheckBox
                  containerStyle={styles.checkBox}
                  checkedColor={theme.colors.secondary}
                  checkedIcon="checkbox-marked-circle"
                  iconType="material-community"
                  size={22}
                  right
                  uncheckedIcon="checkbox-blank-circle-outline"
                  checked={selectedConsulationType === 'treatment'}
                  onPress={() => setSelectedConsulationType('treatment')}
                />
              </TouchableOpacity>
              <Divider style={styles.divider} />
            </View>
          </View>
          <View style={styles.reminder}>
            <Text style={styles.title}>Nhắc nhở tôi</Text>
            <TouchableOpacity style={styles.listItem}>
              <Text style={styles.body}>Thời gian</Text>
              <View style={styles.alert}>
                <Text style={styles.alertText}>30 phút trước đó</Text>
                <Icon
                  name="chevron-right"
                  type="entypo"
                  size={18}
                  style={styles.alertIcon}
                  color={theme.colors.gray}></Icon>
              </View>
            </TouchableOpacity>
            <Divider style={styles.divider} />
          </View>
          <View style={styles.description}>
            <TextField
              placeholder="Để lại lời nhắn cho bác sĩ"
              multiline={true}
              numberOfLines={2}
              containerStyle={styles.textInput}
              onChangeText={(value) => setDescription(value)}
            />
          </View>
          <Button
            primary
            title="Tiếp tục"
            onPress={() => handleNext()}
          />
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
    marginBottom: 15,
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
  timeSlotFull: {
    backgroundColor: theme.colors.white,
    borderColor: '#C8C7CC',
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
    height: 48,
  },
  body: {
    fontSize: 17,
    fontFamily: 'SF-Pro-Text-Regular',
    flex: 1,
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

export default WithContext(MakeAppointmentScreen);
