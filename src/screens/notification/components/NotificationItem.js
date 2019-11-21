import React, { useEffect, useContext, useState } from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Avatar, Icon} from 'react-native-elements';
import theme from '../../../styles/theme';
import {DateTime} from '../../../utilities/date-time';
import Swipeout from 'react-native-swipeout';
import { NotificationService } from '../../../services/NotificationService';
import {AppContext} from '../../../AppProvider';

const NotificationItem = props => {
  const {item, navigation} = props;
  const context = useContext(AppContext);

  const [notification, setNotification] = useState(item);

  const deleteNotification = () => {
    NotificationService.deleteNotification(notification.id)
      .then(() => {
        let notifications = [...context.notifications.get];
        notifications = notifications.filter(i => i.id !== notification.id);
        context.notifications.set(notifications);
      }).catch(e => {
        console.log(e);
      });
  };

  const markAsRead = () => {
    if(!notification.hasRead) {
      NotificationService.markAsRead(notification.id).then(() => {
        setNotification({ ...notification, hasRead: true });
      }).catch(e => {
        console.log(e);
      });
    }
  };

  let swipeBtns = [
    {
      text: 'Xoá',
      backgroundColor: 'red',
      underlayColor: 'rgba(0, 0, 0, 1, 0.6)',
      onPress: () => {
        deleteNotification();
      },
    },
  ];

  return (
    <Swipeout right={swipeBtns} autoClose={true} backgroundColor="transparent">
      <TouchableOpacity
        onPress={() => markAsRead()}
        style={[styles.container, {backgroundColor: notification.hasRead ? 'white' : 'rgba(68, 134, 255, 0.1)'}]}
        activeOpacity={0.7}>
        <View style={styles.image}>
          <Avatar size={50} rounded source={{uri: notification.image}} />
        </View>
        <View style={styles.content}>
          <Text style={styles.title} numberOfLines={1}>{notification.title}</Text>
          <Text style={styles.text} numberOfLines={3}>
            {notification.content}
          </Text>
          <View style={styles.timeFromNow}>
            <Icon
              iconStyle={styles.timeFromNowText}
              size={15}
              name="clockcircle"
              type="antdesign"
            />
            <Text style={styles.timeFromNowText}>
              {DateTime.toDateString(notification.notificationDate, 'HH:mm DD/MM/YYYY')}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </Swipeout>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 110,
    flexDirection: 'row',
    padding: 20,
  },
  content: {
    justifyContent: 'center',
    flex: 1,
    flexDirection: 'column',
    marginLeft: 15
  },
  image: {
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    lineHeight: 23,
    fontFamily: 'SF-Pro-Display-Semibold'
  },
  text: {
    fontSize: 15,
    fontFamily: 'SF-Pro-Text-Regular',
    lineHeight: 22,
  },
  timeFromNow: {
    flexDirection: 'row',
    marginVertical: 5,
  },
  timeFromNowText: {
    color: theme.colors.gray,
    lineHeight: 18,
    marginRight: 5,
  },
});

export default NotificationItem;
