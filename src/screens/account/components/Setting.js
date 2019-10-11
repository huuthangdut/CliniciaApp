import React, { useState, useEffect } from 'react'
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native'
import { ListItem } from 'react-native-elements'
import theme from '../../../styles/theme'

const Setting = (props) => {
  const listSetting = [
    {
      title: 'Change Password',
      icon: theme.tabIcons.lock,
      onPress: () => props.navigation.navigate('ChangePassword'),
    },
    {
      title: 'Notifications',
      icon: theme.tabIcons.notificationSetting
    },
    {
      title: 'Sign Out',
      icon: theme.tabIcons.signOut
    },
  ]

  return (
    <View style={styles.setting}>
      <Text style={styles.headerLabel}>Setting</Text>
      <View style={styles.settingList}>
        {
          listSetting.map((item, i) => (
            <TouchableOpacity>
              <View style={styles.settingItem}>
                <View>
                  <ListItem
                    key={i}
                    title={item.title}
                    bottomDivider
                    chevron
                    leftElement={
                      <View style={styles.leftIconContainer}>
                        <Image style={styles.leftIcon} source={item.icon} />
                      </View>
                    }
                    onPress={item.onPress}
                  />
                </View>
              </View>
            </TouchableOpacity>
          ))
        }
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  setting: {
    flexDirection: 'column'
  },
  settingItem: {
    display: 'flex',
  },
  settingList: {
  },
  headerLabel: {
    paddingLeft: 10,
    fontSize: 16,
    fontFamily: theme.colors.black,
    backgroundColor: theme.colors.lightGray,
    color: theme.colors.darkGray,
    lineHeight: 40
  },
  leftIconContainer: {
    width: 29,
    height: 29,
    backgroundColor: theme.colors.primary,
    borderRadius: 6,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  leftIcon: {
    width: 11,
    height: 15,
  }
})

export default Setting