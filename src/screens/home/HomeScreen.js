import React, {useState, useEffect, Fragment, useContext} from 'react';
import {StyleSheet, View, ActivityIndicator, Text} from 'react-native';

import Reminder from './components/Reminder';
import Category from './components/Category';
import {ScrollView} from 'react-native-gesture-handler';
import HomeHeader from './components/HomeHeader';
import Toolbar from './components/Toolbar';
import DoctorList from '../doctor/components/DoctorList';
import {SpecialtyService} from '../../services/SpecialtyService';
import {DoctorService} from '../../services/DoctorService';
import {AppointmentService} from '../../services/AppointmentService';
import {AppContext} from '../../AppProvider';
import {DateTime} from '../../utilities/date-time';
import { Toast } from '../../utilities/toast';

const HomeScreen = props => {
  const {navigation} = props;

  const context = useContext(AppContext);

  const [specialties, setSpecialties] = useState([]);
  const [isLoadingSpecialties, setIsLoadingSpecialities] = useState(false);

  const [doctors, setDoctors] = useState([]);
  const [isLoadingDoctors, setIsLoadingDoctors] = useState(false);

  const [sortDoctorBy, setSortDoctorBy] = useState('Distance');

  const [reminder, setReminder] = useState();
  const [isLoadingReminder, setIsLoadingReminder] = useState(false);

  const loadReminder = () => {
    setIsLoadingReminder(true);
    AppointmentService.getUpcomingAppointment()
      .then(result => {
        setIsLoadingReminder(false);
        setReminder(result);
      })
      .catch(error => {
        setIsLoadingReminder(false);
        Toast.error(error.errorMessage);
      });
  };

  const loadSpecialties = () => {
    setIsLoadingSpecialities(true);
    SpecialtyService.getSpecialties(0, 10)
      .then(result => {
        setIsLoadingSpecialities(false);
        setSpecialties(result.items);
      })
      .catch(error => {
        setIsLoadingSpecialities(false);
        Toast.error(error.errorMessage);
      });
  };

  const loadDoctors = () => {
    setIsLoadingDoctors(true);
    DoctorService.getDoctors({
      page: 0,
      pageSize: 10,
      sort: sortDoctorBy,
    })
      .then(result => {
        setDoctors(result.items);
        setIsLoadingDoctors(false);
      })
      .catch(error => {
        setIsLoadingDoctors(false);
        Toast.error(error.errorMessage);
      });
  };

  useEffect(() => {
    loadSpecialties();
  }, []);

  useEffect(() => {
    loadReminder();
  }, [context.shouldReloadReminder.get]);

  useEffect(() => {
    loadDoctors();
  }, [sortDoctorBy, context.authUser.get]);

  return (
    <Fragment>
      <HomeHeader navigation={navigation} />
      <ScrollView nestedScrollEnabled={true}>
        <View style={styles.container}>
          {isLoadingReminder ? (
            <ActivityIndicator size={30} style={{marginVertical: 5}}/>
          ) : (
            reminder && <Reminder item={reminder} navigation={navigation}/>
          )}

          <Category
            items={specialties}
            loading={isLoadingSpecialties}
            navigation={navigation}
          />
          <Toolbar
            items={doctors}
            navigation={navigation}
            sortBy={sortDoctorBy}
            onChangeSortBy={value => setSortDoctorBy(value)}
          />
          {isLoadingDoctors ? (
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 40,
              }}>
              <ActivityIndicator size={30} style={{color: '#000'}} />
            </View>
          ) : (
            <DoctorList items={doctors} navigation={navigation} showSpecialty={true}/>
          )}
        </View>
      </ScrollView>
    </Fragment>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'flex-start',
    paddingHorizontal: 15,
    paddingTop: 10,
  },
});

export default HomeScreen;
