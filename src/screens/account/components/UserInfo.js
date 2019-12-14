import React, {useContext} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {Avatar} from 'react-native-elements';
import theme from '../../../styles/theme';
import { AppContext } from '../../../AppProvider';

const UserInfo = props => {
  const context = useContext(AppContext);
  const authUser = context.authUser.get;

  return (
    <View style={styles.info}>
      <View style={styles.infoAvatar}>
        <Avatar
          rounded
          size="large"
          source={{ uri: authUser.imageProfile }}
          showEditButton
        />
      </View>
      <View style={styles.infoText}>
        <Text style={styles.infoTextName}>{authUser.firstName + ' ' + authUser.lastName}</Text>
        <Text style={styles.infoTextMail}>{authUser.phoneNumber}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  info: {
    backgroundColor: '#F9F9F9',
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 30,
    paddingBottom: 20,
    paddingHorizontal: 18
  },
  infoText: {
    flex: 1,
    justifyContent: 'center',
    marginLeft: 16
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
