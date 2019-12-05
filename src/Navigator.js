import React from 'react'
import { createStackNavigator } from 'react-navigation-stack'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import theme from './styles/theme'
import { createSwitchNavigator, createAppContainer } from 'react-navigation'
import HomeScreen from './screens/home/HomeScreen'
import OrderHisToryScreen from './screens/orderhistory/OrderHisToryScreen'
import NotificationScreen from './screens/notification/NotificationScreen'
import AccountScreen from './screens/account/AccountScreen'
import OrderDetailsScreen from './screens/orderhistory/OrderDetailsScreen'
import FavoriteScreen from './screens/favorite/FavoriteScreen'
import SpecialtyScreen from './screens/specialty/SpecialtyScreen'
import LoginScreen from './screens/auth/LoginScreen'
import ClinicScreen from './screens/clinic/ClinicScreen'
import ClinicDetailsScreen from './screens/clinic/ClinicDetailsScreen'
import MakeAppointmentScreen from './screens/booking/make-appointment/MakeAppointmentScreen'
import ReviewAppointmentScreen from './screens/booking/review-appointment/ReviewAppointmentScreen'
import BookingSuccessScreen from './screens/booking/booking-success/BookingSuccessScreen'
import ListStoreScreen from './screens/doctor/StoreScreen'
import DoctorDetailsScreen from './screens/doctor/DoctorDetailsScreen'
import ChangePasswordScreen from './screens/changepassword/ChangePasswordScreen'
import InitLocationScreen from './screens/location/InitLocationScreen'
import FilterScreen from './screens/doctor/FilterScreen'
import StoreScreen from './screens/store/StoreScreen'
import PaymentScreen from './screens/store/PaymentScreen'
import { Icon } from 'react-native-elements'
import CheckoutScreen from './screens/store/CheckoutScreen'
import LocaltionPickerScreen from './screens/location/LocaltionPickerScreen'
import AsyncStorage from '@react-native-community/async-storage'
import AuthLoadingScreen from './screens/auth/AuthLoadingScreen'
import { View } from 'react-native'

const FavoriteNavigator = createStackNavigator({
  Favorite: FavoriteScreen
}, {
  headerMode: 'none'
})

const StoresNavigation = createStackNavigator({
  Stores: ListStoreScreen,
  Filter: FilterScreen
}, {
  headerMode: 'none',
  initialRouteName: 'Stores'
})

const OrderNavigator = createStackNavigator({
  Store: StoreScreen,
  Checkout: CheckoutScreen,
  ReviewOrder: PaymentScreen
}, {
  headerMode: 'none',
  initialRouteName: 'Store'
})

OrderNavigator.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }
  return {
    tabBarVisible,
  }
}

const ClinicNavigator = createStackNavigator(
  {
    Clinic: ClinicScreen,
    ClinicDetails: ClinicDetailsScreen
  },
  {
    headerMode: 'none'
  },
)

const SpecialtyNavigator = createStackNavigator(
  {
    Specialty: SpecialtyScreen,
  },
  {
    headerMode: 'none',
  },
)

const HomeNavigator = createStackNavigator(
  {
    Home: HomeScreen
  },
  {
    headerMode: 'none',
  },
)

const OrderHisToryNavigator = createStackNavigator(
  {
    OrderHisTory: OrderHisToryScreen,
    OrderDetail: OrderDetailsScreen
  },
  {
    headerMode: 'none',
  },
)

OrderHisToryNavigator.navigationOptions = ({ navigation }) => {
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
)

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
)

AccountNavigator.navigationOptions = ({ navigation }) => {
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
            name='home'
            size={30}
            color={focused ? theme.colors.primary : theme.colors.gray}
          />
        ),
      },
    },
    Notification: {
      screen: NotificationNavigator,
      navigationOptions: ({ screenProps, navigation }) => ({
        tabBarLabel: 'Notifications',
        tabBarIcon: ({ focused }) => (
          <View>
            <Icon
              type='material-community'
              name='bell'
              size={30}
              color={focused ? theme.colors.primary : theme.colors.gray}
            />
            {screenProps.notificationCount > 0 && (
              <Badge
                value={screenProps.notificationCount}
                status="error"
                containerStyle={{ position: 'absolute', top: -4, right: -13 }}
              />
            )}
          </View>
        ),
      }),
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
            color={focused ? theme.colors.primary : theme.colors.gray}
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
            color={focused ? theme.colors.primary : theme.colors.gray}
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
)

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
    Specialty: SpecialtyNavigator,
    Clinic: ClinicNavigator,
    Order: OrderNavigator,
    Stores: StoresNavigation,
    Favorite: FavoriteNavigator,
  },
  {
    headerMode: 'none',
    initialRouteName: 'Tab'
  }
)


const AppSwitch = createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    Login: LoginScreen,
    App: AppNavigator,
  },
  {
    initialRouteName: 'AuthLoading'
  }
)

export default Navigator = createAppContainer(AppSwitch);
