import React, {Fragment, useState, useRef, useContext} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import theme from '../../styles/theme';
import Header from '../../components/core/Header';
import CheckingServiceList from './components/CheckingServiceList';
import {Icon} from 'react-native-elements';
import TextField from '../../components/core/TextField';
import Button from '../../components/core/Button';
import { AppContext } from '../../AppProvider';
import { DoctorService } from '../../services/DoctorService';
import validate from '../../common/validate';
import { Toast } from '../../utilities/toast';

const UpdateCheckingServiceScreen = props => {
  const {navigation} = props;
  const context = useContext(AppContext);

  const checkingService = navigation.getParam('checkingService');

  const serviceDescriptionRef = useRef();
  const serviceDurationRef = useRef();
  const servicePriceRef = useRef();

  const [serviceName, setServiceName] = useState(checkingService.name);
  const [serviceNameError, setServiceNameError] = useState();
  const [serviceDescription, setServiceDescription] = useState(checkingService.description);
  const [serviceDuration, setServiceDuration] = useState(checkingService.durationInMinutes);
  const [serviceDurationError, setServiceDurationError] = useState();
  const [servicePrice, setServicePrice] = useState(checkingService.price);
  const [servicePriceError, setServicePriceError] = useState();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const focusServiceDescription = () => serviceDescriptionRef.current.focus();
  const focusServiceDuration = () => serviceDurationRef.current.focus();
  const focusServicePrice = () => servicePriceRef.current.focus();

  const updateCheckingService = () => {
    const serviceNameError = validate('checkingServiceName', serviceName);
    const serviceDurationError = validate('checkingServiceDuration', serviceDuration);
    const servicePriceError = validate('checkingServicePrice', servicePrice);
    setServiceNameError(serviceNameError);
    setServiceDurationError(serviceDurationError);
    setServicePriceError(servicePriceError);

    if(serviceNameError || serviceDurationError || servicePriceError) {
      return;
    }

    setIsSubmitting(true);
    DoctorService.updateCheckingService({
        id: checkingService.id,
        name: serviceName,
        description: serviceDescription,
        durationInMinutes: serviceDuration,
        price: servicePrice,
    }).then(() => {
        setIsSubmitting(false);
        context.shouldReloadCheckingService.set(value => !value);
        navigation.navigate('CheckingService');
    }).catch((error) => {
        setIsSubmitting(false);
        Toast.error(error.errorMessage);
    });
  };


  return (
    <Fragment>
      <Header hasBackIcon={true} navigation={navigation}/>
      <View style={styles.container}>
        <Text style={styles.header}>Chỉnh sửa dịch vụ khám</Text>
        <View style={styles.form}>
          <TextField
           placeholder="Tên dịch vụ"
           keyboardType="default"
           onChangeText={value => setServiceName(value)}
           onBlur={() => setServiceNameError(validate('checkingServiceName', serviceName))}
           error={serviceNameError}
           value={serviceName}
           onSubmitEditing={focusServiceDescription}
           returnKeyType="next"
          />
          <TextField
            ref={serviceDescriptionRef}
            placeholder="Mô tả"
            value={serviceDescription}
            onChangeText={value => setServiceDescription(value)}
            onSubmitEditing={focusServiceDuration}
            value={serviceDescription}
            returnKeyType="next"
          />
          <TextField
            ref={serviceDurationRef}
            value={`${serviceDuration}`}
            keyboardType="number-pad"
            placeholder="Thời gian (phút)"
            onChangeText={value => setServiceDuration(value)}
            onBlur={() => setServiceDurationError(validate('checkingServiceDuration', serviceDuration))}
            error={serviceDurationError}
            onSubmitEditing={focusServicePrice}
            returnKeyType="next"
          />
          <TextField
            ref={servicePriceRef}
            value={`${servicePrice}`}
            keyboardType="decimal-pad"
            placeholder="Giá dịch vụ"
            onChangeText={value => setServicePrice(value)}
            onBlur={() => setServicePriceError(validate('checkingServicePrice', servicePrice))}
            error={servicePriceError}
            returnKeyType="done"
          />
          <View
            style={{
              ...styles.row,
              marginBottom: 16,
            }}>
          </View>
          <Button
            title="Lưu"
            primary
            onPress={updateCheckingService}
            loading={isSubmitting}
          />
        </View>
      </View>
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
    marginBottom: 10
  },
  form: {
      marginVertical: 15
  }
});

export default UpdateCheckingServiceScreen;
