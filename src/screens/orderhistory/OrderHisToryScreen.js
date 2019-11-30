import React, { Fragment, useState, useEffect } from 'react'
import { View, StyleSheet, Text, TouchableOpacity, ActivityIndicator } from 'react-native'
import { TabView } from 'react-native-tab-view'
import theme from '../../styles/theme'
import OrderList from './components/OrderList'
import Header from '../../components/core/Header'
import { OrderService } from '../../services/OrderService'
import WithContext from '../../components/core/WithContext'

const OrderHisToryScreen = props => {
  const { context } = props
  const { user, reloadOrderList } = context

  const [tabBarConfig, setTabBarConfig] = useState({
    index: 0,
    routes: [
      { key: 'Proccessing', title: 'Proccessing' },
      { key: 'Done', title: 'Done' },
    ],
  });
  const [listOrder, setListOrder] = useState([])
  const [isReloadList, setReloadList] = useState(reloadOrderList)

  useEffect(() => {
    getOrders()
  }, [])


  const getOrders = () => {
    OrderService.getOrdersOfUser(
      user.userId,
      res => {
        setListOrder(res.data.data.ordersOfUser)
      },
      err => {
        alert(err)
      }
    )
  }

  const handleIndexChange = index => setTabBarConfig(...tabBarConfig, index);

  const renderScene = ({ route }) => {

    switch (route.key) {
      case 'Proccessing':
        return (
          <>
            {!listOrder.length > 0 && <ActivityIndicator size={50} style={{ marginTop: 220 }} />}
            <OrderList type="Proccessing" listOrder={listOrder} navigation={props.navigation} />
          </>
        );
      case 'Done':
        return (
          <>
            {!listOrder.length > 0 && <ActivityIndicator size={50} style={{ marginTop: 220 }} />}
            <OrderList type="Proccessing" listOrder={listOrder} navigation={props.navigation} />
          </>
        );
    }
  };

  const renderTabBar = props => {
    return (
      <View style={styles.tabBarContainer}>
        <View style={styles.tabBar}>
          {props.navigationState.routes.map((route, index) => {
            const activeIndex = props.navigationState.index;
            const color =
              activeIndex === index ? theme.colors.black : theme.colors.gray;
            const highlightColor =
              activeIndex === index
                ? theme.colors.primary
                : theme.colors.lightGray;

            return (
              <TouchableOpacity
                key={index}
                activeOpacity={0.7}
                style={styles.tabItem}
                onPress={() => setTabBarConfig({ ...tabBarConfig, index })}>
                <Text style={[{ color }, styles.tabItemText]}>{route.title}</Text>
                <View
                  style={[
                    { backgroundColor: highlightColor },
                    styles.highlight,
                  ]}></View>
              </TouchableOpacity>
            );
          })}
        </View>
        <View style={styles.divider}></View>
      </View>
    );
  };

  return (
    <Fragment>
      <Header title='Order history' />
      <View style={styles.container}>
        <TabView
          lazy
          navigationState={tabBarConfig}
          renderScene={renderScene}
          renderTabBar={renderTabBar}
          onIndexChange={handleIndexChange}
          style={styles.tabStyle}
        />
      </View>
    </Fragment>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
    paddingHorizontal: 20
  },
  header: {
    fontSize: 34,
    fontFamily: 'SF-Pro-Display-Bold',
  },
  tabBarContainer: {
    flexDirection: 'column',
    marginVertical: 10,
  },
  tabBar: {
    flexDirection: 'row',
    height: 44,
  },
  tabItem: {
    paddingVertical: 5,
    flex: 1,
    alignItems: 'center'
  },
  tabItemText: {
    fontSize: 18,
    fontFamily: 'SF-Pro-Text-Regular',
  },
  highlight: {
    width: '100%',
    marginTop: 10,
    height: 2,
  },
  divider: {
    width: '100%',
    height: 1,
    marginTop: -2,
    paddingHorizontal: 5,
    backgroundColor: theme.colors.lightGray,
  },
  tabStyle: {
    flex: 1
  }
});

export default WithContext(OrderHisToryScreen);
