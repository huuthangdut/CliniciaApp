import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {Icon} from 'react-native-elements';
import theme from '../../../styles/theme';

const SpecialtyItem = props => {
  const {item, navigation} = props;

  return (
    <TouchableOpacity style={styles.item} activeOpacity={0.7} onPress={() => navigation.navigate('Doctor')}>
      <View style={styles.row}>
        <View style={styles.imageWrapper}>
          <Icon
            name="heartbeat"
            type="font-awesome"
            size={40}
            color="#fff"></Icon>
        </View>
        <View style={styles.textWrapper}>
          <Text style={styles.title}>{item.name}</Text>
          <Text style={styles.text}>{item.numOfDoctors} doctors</Text>
        </View>
        <View style={styles.iconWrapper}>
          <Icon
            name="chevron-right"
            type="evilIcons"
            size={26}
            color={theme.colors.gray}></Icon>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  item: {
    width: '100%',
    height: 80,
    justifyContent: 'center',
    marginVertical: 2
  },
  title: {
    fontSize: 17,
    fontFamily: 'SF-Pro-Text-Bold',
    lineHeight: 28
  },
  text: {
    fontSize: 14,
    fontFamily: 'SF-Pro-Text-Regular',
    color: theme.colors.gray,
  },
  row: {
    flexDirection: 'row'
  },
  imageWrapper: {
    height: 75,
    width: 75,
    backgroundColor: theme.colors.primary,
    borderRadius: 9,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textWrapper: {
    flex: 1,
    marginVertical: 10,
    marginHorizontal: 20,
    justifyContent: 'center',
  },
  iconWrapper: {
    width: 20,
    justifyContent: 'center',
  }
});

export default SpecialtyItem;
