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
import ListStoreScreen from './screens/doctor/StoreScreen'
import ChangePasswordScreen from './screens/changepassword/ChangePasswordScreen'
import FilterScreen from './screens/doctor/FilterScreen'
import StoreScreen from './screens/store/StoreScreen'
import PaymentScreen from './screens/store/PaymentScreen'
import { Icon } from 'react-native-elements'
import CheckoutScreen from './screens/store/CheckoutScreen'
import LocaltionPickerScreen from './screens/location/LocaltionPickerScreen'
import AsyncStorage from '@react-native-community/async-storage'
import AuthLoadingScreen from './screens/auth/AuthLoadingScreen'
import ChooseStoreScreen from './screens/choosestore/ChooseStoreScreen'
import CreateStoreScreen from './screens/choosestore/CreateStoreScreen'
import MenuManagementScreen from './screens/menu/MenuManagement'

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

const SpecialtyNavigator = createStackNavigator(
  {
    Specialty: SpecialtyScreen,
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

const ManageStoreNavigator = createStackNavigator(
  {
    ChooseStore: ChooseStoreScreen,
    CreateStore: CreateStoreScreen,
  },
  {
    headerMode: 'none',
    initialRouteName: 'ChooseStore'
  }
)

const ManageMenuNavigator = createStackNavigator(
  {
    MenuManagement: MenuManagementScreen,
  },
  {
    headerMode: 'none',
    initialRouteName: 'MenuManagement'
  }
)

const TabNavigator = createBottomTabNavigator(
  {
    Order: {
      screen: OrderHisToryNavigator,
      navigationOptions: {
        tabBarLabel: 'Order',
        tabBarIcon: ({ focused }) => (
          <Icon
            type='material-community'
            name='receipt'
            size={30}
            color={focused ? theme.colors.primary : theme.colors.gray}
          />
        ),
      },
    },
    Menu: {
      screen: ManageMenuNavigator,
      navigationOptions: {
        tabBarLabel: 'Menu',
        tabBarIcon: ({ focused }) => (
          <Icon
            type='material-community'
            name='silverware'
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
    initialRouteName: 'Order'
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
    ManageStore: ManageStoreNavigator,
    App: AppNavigator,
  },
  {
    initialRouteName: 'AuthLoading'
  }
)

export default Navigator = createAppContainer(AppSwitch);
