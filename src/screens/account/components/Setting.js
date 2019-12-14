import React, {useContext, useState} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {ListItem} from 'react-native-elements';
import theme from '../../../styles/theme';
import {AppContext} from '../../../AppProvider';
import DeviceInfo from 'react-native-device-info';
import {DeviceService} from '../../../services/DeviceService';
import AsyncStorage from '@react-native-community/async-storage';

const Setting = props => {
  const {navigation} = props;
  const context = useContext(AppContext);

  const listSetting = [
    {
      title: 'Đăng xuất',
      icon: theme.tabIcons.signOut,
      onPress: async () => await logout(),
      name: 'sign-out',
      bottomDivider: false,
      switch: false,
    },
  ];

  const logout = async () => {
    const uuid = DeviceInfo.getUniqueId();
    await DeviceService.updateStatus(uuid, false);
    await AsyncStorage.removeItem('@access_token');
    navigation.navigate('Login');
  };


  return (
    <View style={styles.setting}>
      <Text style={styles.headerLabel}>Cài đặt</Text>
      <View style={styles.settingList}>
        {listSetting.map((item, i) => (
          <TouchableOpacity key={i}>
            <View style={styles.settingItem}>
              <ListItem
                key={i}
                title={item.title}
                leftIcon={{
                  type: 'font-awesome',
                  name: item.name,
                  color: theme.colors.white,
                  size: 20,
                  containerStyle: {
                    backgroundColor: theme.colors.primary,
                    width: 30,
                    height: 30,
                    justifyContent: 'center',
                    borderRadius: 6,
                  },
                }}
                onPress={item.onPress}
              />
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  setting: {
    flexDirection: 'column',
  },
  settingItem: {
    display: 'flex',
    marginTop: 5
  },
  settingList: {},
  headerLabel: {
    fontSize: 16,
    paddingLeft: 15,
    fontFamily: theme.colors.black,
    backgroundColor: theme.colors.lightGray,
    color: theme.colors.darkGray,
    lineHeight: 40,
  },
  leftIcon: {
    width: 11,
    height: 15,
  },
});

export default Setting;
