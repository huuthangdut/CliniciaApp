import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Avatar, Icon} from 'react-native-elements';
import theme from '../../../styles/theme';

const NotificationItem = props => {
  const backgroundColor = props.item.hasRead ? 'white' : 'rgba(0, 0, 0, 0.06)';

  return (
    <TouchableOpacity style={[styles.container, {backgroundColor}]} activeOpacity={0.7}>
      <View style={styles.image}>
        {/* <Avatar
          size={45}
          rounded
          source={{
            uri:
              'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
          }}
        /> */}
      </View>
      <View style={styles.content}>
          <Text style={styles.text} numberOfLines={2}>{props.item.content}</Text>
          <View style={styles.timeFromNow}>
              <Icon iconStyle={styles.timeFromNowText} size={15} name="clockcircle" type="antdesign"/>
              <Text style={styles.timeFromNowText}>{props.item.date}</Text>
          </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 80,
    flexDirection: 'row',
    padding: 20
  },
  content: {
    justifyContent: 'center',
    flex: 1,
    flexDirection: 'column',
    marginLeft: 10
  },
  image: {
    justifyContent: 'center',
  },
  text: {
      fontSize: 15,
      fontFamily: 'SF-Pro-Text-Regular',
      lineHeight: 22
  },
  timeFromNow: {
      flexDirection: 'row',
      marginVertical: 5
  },
  timeFromNowText: {
      color: theme.colors.gray,
      lineHeight: 18,
      marginRight: 5
  }
});

export default NotificationItem;
