import React, {Fragment, useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  ToastAndroid,
} from 'react-native';
import theme from '../../styles/theme';
import Header from '../../components/core/Header';
import {Icon, ListItem} from 'react-native-elements';
import Accordion from 'react-native-collapsible/Accordion'
import DateTimePicker from '@react-native-community/datetimepicker';
import TextField from '../../components/core/TextField';
import Button from '../../components/core/Button';
import {DateTime} from '../../utilities/date-time';
import { DoctorService } from '../../services/DoctorService';
import {Toast} from '../../utilities/toast';

const WorkingScheduleScreen = props => {
  const {navigation} = props;

  const [activeSections, setActiveSections] = useState([]);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const [activeScheduleId, setActiveScheduleId] = useState();

  const [timePickerValue, setTimePickerValue] = useState();
  const [timeValue, setTimeValue] = useState({
      dayOfWeek: null,
      index: null,
      type: null
  });

  const dayOfWeeks = [
    {id: 0, title: 'Chủ nhật'},
    {id: 1, title: 'Thứ 2'},
    {id: 2, title: 'Thứ 3'},
    {id: 3, title: 'Thứ 4'},
    {id: 4, title: 'Thứ 5'},
    {id: 5, title: 'Thứ 6'},
    {id: 6, title: 'Thứ 7'},
  ];

  const [times, setTimes] = useState({
    0: [
      {
        from: '08:00',
        to: '12:00',
      },
      {
        from: '15:00',
        to: '20:00',
      },
    ],
    1: [
      {
        from: '08:00',
        to: '22:00',
      },
    ],
    2: [
      {
        from: '08:00',
        to: '22:00',
      },
    ],
    3: [
      {
        from: '08:00',
        to: '22:00',
      },
    ],
    4: [
      {
        from: '08:00',
        to: '22:00',
      },
    ],
    5: [
      {
        from: '08:00',
        to: '22:00',
      },
    ],
    6: [
      {
        from: '08:00',
        to: '22:00',
      },
    ],
  })

  useEffect(() => {
    DoctorService.getWorkingSchedule()
        .then(result => {
            if(result && result.length > 0) {
                setActiveScheduleId(result[0].id);
                setTimes(result[0].hours);
            }
            
        }).catch(() => {});
  }, []);

  const _renderHeader = section => {
    return (
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionHeaderText}>{section.title}</Text>
      </View>
    );
  };

  const removeHour = (dayofWeek, item, index) => {
      const currentTimes = Object.assign({}, times);
      currentTimes[dayofWeek].splice(index, 1);
      setTimes(currentTimes);
  };

  const addHour = dayOfWeek => {
    let currentTimes = Object.assign({}, times); 
    currentTimes[dayOfWeek].push({ from: '', to: ''})
    setTimes(currentTimes);
  };

  const updateTime = (value, dayOfWeek, index, type) => {
      let currentTimes = Object.assign({}, times);
      currentTimes[dayOfWeek][index][type] = value;
      setTimes(currentTimes);
  }

  const onShowPicker = (dayOfWeek, item, index, type) => {
    setTimeValue({
        dayOfWeek: dayOfWeek,
        index: index,
        type: type
    });
    if(item[type]) {
        setTimePickerValue(DateTime.parseDate(item[type]));
    } else {
        setTimePickerValue(new Date());
    }
    setShowTimePicker(true);
  }

  const _renderContent = section => {
    return (
      <View>
        {times[section.id].map((item, index) => (
          <View style={styles.item} key={index}>
            <View style={styles.time}>
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                    <TouchableOpacity 
                        onPress={() => onShowPicker(section.id, item, index, 'from')}
                        style={{minWidth: 55, marginVertical: 10, borderBottomColor: theme.colors.primary, borderBottomWidth: 2}}>
                        <Text style={styles.titleText}>{item.from}</Text>
                    </TouchableOpacity>
                </View>
                <View style={{justifyContent: 'center', alignItems: 'center', marginHorizontal: 10}}>
                    <Text>~</Text>
                </View>
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                    <TouchableOpacity 
                        onPress={() => onShowPicker(section.id, item, index, 'to')}
                        style={{minWidth: 55, marginVertical: 10, borderBottomColor: theme.colors.primary, borderBottomWidth: 2}}>
                        <Text style={styles.titleText}>{item.to}</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.button}>
              <Icon
                name="trash-2"
                type="feather"
                size={20}
                containerStyle={{paddingHorizontal: 10}}
                color={theme.colors.red}
                onPress={() => removeHour(section.id, item, index)}
              />
            </View>
          </View>
        ))}
        <TouchableOpacity
          style={styles.addTime}
          onPress={() => addHour(section.id)}>
          <Icon
            name="plus-circle"
            type="font-awesome"
            size={28}
            containerStyle={{marginRight: 15}}
            color={theme.colors.primary}
          />
        </TouchableOpacity>
      </View>
    );
  };

  const _updateSections = activeSection => {
    setActiveSections(activeSection);
  };

  const isValidHours = () => {
    let check = true;
    Object.keys(times).forEach(function(key) {
        for(let i = 0; i < times[key].length; i++) {
            if(!times[key][i] || !times[key][i]['from'] || !times[key][i]['to'] || times[key][i]['from'] >= times[key][i]['to'])  {
                check = false
            }
        }

        for(let i = 0; i < times[key].length - 1; i++) {
            if(times[key][i]['to'] > times[key][i+1]['from']) {
                check = false;
            }
        }
    });

    return check;
  };

  const onSave = () => {
    if(!isValidHours()) {
        Toast.error("Thời gian không hợp lệ. Vui lòng kiểm tra lại");
        return;
    }

    // 08:00-12:00+15:00-20:00,08:00-22:00,08:00-22:00,08:00-22:00,08:00-22:00,08:00-22:00,08:00-22:00
    let hours = '';
    Object.keys(times).forEach(function (key) {
        // console.log(times[key])
        let hourOfDay = '';
        times[key].forEach((value, index) => {
            hourOfDay += value.from + '-' + value.to;
            if(index !== times[key].length - 1) {
                hourOfDay += '+';
            }
        });
        if(!hourOfDay) {
            hourOfDay = '0';
        }

        // console.log(hourOfDay);

        hours += hourOfDay + ',';
     });
     hours = hours.substring(0, hours.length - 1);

     DoctorService.updateWorkingHour(activeScheduleId, hours).then(() => {
         ToastAndroid.show("Cập nhật thành công", ToastAndroid.SHORT);
        navigation.goBack();
     }).catch(e => console.log(e));
  }

  const onTimeSelected = (event, date) => {
      setShowTimePicker(false);
      let currentTimes = Object.assign({}, times);
      if(timeValue) {
          currentTimes[timeValue.dayOfWeek][timeValue.index][timeValue.type] = DateTime.toTimeString(date);
          setTimes(currentTimes);
      }
  }

  return (
    <Fragment>
      <Header navigation={navigation} hasBackIcon={true} />
      <View style={styles.container}>
        <Text style={styles.header}>Quản lý giờ làm việc</Text>
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <Accordion
            sections={dayOfWeeks}
            activeSections={activeSections}
            renderHeader={_renderHeader}
            renderContent={_renderContent}
            onChange={_updateSections}
          />
        </ScrollView>
        { showTimePicker && <DateTimePicker value={timePickerValue}
                    mode='time'
                    is24Hour={true}
                    display="default"
                    onChange={onTimeSelected}
                    />
        }
      </View>
      <TouchableOpacity style={styles.addButton} activeOpacity={0.7} onPress={() => onSave()}>
                <Icon type="entypo" name="save" size={45} color={theme.colors.primary} style={{marginRight: 10, marginBottom: 5}}/>
            </TouchableOpacity>
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
  header: {
    fontSize: 28,
    fontFamily: 'SF-Pro-Display-Bold',
  },
  content: {
    flex: 1,
    marginTop: 10,
  },
  item: {
    height: 60,
    flexDirection: 'row',
    borderRadius: 10,
    borderColor: theme.colors.lightGray,
    borderWidth: 1,
    marginTop: 5,
    marginHorizontal: 10
  },
  title: {
    width: 110,
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  titleText: {
    fontSize: 17,
    fontFamily: 'SF-Pro-Display-Semibold'
  },
  time: {
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: 10,
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  timeText: {
    fontSize: 16,
    fontFamily: 'SF-Pro-Text-Regular',
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
  },
  sectionHeader: {
    marginHorizontal: 5,
    marginTop: 15,
    backgroundColor: theme.colors.lightGray,
    padding: 15,
    borderRadius: 10,
  },
  sectionHeaderText: {
    fontSize: 18,
    fontFamily: 'SF-Pro-Display-Semibold',
  },
  addTime: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginRight: 5,
    marginTop: 5,
  },
  addButton: {
    position: 'absolute',
    bottom: 10,
    right: 20,
    zIndex: 9999
}
});

export default WorkingScheduleScreen;
