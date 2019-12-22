import React, {useState} from 'react';
import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import theme from '../../../styles/theme';
import { Icon } from 'react-native-elements';
import { Utils } from '../../../utilities/utils';

const CheckingServiceItem = props => {
  const {item, navigation} = props;
  return (
    <TouchableOpacity style={styles.container} activeOpacity={0.7} onPress={() => navigation.navigate('UpdateCheckingService', { checkingService: item })}>
      <View style={styles.textWrapper}>
        <Text style={styles.doctorName}>{item.name}</Text>
        <Text numberOfLines={2} style={styles.clinicName}>{item.description}</Text>
        <Text style={styles.date}>{Utils.currencyFormat(item.price)} - {item.durationInMinutes} phút</Text>
      </View>
      <View style={styles.rightButton}>
        <Icon type="material" name="edit" color={theme.colors.primary}/>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 90,
    flexDirection: 'row',
    borderColor: theme.colors.lightGray,
    borderWidth: 1,
    borderRadius: 10,
    marginVertical: 4
  },
  image: {
    justifyContent: 'center',
    marginRight: 5,
  },
  textWrapper: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    marginHorizontal: 10
  },
  doctorName: {
    fontSize: 18,
    fontFamily: 'SF-Pro-Display-Semibold',
    lineHeight: 20
  },
  clinicName: {
    fontSize: 14,
    fontFamily: 'SF-Pro-Text-Regular',
    lineHeight: 20
  },
  date: {
      fontSize: 14,
      fontFamily: 'SF-Pro-Text-Regular',
      color: theme.colors.darkGray,
      lineHeight: 20
  },
  timeStatusWrapper: {
      width: 110,
      height: '100%',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
  },
  timeBeforeNow: {
      fontSize: 13,
      fontFamily: 'SF-Pro-Text-Regular',
      color: theme.colors.darkGray,
      marginBottom: 15
  },
  rightButton: {
      width: 40,
      justifyContent: 'center',
      alignItems: 'center'
  }
});

export default CheckingServiceItem;
