import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import theme from './styles/theme';
import {createSwitchNavigator, createAppContainer} from 'react-navigation';
import HomeScreen from './screens/home/HomeScreen';
import AppointmentScreen from './screens/appointment/AppointmentScreen';
import NotificationScreen from './screens/notification/NotificationScreen';
import AccountScreen from './screens/account/AccountScreen';
import SpecialtyScreen from './screens/specialty/SpecialtyScreen';
import LoginScreen from './screens/auth/LoginScreen';
import {Image} from 'react-native';
import ClinicScreen from './screens/clinic/ClinicScreen';

const ClinicNavigator = createStackNavigator({
  Clinic: ClinicScreen
}, {
  // headerMode: 'none'
});

const SpecialtyNavigator = createStackNavigator({
  Specialty: SpecialtyScreen
}, {
  // headerMode: 'none'
});

const HomeNavigator = createStackNavigator(
  {
    Home: HomeScreen,
  },
  {
    // headerMode: 'none',
  },
);

const AppointmentNavigator = createStackNavigator(
  {
    Appointments: AppointmentScreen,
  },
  {
    // headerMode: 'none',
  },
);

const NotificationNavigator = createStackNavigator(
  {
    Notification: NotificationScreen,
  },
  {
    // headerMode: 'none',
  },
);

const AccountNavigator = createStackNavigator(
  {
    Account: AccountScreen,
  },
  {
    // headerMode: 'none',
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
    initialRouteName: 'Home'
  },
);

const AppNavigator = createStackNavigator({
  Tab: TabNavigator,
  Specialty: SpecialtyNavigator,
  // Clinic: ClinicNavigator
}, {
  headerMode: 'none',
  initialRouteName: 'Tab'
})

const AppSwitch = createSwitchNavigator({
  Login: LoginScreen,
  App: AppNavigator
}, {
  initialRouteName: 'App'
});

export default Navigator = createAppContainer(AppSwitch);
