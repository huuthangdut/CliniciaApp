import React, { useContext } from 'react';
import {Text, View, StyleSheet, ScrollView} from 'react-native';
import theme from '../../../styles/theme';
import {Icon, Avatar} from 'react-native-elements';
import Button from '../../../components/core/Button';
import { AppContext } from '../../../AppProvider';

const BookingSuccessScreen = props => {
  const { navigation } = props;
  const context = useContext(AppContext);

  const onComplete = () => {
    context.shouldReloadAppointmentList.set(true);
    navigation.navigate('Appointments');
  }

  return (
    <View style={styles.container}>
      <View style={styles.textWrapper}>
        <Icon
          name="checkbox-marked-circle"
          type="material-community"
          size={45}
          style={styles.alertIcon}
          color={theme.colors.secondary}></Icon>
        <Text style={styles.header}>Đặt lịch thành công!</Text>
        <Text style={styles.subHeader}>
          Bạn đã đặt lịch hẹn thành công với bác sĩ.
        </Text>
        <Text style={styles.subHeader}>
          Cám ơn bạn đã sử dụng dịch vụ của chúng tôi.
        </Text>
      </View>
      <View style={styles.content}>
        {/* <View style={styles.card}> */}
          {/* <View style={styles.avatar}>
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
            <Text style={styles.specialty}>Nha khoa</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.title}>Thời gian</Text>
            <Text style={styles.body}>Thứ 2, 24 tháng 10</Text>
            <Text style={styles.subTitle}>10:00</Text>
          </View>
          <View style={styles.row}> */}
            {/* <Text style={styles.title}>Địa chỉ</Text>
            <Text style={styles.body}>Hoan my Clinic Saigon</Text>
            <Text style={styles.subTitle}>San Francisco, California</Text>
            <Text style={styles.subTitle}>Cách vị trí của bạn 3km</Text>
          </View> */}
        {/* </View> */}
        <Button primary title="Hoàn thành" onPress={() => onComplete()} style={styles.button}/>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
    paddingHorizontal: 15,
    paddingVertical: 30,
    justifyContent: 'center'
  },
  textWrapper: {
    marginVertical: 10,
    alignItems: 'center',
  },
  header: {
    fontSize: 40,
    fontFamily: 'SF-Pro-Display-Bold',
    marginBottom: 10
  },
  subHeader: {
    textAlign: 'center',
    fontSize: 16,
    fontFamily: 'SF-Pro-Text-Regular',
    color: theme.colors.darkGray,
    lineHeight: 20,
    marginTop: 6
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
    marginTop: 50,
    marginBottom: 5,
  },
});

export default BookingSuccessScreen;