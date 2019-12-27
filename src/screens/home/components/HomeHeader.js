import React, {useContext} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Icon, Image} from 'react-native-elements';
import theme from '../../../styles/theme';
import {AppContext} from '../../../AppProvider';

const HomeHeader = props => {
  const context = useContext(AppContext);
  const authUser = context.authUser.get;
  const {navigation} = props;

  return (
    <View style={styles.header}>
      <TouchableOpacity style={styles.location} onPress={() => navigation.navigate('ResetLocation', {shouldGoBack: true})}>
        <View style={styles.iconContainer}>
          <Image
            style={{width: 22, height: 24}}
            source={theme.icons.mapMarker}
            resizeMode="contain"
          />
        </View>
        <View style={styles.headerTextContainer}>
          <Text style={styles.yourLocation}>Địa chỉ của bạn</Text>
          <Text numberOfLines={2} style={styles.locationText}>{authUser ? authUser.address : null}</Text>
        </View>
      </TouchableOpacity>
      {/* <View style={{flex: 1}}></View>
      <TouchableOpacity style={styles.search}>
        <Icon name="search" type="feather" size={20} />
      </TouchableOpacity> */}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 60,
    marginTop: 2,
    marginBottom: 5,
    marginHorizontal: 15,
    flexDirection: 'row'
  },
  location: {
    flexDirection: 'row',
    flex: 1
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  headerTextContainer: {
    justifyContent: 'center',
    flex: 1
  },
  yourLocation: {
    fontSize: 11,
    fontFamily: 'SF-Pro-Text-Regular',
    color: theme.colors.darkGray,
  },
  locationText: {
    fontSize: 12.5,
    lineHeight: 17,
    fontFamily: 'SF-Pro-Text-Semibold',
  },
  search: {
    width: 30,
    justifyContent: 'center',
  },
});

export default HomeHeader;
