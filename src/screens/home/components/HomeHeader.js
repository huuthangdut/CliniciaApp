import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Icon, Image} from 'react-native-elements';
import theme from '../../../styles/theme';

const HomeHeader = props => {
  return (
    <View style={styles.header}>
      <TouchableOpacity style={styles.location}>
        <View style={styles.iconContainer}>
          <Image
            style={{width: 15, height: 19}}
            source={theme.icons.mapMarker}
            resizeMode="contain"
          />
        </View>
        <View style={styles.headerTextContainer}>
          <Text style={styles.yourLocation}>Your Location</Text>
          <Text style={styles.locationText}>Da Nang</Text>
        </View>
      </TouchableOpacity>
      <View style={{flex: 1}}></View>
      <TouchableOpacity style={styles.search}>
        <Icon name="search" type="feather" size={20} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 55,
    marginBottom: 5,
    paddingHorizontal: 15,
    flexDirection: 'row',
  },
  location: {
    flexDirection: 'row',
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  headerTextContainer: {
    justifyContent: 'center',
  },
  yourLocation: {
    fontSize: 11,
    fontFamily: 'SF-Pro-Text-Regular',
    color: theme.colors.darkGray,
  },
  locationText: {
    fontSize: 13,
    fontFamily: 'SF-Pro-Text-Semibold',
  },
  search: {
    width: 30,
    justifyContent: 'center',
  },
});

export default HomeHeader;
