import React, {useState, useContext} from 'react';
import {StyleSheet, View, Text, Alert} from 'react-native';
import {Rating, AirbnbRating} from 'react-native-elements';
import TextField from '../../../components/core/TextField';
import Button from '../../../components/core/Button';
import Header from '../../../components/core/Header';
import {ReviewService} from '../../../services/ReviewService';
import theme from '../../../styles/theme';
import { AppContext } from '../../../AppProvider';
import validate from '../../../common/validate';

const RatingScreen = props => {
  const {navigation} = props;
  const [starRating, setStarRating] = useState(0);
  const [comment, setComment] = useState();

  const [commentError, setCommentError] = useState();

  const context = useContext(AppContext);

  const {appointmentId, doctorId} = navigation.state.params;

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [showRatingSuccess, setShowRatingSuccess] = useState(false);

  const onSubmit = () => {
    const commentError = validate('review', comment);
    setCommentError(commentError);

    if(commentError || starRating === 0) {
      return;
    }

    setIsSubmitting(true);
    ReviewService.addReview({
      rating: starRating,
      comment: comment,
      appointmentId: appointmentId,
      doctorId: doctorId,
    })
      .then(() => {
        setIsSubmitting(false);
        setShowRatingSuccess(true);
      })
      .catch(e => {
        setIsSubmitting(false);
        console.log(e);
      });
  };

  const onSuccess = () => {
    context.shouldReloadAppointmentList.set(val => !val);
    navigation.navigate('Appointments');
  };

  return (
    <>
      <Header title="Đánh giá bác sĩ và dịch vụ" navigation={navigation}/>
      {showRatingSuccess ? (
        <View style={styles.container}>
          <Text style={styles.title}>Đánh giá thành công.</Text>
          <Text style={styles.subTitle}>Cảm ơn bạn đã sử dụng dịch vụ.</Text>
          <View style={[styles.buttonContainer, {marginTop: 30}]}>
            <Button
              title="Hoàn thành"
              primary
              loading={isSubmitting}
              onPress={() => onSuccess()}
            />
          </View>
        </View>
      ) : (
        <View style={styles.container}>
          <AirbnbRating
            count={5}
            onFinishRating={val => setStarRating(val)}
            reviews={['Rất tệ', 'Tệ', 'Trung bình', 'Tốt', 'Rất tốt']}
            defaultRating={starRating}
            size={35}
          />
          <View style={styles.inputContainer}>
            <TextField
              containerStyle={styles.input}
              multiline={true}
              numberOfLines={4}
              placeholder="Nhận xét"
              value={comment}
              error={commentError}
              onBlur={() => setCommentError(validate('review', comment))}
              onChangeText={value => setComment(value)}
              returnKeyType="done"
              secureTextEntry={true}
            />
          </View>
          <View style={styles.buttonContainer}>
            <Button
              title="Gửi đánh giá"
              primary
              loading={isSubmitting}
              onPress={() => onSubmit()}
            />
          </View>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 50,
    marginHorizontal: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    width: '100%',
    marginTop: 25,
    marginBottom: 15,
  },
  input: {
    height: 80,
  },
  buttonContainer: {
    width: '100%'
  },
  title: {
    fontSize: 28,
    fontFamily: 'SF-Pro-Display-Bold',
    marginBottom: 10,
  },
  subTitle: {
    textAlign: 'center',
    fontSize: 16,
    fontFamily: 'SF-Pro-Text-Regular',
    color: theme.colors.darkGray,
    lineHeight: 20,
    marginTop: 2,
  },
});

export default RatingScreen;
