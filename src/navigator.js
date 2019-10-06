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
import {Image} from 'react-native';

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
  },
);

const AppSwitch = createSwitchNavigator(
  {
    Tab: TabNavigator,
  },
  {
    initialRouteName: 'Tab',
  },
);

export default Navigator = createAppContainer(AppSwitch);
