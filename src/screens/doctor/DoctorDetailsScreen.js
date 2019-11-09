import React, {useState, useEffect, Fragment} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import theme from '../../styles/theme';
import {Rating, Icon, Button, Divider} from 'react-native-elements';
import Header from '../../components/core/Header';
import {DoctorService} from '../../services/DoctorService';

const DoctorDetailsScreen = props => {
  const {navigation} = props;
  const doctorId = navigation.getParam('id');
  const [doctor, setDoctor] = useState({});
  const [loading, setLoading] = useState(false);

  const loadDoctor = id => {
    setLoading(true);
    DoctorService.getDoctor(id)
      .then(result => {
        setDoctor(result);
        console.log(result);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    loadDoctor(doctorId);
  }, []);

  return (
    <Fragment>
      {loading ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size={40} style={{color: '#000'}} />
        </View>
      ) : (
        <ScrollView style={styles.container}>
          <View style={styles.headerContainer}>
            <Header title="Thông tin bác sĩ" color="white" />
            <View style={styles.card}>
              <View style={styles.row}>
                <Image
                  resizeMode="cover"
                  style={styles.avatar}
                  source={{
                    uri: doctor.imageProfile,
                  }}
                />
                <View style={styles.basicInfo}>
                  <Text style={styles.name}>
                    {doctor.firstName + ' ' + doctor.lastName}
                  </Text>
                  <Text style={styles.specialty}>{doctor.specialty ? doctor.specialty.name : '...'}</Text>
                  <View style={styles.rating}>
                    <Rating
                      imageSize={10}
                      readonly
                      startingValue={doctor.rating}
                    />
                    <Text style={styles.ratingCount}>{doctor.ratingCount}</Text>
                  </View>
                </View>
              </View>
              <View style={styles.rowInfo}>
                <View style={styles.col}>
                  <Text style={styles.cardText}>{doctor.price} đ</Text>
                  <Text style={styles.subText}>60 phút</Text>
                </View>
                <View style={styles.divider}></View>
                <View style={styles.col}>
                  <Text style={styles.cardText}>{doctor.yearExperience} năm</Text>
                  <Text style={styles.subText}>Kinh nghiệm</Text>
                </View>
                <View style={styles.divider}></View>
                <View style={styles.col}>
                  <Text style={styles.cardText}>{doctor.numberOfPatients}</Text>
                  <Text style={styles.subText}>Bệnh nhân</Text>
                </View>
              </View>
              <View style={styles.rowInfo}>
                <View style={styles.buttonContainer}>
                  <Button
                    TouchableComponent={TouchableOpacity}
                    onPress={() => navigation.navigate('Booking', { doctorId: doctorId, price: doctor.price })}
                    title="Đặt lịch"
                    type="solid"
                    titleStyle={styles.buttonText}
                    buttonStyle={styles.button}
                  />
                </View>
                <TouchableOpacity style={styles.loveContainer}>
                  <Icon
                    name="heart"
                    type="antdesign"
                    size={22}
                    iconStyle={styles.loveIcon}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={styles.content}>
            <View style={styles.address}>
              <Text style={styles.subText}>Địa chỉ</Text>
              <Text style={styles.body} numberOfLines={2}>
                {doctor.location}
              </Text>
            </View>
            <Divider style={styles.horizontalDivider} />
            <View>
              <Text style={styles.subText}>Education</Text>
              <Text style={styles.body}>{doctor.medicalSchool}</Text>
            </View>
            <Divider style={styles.horizontalDivider} />
            <View>
              <Text style={styles.subText}>Awards</Text>
              <Text style={styles.body}>{doctor.awards}</Text>
            </View>
            <Divider style={styles.horizontalDivider} />
          </View>
        </ScrollView>
      )}
    </Fragment>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
  headerContainer: {
    height: 320,
    marginBottom: 50,
    width: '100%',
    backgroundColor: theme.colors.primary,
  },
  card: {
    marginTop: 8,
    marginHorizontal: 16,
    backgroundColor: theme.colors.white,
    borderRadius: 8,
    ...theme.styles.shadow2,
    padding: 16,
  },
  row: {
    flexDirection: 'row',
  },
  col: {
    flexDirection: 'column',
    flex: 1,
  },
  avatar: {
    width: 86,
    height: 86,
    borderRadius: 10,
  },
  basicInfo: {
    flexDirection: 'column',
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
  name: {
    fontSize: 17,
    fontFamily: 'SF-Pro-Text-Bold',
  },
  specialty: {
    fontSize: 15,
    fontFamily: 'SF-Pro-Text-Regular',
    color: theme.colors.darkGray,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  ratingCount: {
    fontSize: 13,
    fontFamily: 'SF-Pro-Text-Regular',
    color: theme.colors.darkGray,
    marginLeft: 5,
  },
  rowInfo: {
    flexDirection: 'row',
    marginTop: 15,
  },
  divider: {
    height: '100%',
    borderLeftColor: '#D8D8D8',
    borderLeftWidth: 1,
    marginRight: 16,
  },
  cardText: {
    fontSize: 17,
    fontFamily: 'SF-Pro-Text-Semibold',
  },
  subText: {
    fontSize: 13,
    fontFamily: 'SF-Pro-Text-Regular',
    color: theme.colors.gray,
  },
  buttonContainer: {
    flex: 1,
    marginRight: 16,
  },
  button: {
    backgroundColor: theme.colors.secondary,
    borderRadius: 6,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 17,
    fontFamily: 'SF-Pro-Text-Semibold',
  },
  loveContainer: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D8D8D8',
    borderRadius: 8,
  },
  loveIcon: {
    color: '#C8C7CC',
  },
  content: {
    padding: 15,
  },
  address: {
    backgroundColor: '#FCFCFC',
    padding: 10,
    borderRadius: 10,
  },
  body: {
    fontSize: 15,
    fontFamily: 'SF-Pro-Text-Regular',
  },
  horizontalDivider: {
    marginVertical: 16,
  },
});

export default DoctorDetailsScreen;
