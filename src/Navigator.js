import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import theme from './styles/theme';
import {createSwitchNavigator, createAppContainer} from 'react-navigation';
import HomeScreen from './screens/home/HomeScreen';
import AppointmentScreen from './screens/appointment/AppointmentScreen';
import NotificationScreen from './screens/notification/NotificationScreen';
import AccountScreen from './screens/account/AccountScreen';
import AppointmentDetailsScreen from './screens/appointment/AppointmentDetailsScreen';
import FavoriteScreen from './screens/favorite/FavoriteScreen';
import SpecialtyScreen from './screens/specialty/SpecialtyScreen';
import LoginScreen from './screens/auth/LoginScreen';
import {Image} from 'react-native';
import ClinicScreen from './screens/clinic/ClinicScreen';
import ClinicDetailsScreen from './screens/clinic/ClinicDetailsScreen';
import MakeAppointmentScreen from './screens/booking/make-appointment/MakeAppointmentScreen';
import ReviewAppointmentScreen from './screens/booking/review-appointment/ReviewAppointmentScreen';
import BookingSuccessScreen from './screens/booking/booking-success/BookingSuccessScreen';
import DoctorScreen from './screens/doctor/DoctorScreen';
import DoctorDetailsScreen from './screens/doctor/DoctorDetailsScreen';
import AppointmentDetailsScreen from './screens/appointment/AppointmentDetailsScreen';
import ChangePasswordScreen from './screens/changepassword/ChangePasswordScreen';

const DoctorNavigator = createStackNavigator({
  Doctor: DoctorScreen,
  DoctorDetails: DoctorDetailsScreen
}, {
  headerMode: 'none',
  initialRouteName: 'Doctor'
});

const BookingNavigator = createStackNavigator({
  MakeAppointment: MakeAppointmentScreen,
  ReviewAppointment: ReviewAppointmentScreen,
  BookingSuccess: BookingSuccessScreen,
}, {
  headerMode: 'none'
});

const ClinicNavigator = createStackNavigator(
  {
    Clinic: ClinicScreen,
    ClinicDetails: ClinicDetailsScreen,
  },
  {
    headerMode: 'none'
  },
);

const SpecialtyNavigator = createStackNavigator(
  {
    Specialty: SpecialtyScreen,
  },
  {
    headerMode: 'none'
  },
);

const HomeNavigator = createStackNavigator(
  {
    Home: HomeScreen,
    Specialty: SpecialtyScreen,
  },
  {
    headerMode: 'none',
  },
);

const AppointmentNavigator = createStackNavigator(
  {
    Appointments: AppointmentScreen,
    AppointmentDetails: AppointmentDetailsScreen,
  },
  {
    headerMode: 'none',
  },
);

const NotificationNavigator = createStackNavigator(
  {
    Notification: NotificationScreen,
  },
  {
    headerMode: 'none',
  },
);

const AccountNavigator = createStackNavigator(
  {
    Account: AccountScreen,
    Favorite: FavoriteScreen,
    ChangePassword: ChangePasswordScreen
  },
  {
    headerMode: 'none',
  },
);

const TabNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: HomeNavigator,
      navigationOptions: {
        tabBarLabel: 'Browser',
        tabBarIcon: ({focused}) => (
          <Image
            style={{width: 24, height: 24}}
            source={
              focused ? theme.tabIcons.searchFocus : theme.tabIcons.search
            }
          />
        ),
      },
    },
    Appointment: {
      screen: AppointmentNavigator,
      navigationOptions: {
        tabBarLabel: 'Appointments',
        tabBarIcon: ({focused}) => (
          <Image
            style={{width: 24, height: 24}}
            source={
              focused
                ? theme.tabIcons.appointmentFocus
                : theme.tabIcons.appointment
            }
          />
        ),
      },
    },
    Notification: {
      screen: NotificationNavigator,
      navigationOptions: {
        tabBarLabel: 'Notifications',
        tabBarIcon: ({focused}) => (
          <Image
            style={{width: 24, height: 24}}
            source={
              focused
                ? theme.tabIcons.notificationFocus
                : theme.tabIcons.notification
            }
          />
        ),
      },
    },
    Account: {
      screen: AccountNavigator,
      navigationOptions: {
        tabBarLabel: 'Account',
        tabBarIcon: ({focused}) => (
          <Image
            style={{width: 24, height: 24}}
            source={
              focused ? theme.tabIcons.accountFocus : theme.tabIcons.account
            }
          />
        ),
      },
    },
  },
  {
    tabBarOptions: {
      activeTintColor: theme.colors.primary,
      inactiveTintColor: theme.colors.gray,
    },
    initialRouteName: 'Home',
  },
);

const AppNavigator = createStackNavigator(
  {
    Tab: TabNavigator,
    Specialty: SpecialtyNavigator,
    Clinic: ClinicNavigator,
    Booking: BookingNavigator,
    Doctor: DoctorNavigator
  },
  {
    headerMode: 'none',
    initialRouteName: 'Tab',
  },
);

const AppSwitch = createSwitchNavigator(
  {
    Login: LoginScreen,
    App: AppNavigator,
  },
  {
    initialRouteName: 'App',
  },
);

export default Navigator = createAppContainer(AppSwitch);