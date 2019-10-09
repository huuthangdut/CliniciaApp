import React, {useState} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {TabView, SceneMap} from 'react-native-tab-view';
import theme from '../../styles/theme';
import AppointmentList from './components/AppointmentList';

const AppointmentScreen = props => {
  const [tabBarConfig, setTabBarConfig] = useState({
    index: 0,
    routes: [
      {key: 'Upcoming', title: 'Upcoming'},
      {key: 'Previous', title: 'Previous'},
    ],
  });

  const handleIndexChange = index => setTabBarConfig(...tabBarConfig, index);

  const renderScene = ({ route }) => {
    switch (route.key) {
      case 'Upcoming':
        return <AppointmentList type="Upcoming" navigation={props.navigation}/>;
      case 'Previous':
        return <AppointmentList type="Previous" navigation={props.navigation}/>;
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
    <View style={styles.container}>
      <Text style={styles.header}>Appointments</Text>
      <TabView
        lazy
        navigationState={tabBarConfig}
        renderScene={renderScene}
        renderTabBar={renderTabBar}
        onIndexChange={handleIndexChange}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingTop: 5,
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
    marginRight: 20,
    paddingVertical: 5,
    alignItems: 'flex-start',
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
});

export default AppointmentScreen;
