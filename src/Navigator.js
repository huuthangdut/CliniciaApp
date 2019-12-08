import React, { useContext } from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {Avatar, Badge, Icon, withBadge} from 'react-native-elements';
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
import {Image, View} from 'react-native';
import ClinicScreen from './screens/clinic/ClinicScreen';
import ClinicDetailsScreen from './screens/clinic/ClinicDetailsScreen';
import MakeAppointmentScreen from './screens/booking/make-appointment/MakeAppointmentScreen';
import ReviewAppointmentScreen from './screens/booking/review-appointment/ReviewAppointmentScreen';
import BookingSuccessScreen from './screens/booking/booking-success/BookingSuccessScreen';
import DoctorScreen from './screens/doctor/DoctorScreen';
import DoctorDetailsScreen from './screens/doctor/DoctorDetailsScreen';
import ChangePasswordScreen from './screens/changepassword/ChangePasswordScreen';
import InitLocationScreen from './screens/location/InitLocationScreen';
import FilterScreen from './screens/doctor/FilterScreen';
import AuthLoadingScreen from './screens/auth/AuthLoadingScreen';
import RegisterScreen from './screens/auth/RegisterScreen';
import VerifyScreen from './screens/auth/VerifyScreen';
import LocationPickerScreen from './screens/location/LocationPickerScreen';
import DoctorMap from './screens/doctor/components/DoctorMap';
import AsyncStorage from '@react-native-community/async-storage';
import CheckingServiceScreen from './screens/checking-service/CheckingServiceScreen';
import WorkingScheduleScreen from './screens/working-schedule/WorkingScheduleScreen';
import AddCheckingServiceScreen from './screens/checking-service/AddCheckingServiceScreen';
import UpdateCheckingServiceScreen from './screens/checking-service/UpdateCheckingServiceScreen';

const FavoriteNavigator = createStackNavigator(
  {
    Favorite: FavoriteScreen,
  },
  {
    headerMode: 'none',
  },
);

const DoctorNavigator = createStackNavigator(
  {
    Doctor: DoctorScreen,
    DoctorDetails: DoctorDetailsScreen,
    Filter: FilterScreen,
  },
  {
    headerMode: 'none',
    initialRouteName: 'Doctor',
  },
);

const BookingNavigator = createStackNavigator(
  {
    MakeAppointment: MakeAppointmentScreen,
    ReviewAppointment: ReviewAppointmentScreen,
    BookingSuccess: BookingSuccessScreen,
  },
  {
    headerMode: 'none',
  },
);

const ClinicNavigator = createStackNavigator(
  {
    Clinic: ClinicScreen,
    ClinicDetails: ClinicDetailsScreen,
  },
  {
    headerMode: 'none',
  },
);

const SpecialtyNavigator = createStackNavigator(
  {
    Specialty: SpecialtyScreen,
  },
  {
    headerMode: 'none',
  },
);

const HomeNavigator = createStackNavigator(
  {
    Home: HomeScreen,
    DoctorMap: DoctorMap,
  },
  {
    headerMode: 'none',
    initialRouteName: 'Home',
  },
);

HomeNavigator.navigationOptions = ({navigation}) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }
  return {
    tabBarVisible,
  };
};

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

const CheckingServiceNavigator = createStackNavigator({
  CheckingService: CheckingServiceScreen,
  AddCheckingService: AddCheckingServiceScreen,
  UpdateCheckingService: UpdateCheckingServiceScreen
}, {
  headerMode: 'none'
});

const AccountNavigator = createStackNavigator(
  {
    Account: AccountScreen,
    CheckingService: CheckingServiceNavigator,
    WorkingSchedule: WorkingScheduleScreen,
  },
  {
    headerMode: 'none',
  },
);

const TabNavigator = createBottomTabNavigator(
  {
    Appointment: {
      screen: AppointmentNavigator,
      navigationOptions: ({screenProps, navigation}) => ({
        tabBarLabel: 'Lịch hẹn',
        tabBarIcon: ({focused}) => (
          <View>
            <Image
              style={{width: 24, height: 24}}
              source={
                focused
                ? theme.tabIcons.appointmentFocus
                : theme.tabIcons.appointment
              }
            />
            {screenProps.notificationCount > 0 && (
              <Badge
                value={screenProps.notificationCount}
                status="error"
                containerStyle={{position: 'absolute', top: -4, right: -13}}
              />
            )}
          </View>
        ),
      }),
    },
    Account: {
      screen: AccountNavigator,
      navigationOptions: {
        tabBarLabel: 'Tài khoản',
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
    initialRouteName: 'Appointment',
  },
);

TabNavigator.navigationOptions = ({screenProps, navigation}) => {
  const {setNotificationCount, notificationCount} = screenProps;

  if(navigation.state.index === 2) {
    setNotificationCount(0);
  }

  AsyncStorage.setItem('@notification_count', notificationCount + '');

  return {
    tabBarVisible: true
  };
};


const AppNavigator = createStackNavigator(
  {
    Tab: TabNavigator,
    InitLocation: InitLocationScreen,
    SetLocation: LocationPickerScreen,
    Specialty: SpecialtyNavigator,
    Clinic: ClinicNavigator,
    Booking: BookingNavigator,
    Doctor: DoctorNavigator,
    Favorite: FavoriteNavigator,
  },
  {
    headerMode: 'none',
    initialRouteName: 'Tab',
  },
);

const AuthNavigator = createStackNavigator(
  {
    Login: LoginScreen,
    Register: RegisterScreen,
    Verify: VerifyScreen,
  },
  {
    headerMode: 'none',
    initialRouteName: 'Login',
  },
);

const AppSwitch = createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: AppNavigator,
    Auth: AuthNavigator,
  },
  {
    initialRouteName: 'AuthLoading',
  },
);

export default Navigator = createAppContainer(AppSwitch);
