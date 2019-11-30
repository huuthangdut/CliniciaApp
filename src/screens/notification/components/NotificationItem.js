import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Avatar, Icon } from 'react-native-elements';
import theme from '../../../styles/theme';

const NotificationItem = props => {
  const backgroundColor = props.item.hasRead ? 'white' : theme.colors.lightGray;

  return (
    <TouchableOpacity style={[styles.container, { backgroundColor }]} activeOpacity={0.7}>
      <View style={styles.content}>
        <Text style={styles.text} numberOfLines={2}>{props.item.content}</Text>
        <View style={styles.timeFromNow}>
          <Icon iconStyle={styles.timeFromNowText} size={15} name="clock" type="material-community" />
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
    padding: 10,
    marginVertical: 5,
    marginHorizontal: 20,
    borderRadius: 10
  },
  content: {
    justifyContent: 'center',
    flex: 1,
    flexDirection: 'column',
  },
  image: {
    justifyContent: 'center',
  },
  text: {
    fontSize: 15,
    fontFamily: 'SF-Pro-Text-Regular',
    lineHeight: 22,
    marginHorizontal: 10,
  },
  timeFromNow: {
    flexDirection: 'row',
    marginVertical: 5,
    marginHorizontal: 10,
  },
  timeFromNowText: {
    color: theme.colors.gray,
    lineHeight: 18,
    marginRight: 5
  }
});

export default NotificationItem;
