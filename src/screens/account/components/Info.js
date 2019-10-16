import React, { useState } from 'react'
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';
import { Avatar } from 'react-native-elements'
import theme from '../../../styles/theme'

const Info = (props) => {
  return (
    <View style={styles.info}>
      <View style={styles.infoAvatar}>
        <Avatar
          rounded
          size={86}
          title="HP"
          showEditButton
        />
      </View>
      <View style={styles.infoText}>
        <Text style={styles.infoTextName}>Trần Hữu Phúc</Text>
        <Text style={styles.infoTextMail}>contact.huuphuc75@gmail.com</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  info: {
    backgroundColor: '#F9F9F9',
    flexDirection: 'row',
    paddingVertical: 20,
    paddingHorizontal: 15
  },
  avatar: {
    paddingLeft: 16,
  },
  infoText: {
    marginTop: 17,
    marginLeft: 16,
  },
  infoTextName: {
    fontSize: 24,
    color: theme.colors.black,
    fontFamily: 'SF-Pro-Display-Bold'
  },
  infoTextMail: {
    fontSize: 15,
    color: theme.colors.darkGray,
    fontFamily: 'SF-Pro-Text-Regular'
  }
})

export default Info
