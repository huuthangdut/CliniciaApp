import React, { useState ,} from 'react'
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity
} from 'react-native';
import { ListItem } from 'react-native-elements'
import theme from '../../../styles/theme'

const Address = () => {
  const [addresses, setAddresses] = useState([
    {
      type: 'Home',
      address: '08 Hà Văn Tính, Liên Chiểu, Đà Nẵng',
    },
    {
      type: 'Company',
      address: '140 Nguyễn Giản Thanh ,quận Thanh Khê, Đà Nẵng'
    },
  ])

  return (
    <View style={styles.setting}>
      <Text style={styles.headerLabel}>Address</Text>
      <View style={styles.addressList}>
        {
          addresses.map((item, i) => (
            <TouchableOpacity>
              <View style={styles.addressItem}>
                <View>
                  <ListItem
                    key={i}
                    subtitle={item.address}
                    title={item.type}
                    titleStyle={{
                      fontSize: 13,
                      color: theme.colors.darkGray,
                      fontFamily: 'SF-Pro-Text-Regular',
                    }}
                    subtitleStyle={{
                      fontSize: 15,
                      fontFamily: 'SF-Pro-Text-Regular',
                      color: theme.colors.black
                    }}
                    bottomDivider
                    chevron
                  />
                </View>
              </View>
            </TouchableOpacity>
          ))
        }
        <TouchableOpacity>
          <ListItem
            key='add'
            title='Add a new address'
            titleStyle={{
              color: theme.colors.primary,
            }}
            rightIcon={{
              type: 'material',
              name: 'add-circle',
              color: theme.colors.primary
            }}
            style={{
              height: 45,
            }}
          />
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  headerLabel: {
    fontSize: 16,
    paddingLeft: 15,
    fontFamily: theme.colors.black,
    backgroundColor: theme.colors.lightGray,
    color: theme.colors.darkGray,
    lineHeight: 40
  },
  addressTypeText: {
    paddingLeft: 15,
    fontSize: 13,
    fontFamily: 'SF-Pro-Text-Regular',
    color: theme.colors.darkGray,
    paddingTop: 15,
    marginBottom:0,
  }
})

export default Address