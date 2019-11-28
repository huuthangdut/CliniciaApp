import React from 'react'
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity
} from 'react-native'
import { ListItem } from 'react-native-elements'
import theme from '../../../styles/theme'
import WithContext from '../../../AppProvider'

const Setting = (props) => {
  const listSetting = [
    {
      title: 'Change Password',
      icon: theme.tabIcons.lock,
      onPress: () => props.navigation.navigate('ChangePassword'),
      name: 'lock'
    },
    {
      title: 'Notifications',
      icon: theme.tabIcons.notificationSetting,
      name: 'bell'
    },
    {
      title: 'Sign Out',
      icon: theme.tabIcons.signOut,
      onPress: () => {

      },
      name: 'sign-out'
    },
  ]

  return (
    <View style={styles.setting}>
      <Text style={styles.headerLabel}>Settings</Text>
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
                        borderRadius: 6
                      }
                    }}
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
    fontSize: 16,
    paddingLeft: 15,
    fontFamily: theme.colors.black,
    backgroundColor: theme.colors.lightGray,
    color: theme.colors.darkGray,
    lineHeight: 40
  },
  leftIcon: {
    width: 11,
    height: 15,
  }
})

export default Setting