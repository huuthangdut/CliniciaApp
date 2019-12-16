import React, { useState, useEffect, } from 'react'
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity
} from 'react-native';
import { ListItem } from 'react-native-elements'
import theme from '../../../styles/theme'
import WithContext from '../../../components/core/WithContext'

const StoreName = props => {
  const { context } = props
  const { choosenRestaurant } = context

  return (
    <View style={styles.setting}>
      <Text style={styles.headerLabel}>Store Name</Text>
      <View style={styles.addressList}>
        <TouchableOpacity>
          <View style={styles.addressItem}>
            <ListItem
              key={choosenRestaurant._id}
              title={choosenRestaurant.name}
              titleProps={{
                numberOfLines: 1
              }}
              containerStyle={styles.items}
            />
          </View>
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
    backgroundColor: theme.colors.favorite.backgroundGray,
    color: theme.colors.darkGray,
    lineHeight: 40,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10
  },
  addressTypeText: {
    paddingLeft: 15,
    fontSize: 13,
    fontFamily: 'SF-Pro-Text-Regular',
    color: theme.colors.darkGray,
    paddingTop: 15,
  },
  setting: {
    marginHorizontal: 10,
    marginTop: 15,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10
  },
  items: {
    backgroundColor: theme.colors.lightGray,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10
  }
})

export default WithContext(StoreName)