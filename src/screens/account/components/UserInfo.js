import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {Avatar} from 'react-native-elements';
import theme from '../../../styles/theme';
const UserInfo = props => {
  const { user } = props

  return (
    <View style={styles.info}>
      <View style={styles.infoAvatar}>
        <Avatar
          rounded
          size={150}
        ></Avatar>
      </View>
      <View style={styles.infoText}>
        <Text style={styles.infoTextName}>{user.firstName + ' ' + user.lastName}</Text>
        <Text style={styles.infoTextMail}>{user.email}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  info: {
    backgroundColor: '#F9F9F9',
    paddingTop: 30,
    paddingBottom: 20,
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
  },
  infoText: {
  },
  infoTextName: {
    fontSize: 24,
    color: theme.colors.black,
    fontFamily: 'SF-Pro-Display-Bold',
  },
  infoTextMail: {
    fontSize: 15,
    color: theme.colors.darkGray,
    fontFamily: 'SF-Pro-Text-Regular',
  },
});

export default UserInfo;
