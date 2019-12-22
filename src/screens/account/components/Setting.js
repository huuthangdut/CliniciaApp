import React from 'react'
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity
} from 'react-native'
import { ListItem } from 'react-native-elements'
import theme from '../../../styles/theme'
import WithContext from '../../../components/core/WithContext'

const Setting = (props) => {
  const { context, navigation } = props
  const { logout, user, storeRestaurant } = context

  const listSetting = [
    {
      title: 'Sign out',
      icon: theme.tabIcons.signOut,
      onPress: () => {
        logout()
        navigation.navigate('Login')
      },
      name: 'logout',
      type: 'material-community'
    },
    {
      title: 'Change store',
      icon: theme.tabIcons.signOut,
      onPress: () => {
        logout()
        navigation.navigate('ChooseStore', {userId: user.userId})
        storeRestaurant('')
      },
      name: 'store',
      type: 'material-community'
    },
  ]

  return (
    <View style={styles.setting}>
      <View style={styles.settingList}>
        {
          listSetting.map((item, i) => (
            <TouchableOpacity>
              <View style={styles.settingItem}>
                <View>
                  <ListItem
                    key={i.toString()}
                    title={item.title}
                    chevron
                    leftIcon={{
                      type: 'material-community',
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
                    containerStyle={{backgroundColor: theme.colors.lightGray, borderRadius:10}}
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
    flexDirection: 'column',
    marginHorizontal: 10,
    marginVertical: 15
  },
  settingItem: {
    display: 'flex',
    marginBottom: 10,
  },
  settingList: {

  },
  headerLabel: {
    fontSize: 16,
    paddingLeft: 15,
    fontFamily: theme.colors.black,
    backgroundColor: theme.colors.lightGray,
    color: theme.colors.darkGray,
    lineHeight: 40,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10
  },
  leftIcon: {
    width: 11,
    height: 15,
  }
})

export default WithContext(Setting)