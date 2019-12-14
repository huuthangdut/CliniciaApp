import React, {useState, useEffect, Fragment, useContext} from 'react';
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
import {FavoriteService} from '../../services/FavoriteService';
import {AppContext} from '../../AppProvider';
import {DateTime} from '../../utilities/date-time';
import { Toast } from '../../utilities/toast';

const DoctorDetailsScreen = props => {
  const {navigation} = props;
  const doctorId = navigation.getParam('id');
  const [doctor, setDoctor] = useState({});
  const [loading, setLoading] = useState(false);
  const [reviews, setReviews] = useState([]);

  const [isFavorited, setIsFavorited] = useState();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const context = useContext(AppContext);

  const addOrRemoveFavorite = (id, isFavorited) => {
    if(isSubmitting) {
      return;
    }

    setIsSubmitting(true);
    setIsFavorited(value => !value);
    if (isFavorited) {
      FavoriteService.removeFromFavorite(id)
        .then(handleAddOrRemoveFavoriteSuccess)
        .catch(handleAddOrRemoveFavoriteError);
    } else {
      FavoriteService.addToFavorite(id)
        .then(handleAddOrRemoveFavoriteSuccess)
        .catch(handleAddOrRemoveFavoriteError);
    }
  };

  const handleAddOrRemoveFavoriteSuccess = () => {
    setIsSubmitting(false);
    context.shouldReloadFavorite.set(value => !value);
  };

  const handleAddOrRemoveFavoriteError = error => {
    setIsSubmitting(false);
    Toast.error(error.errorMessage);
  };

  const loadDoctor = id => {
    setLoading(true);
    DoctorService.getDoctor(id)
      .then(result => {
        setDoctor(result);
        setIsFavorited(result.isFavorited);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        Toast.error(error.errorMessage);
      });
  };

  const loadReviews = id => {
    DoctorService.getReviews(id, 0, 10)
      .then(result => {
        setReviews(result.items);
      })
      .catch(error => {
        Toast.error(error.errorMessage);
      });
  };

  useEffect(() => {
    loadDoctor(doctorId);
    loadReviews(doctorId);
  }, []);

  return (
    <Fragment>
      {loading ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size={40} style={{color: '#000'}} />
        </View>
      ) : (
        <View style={styles.container}>
          <View style={styles.headerContainer}>
            <Header title="Thông tin bác sĩ" color="white" navigation={navigation}/>
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
                  <Text style={styles.specialty}>
                    {doctor.specialty ? doctor.specialty.name : '...'}
                  </Text>
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
                  <Text style={styles.subText}>Giới tính</Text>
                  <Text style={styles.cardText}>
                    {doctor.gender ? 'Nam' : 'Nữ'}
                  </Text>
                </View>
                <View style={styles.divider}></View>
                <View style={styles.col}>
                  <Text style={styles.subText}>Kinh nghiệm</Text>
                  <Text style={styles.cardText}>
                    {doctor.yearExperience} năm
                  </Text>
                </View>
                <View style={styles.divider}></View>
                <View style={styles.col}>
                  <Text style={styles.subText}>Bệnh nhân</Text>
                  <Text style={styles.cardText}>{doctor.numberOfPatients}</Text>
                </View>
              </View>
              <View style={styles.rowInfo}>
                <View style={styles.buttonContainer}>
                  <Button
                    TouchableComponent={TouchableOpacity}
                    onPress={() =>
                      navigation.navigate('MakeAppointment', {doctor: doctor})
                    }
                    title="Đặt lịch"
                    type="solid"
                    titleStyle={styles.buttonText}
                    buttonStyle={styles.button}
                  />
                </View>
                <TouchableOpacity
                  style={styles.loveContainer}
                  onPress={() => addOrRemoveFavorite(doctorId, isFavorited)}>
                  <Icon
                    name="heart"
                    type="antdesign"
                    size={22}
                    iconStyle={{
                      color: isFavorited ? theme.colors.red : '#C8C7CC',
                    }}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <ScrollView style={styles.content}>
            <View>
              <Text style={styles.subText}>Địa chỉ</Text>
              <Text style={styles.body} numberOfLines={2}>
                {doctor.location ? doctor.location.address : ''}
              </Text>
              <Text style={styles.subText}>
                {doctor.distanceFromPatient} km
              </Text>
            </View>
            <Divider style={styles.horizontalDivider} />
            <View>
              <Text style={styles.subText}>Phòng khám</Text>
              <Text style={styles.body}>{doctor.clinic}</Text>
            </View>
            <Divider style={styles.horizontalDivider} />
            <View>
              <Text style={styles.subText}>Học vấn</Text>
              <Text style={styles.body}>{doctor.medicalSchool}</Text>
            </View>
            <Divider style={styles.horizontalDivider} />
            <View>
              <Text style={styles.subText}>Giới thiệu</Text>
              <Text style={styles.body}>{doctor.about}</Text>
            </View>
            <Divider style={styles.horizontalDivider} />
            <View>
              {reviews.length > 0 && (
                <Text style={styles.subText}>Đánh giá</Text>
              )}

              <View>
                {reviews.map((item, index) => (
                  <View key={index} style={styles.reviewItem}>
                    <Text style={styles.reviewText}>{item.patient.name}</Text>
                    <View style={styles.row}>
                      <Rating
                        style={styles.reviewRating}
                        imageSize={11}
                        readonly
                        startingValue={item.rating}
                      />
                      <Text style={styles.reviewDate}>
                        {DateTime.toDateString(
                          item.reviewDate,
                          'HH:mm DD/MM/YYYY',
                        )}
                      </Text>
                    </View>
                    <Text style={styles.reviewText}>{item.comment}</Text>
                  </View>
                ))}
              </View>
            </View>
          </ScrollView>
        </View>
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
    marginBottom: 20,
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
  smallAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
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
    fontSize: 16,
    fontFamily: 'SF-Pro-Text-Semibold',
  },
  subText: {
    fontSize: 13,
    fontFamily: 'SF-Pro-Text-Regular',
    color: theme.colors.gray,
    marginBottom: 4,
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
    paddingHorizontal: 15,
  },
  address: {
    backgroundColor: '#FCFCFC',
    padding: 10,
    borderRadius: 10,
  },
  body: {
    fontSize: 14,
    fontFamily: 'SF-Pro-Text-Regular',
    lineHeight: 21,
  },
  horizontalDivider: {
    marginVertical: 11,
    backgroundColor: theme.colors.lightGray,
  },
  reviewItem: {
    marginBottom: 10,
    backgroundColor: '#FDFDFC',
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 2
  },
  row: {
    flexDirection: 'row',
    // justifyContent: 'center',
    alignItems: 'center',
  },
  reviewText: {
    fontSize: 14,
    fontFamily: 'SF-Pro-Text-Regular',
    lineHeight: 22,
  },
  reviewRating: {
    justifyContent: 'center',
    marginRight: 10,
    marginVertical: 4,
  },
  reviewDate: {
    fontSize: 12,
    fontFamily: 'SF-Pro-Text-Regular',
    color: theme.colors.gray,
    alignItems: 'center',
    lineHeight: 18,
  },
});

export default DoctorDetailsScreen;
