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
          size={86}
          source={{ uri: '' }}
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
    paddingTop: 30,
    paddingBottom: 20,
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
    fontFamily: 'SF-Pro-Display-Bold',
  },
  infoTextMail: {
    fontSize: 15,
    color: theme.colors.darkGray,
    fontFamily: 'SF-Pro-Text-Regular',
  },
});

export default UserInfo;
