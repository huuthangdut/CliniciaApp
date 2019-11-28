import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import theme from './styles/theme';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import HomeScreen from './screens/home/HomeScreen';
import OrderHisToryScreen from './screens/orderhistory/OrderHisToryScreen';
import NotificationScreen from './screens/notification/NotificationScreen';
import AccountScreen from './screens/account/AccountScreen';
import AppointmentDetailsScreen from './screens/orderhistory/AppointmentDetailsScreen';
import FavoriteScreen from './screens/favorite/FavoriteScreen';
import SpecialtyScreen from './screens/specialty/SpecialtyScreen';
import LoginScreen from './screens/auth/LoginScreen';
import ClinicScreen from './screens/clinic/ClinicScreen';
import ClinicDetailsScreen from './screens/clinic/ClinicDetailsScreen';
import MakeAppointmentScreen from './screens/booking/make-appointment/MakeAppointmentScreen';
import ReviewAppointmentScreen from './screens/booking/review-appointment/ReviewAppointmentScreen';
import BookingSuccessScreen from './screens/booking/booking-success/BookingSuccessScreen';
import ListStoreScreen from './screens/doctor/StoreScreen';
import DoctorDetailsScreen from './screens/doctor/DoctorDetailsScreen';
import ChangePasswordScreen from './screens/changepassword/ChangePasswordScreen';
import InitLocationScreen from './screens/location/InitLocationScreen'
import FilterScreen from './screens/doctor/FilterScreen'
import StoreScreen from './screens/store/StoreScreen'
import ReviewOrderScreen from './screens/store/ReviewOrderScreen'
import { Icon } from 'react-native-elements';
import CheckoutScreen from './screens/store/CheckoutScreen'
import LocaltionPickerScreen from './screens/location/LocaltionPickerScreen'
import AsyncStorage from '@react-native-community/async-storage';

const FavoriteNavigator = createStackNavigator({
  Favorite: FavoriteScreen
}, {
  headerMode: 'none'
})

const DoctorNavigator = createStackNavigator({
  Stores: ListStoreScreen,
  Filter: FilterScreen
}, {
  headerMode: 'none',
  initialRouteName: 'Stores'
});

const OrderNavigator = createStackNavigator({
  Store: StoreScreen,
  Checkout: CheckoutScreen,
  ReviewOrder: ReviewOrderScreen
}, {
  headerMode: 'none',
  initialRouteName: 'Store'
})

OrderNavigator.navigationOptions = ({navigation}) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }
  return {
    tabBarVisible,
  }; 
}

// const BookingNavigator = createStackNavigator({
//   MakeAppointment: MakeAppointmentScreen,
//   ReviewAppointment: ReviewAppointmentScreen,
//   BookingSuccess: BookingSuccessScreen,
// }, {
//   headerMode: 'none'
// });

const ClinicNavigator = createStackNavigator(
  {
    Clinic: ClinicScreen,
    ClinicDetails: ClinicDetailsScreen
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
    headerMode: 'none',
  },
  
);

const HomeNavigator = createStackNavigator(
  {
    Home: HomeScreen
  },
  {
    headerMode: 'none',
  },
);

const OrderHisToryNavigator = createStackNavigator(
  {
    OrderHisTory: OrderHisToryScreen,
    AppointmentDetails: AppointmentDetailsScreen
  },
  {
    headerMode: 'none',
  },
);

OrderHisToryNavigator.navigationOptions = ({navigation}) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }
  return {
    tabBarVisible
  }
}

const NotificationNavigator = createStackNavigator(
  {
    Notification: NotificationScreen
  },
  {
    headerMode: 'none',
  },
);

const AccountNavigator = createStackNavigator(
  {
    Account: AccountScreen,
    LocationPicker: {
      screen: LocaltionPickerScreen,
    },
    ChangePassword: ChangePasswordScreen,

  },
  {
    headerMode: 'none',
    initialRouteName: 'Account'
  }
);

AccountNavigator.navigationOptions = ({navigation}) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }
  return {
    tabBarVisible
  }
}

const TabNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: HomeNavigator,
      navigationOptions: {
        tabBarLabel: 'Browser',
        tabBarIcon: ({ focused }) => (
          <Icon
            type='material-community'
            name='home-heart'
            size={30}
            color={focused ? theme.colors.primary : theme.colors.darkGray}
          />
        ),
      },
    },
    Appointment: {
      screen: OrderHisToryNavigator,
      navigationOptions: {
        tabBarLabel: 'History',
        tabBarIcon: ({ focused }) => (
          <Icon
            type='material-community'
            name='history'
            size={30}
            color={focused ? theme.colors.primary : theme.colors.darkGray}
          />
        ),
      },
    },
    Notification: {
      screen: NotificationNavigator,
      navigationOptions: {
        tabBarLabel: 'Notifications',
        tabBarIcon: ({ focused }) => (
          <Icon
            type='material-community'
            name='bell'
            size={30}
            color={focused ? theme.colors.primary : theme.colors.darkGray}
          />
        ),
      },
    },
    Account: {
      screen: AccountNavigator,
      navigationOptions: {
        tabBarLabel: 'Account',
        tabBarIcon: ({ focused }) => (
          <Icon
            type='material-community'
            name='account'
            size={30}
            color={focused ? theme.colors.primary : theme.colors.darkGray}
          />
        ),
      },
    },
  },
  {
    tabBarOptions: {
      activeTintColor: theme.colors.primary,
      inactiveTintColor: theme.colors.gray
    },
    initialRouteName: 'Home'
  }
);

const AppNavigator = createStackNavigator(
  {
    Tab: TabNavigator,
    Specialty: SpecialtyNavigator,
    Clinic: ClinicNavigator,
    Order: OrderNavigator,
    Doctor: DoctorNavigator,
    Favorite: FavoriteNavigator,
  },
  {
    headerMode: 'none',
    initialRouteName: 'Tab'
  }
);


const AppSwitch = createSwitchNavigator(
  {
    Login: LoginScreen,
    App: AppNavigator,
  },
  {
    initialRouteName: isSignedIn ? 'App' : 'Login'
  }
);

const isSignedIn = AsyncStorage.getItem('@access_token')

export default Navigator = createAppContainer(AppSwitch);
