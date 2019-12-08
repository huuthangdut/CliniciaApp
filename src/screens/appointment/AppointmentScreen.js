import React, {Fragment, useState} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {TabView, SceneMap} from 'react-native-tab-view';
import theme from '../../styles/theme';
import AppointmentList from './components/AppointmentList';
import Header from '../../components/core/Header';

const AppointmentScreen = props => {
  const [tabBarConfig, setTabBarConfig] = useState({
    index: 0,
    routes: [
      {key: 'Confirming', title: 'Chưa xác nhận'},
      {key: 'Upcoming', title: 'Đã xác nhận'},
      {key: 'Done', title: 'Hoàn thành'},
      {key: 'Cancelled', title: 'Đã huỷ'}
    ],
  });

  const handleIndexChange = index => setTabBarConfig(...tabBarConfig, index);

  const renderScene = ({route}) => {
    return <AppointmentList type={route.key} navigation={props.navigation} />
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
                onPress={() => setTabBarConfig({...tabBarConfig, index})}>
                <Text style={[{color}, styles.tabItemText]}>{route.title}</Text>
                <View
                  style={[
                    {backgroundColor: highlightColor},
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
      <Header hasBackIcon={false} hasRightMenu={true} />
      <View style={styles.container}>
        <Text style={styles.header}>Quản lý lịch hẹn</Text>
        <TabView
          lazy
          navigationState={tabBarConfig}
          renderScene={renderScene}
          renderTabBar={renderTabBar}
          onIndexChange={handleIndexChange}
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
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 28,
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
    marginRight: 15,
    paddingVertical: 9,
    alignItems: 'flex-start',
  },
  tabItemText: {
    fontSize: 15,
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
});

export default AppointmentScreen;
