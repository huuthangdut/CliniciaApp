import React, {useState, Fragment} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import theme from '../../../styles/theme';
import {Calendar} from 'react-native-calendars';
import {Divider, CheckBox, Icon} from 'react-native-elements';
import TextField from '../../../components/core/TextField';
import Button from '../../../components/core/Button';
import Header from '../../../components/core/Header';

const getDateString = date => date.toISOString().split('T')[0];

const MakeAppointmentScreen = props => {
  const {navigation} = props;

  const [selectedConsulationType, setSelectedConsulationType] = useState('');
  const [selectedDate, setSelectedDate] = useState(getDateString(new Date()));
  const [availableTimes, setAvailableTimes] = useState([
    {time: '10:00', selected: false, isSlotFull: false},
    {time: '11:00', selected: false, isSlotFull: false},
    {time: '12:00', selected: false, isSlotFull: false},
    {time: '13:00', selected: false, isSlotFull: true},
    {time: '14:00', selected: false, isSlotFull: false},
    {time: '15:00', selected: false, isSlotFull: false},
    {time: '16:00', selected: true, isSlotFull: true},
    {time: '17:00', selected: false, isSlotFull: false},
    {time: '18:00', selected: false, isSlotFull: false},
    {time: '19:00', selected: false, isSlotFull: true},
    {time: '20:00', selected: false, isSlotFull: false},
    {time: '21:00', selected: false, isSlotFull: false},
  ]);
  const minDate = getDateString(new Date());

  onDayPress = day => {
    setSelectedDate(day.dateString);
  };

  onTimeSlotSelected = (time, index) => {
    const times = availableTimes.map(i =>
      i.selected ? {...i, selected: false} : i,
    );
    times[index].selected = true;
    setAvailableTimes(times);
  };

  return (
    <Fragment>
      <Header/>
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
            <Text style={styles.title}>Available Time</Text>
            <FlatList
              style={styles.timeList}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              data={availableTimes}
              renderItem={({item, index}) => {
                const wrapperStyles = [styles.timeSlot];
                const textStyles = [styles.time];
                if (item.isSlotFull) {
                  wrapperStyles.push(styles.timeSlotFull);
                  textStyles.push(styles.timeFull);
                } else if (item.selected) {
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
            <Divider style={styles.divider} />
          </View>
          <View style={styles.consulation}>
            <Text style={styles.title}>What Do You Need</Text>
            <View style={styles.selectWrapper}>
              <TouchableOpacity
                style={styles.listItem}
                onPress={() => setSelectedConsulationType('consulation')}>
                <Text style={styles.body}>Consulation</Text>
                <CheckBox
                  containerStyle={styles.checkBox}
                  checkedColor={theme.colors.secondary}
                  checkedIcon="checkbox-marked-circle"
                  iconType="material-community"
                  size={22}
                  right
                  uncheckedIcon="checkbox-blank-circle-outline"
                  checked={selectedConsulationType === 'consulation'}
                />
              </TouchableOpacity>
              <Divider style={styles.divider} />
            </View>
            <View style={styles.selectWrapper}>
              <TouchableOpacity
                style={styles.listItem}
                onPress={() => setSelectedConsulationType('treatment')}>
                <Text style={styles.body}>Treatment</Text>
                <CheckBox
                  containerStyle={styles.checkBox}
                  checkedColor={theme.colors.secondary}
                  checkedIcon="checkbox-marked-circle"
                  iconType="material-community"
                  size={22}
                  right
                  uncheckedIcon="checkbox-blank-circle-outline"
                  checked={selectedConsulationType === 'treatment'}
                />
              </TouchableOpacity>
              <Divider style={styles.divider} />
            </View>
          </View>
          <View style={styles.reminder}>
            <Text style={styles.title}>Reminder</Text>
            <TouchableOpacity style={styles.listItem}>
              <Text style={styles.body}>Select alert</Text>
              <View style={styles.alert}>
                <Text style={styles.alertText}>30 minutes before</Text>
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
              placeholder="Message"
              multiline={true}
              numberOfLines={2}
              containerStyle={styles.textInput}
            />
          </View>
          <Button
            primary
            title="Next"
            onPress={() => navigation.navigate('ReviewAppointment')}
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
    marginBottom: 20
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

export default MakeAppointmentScreen;
