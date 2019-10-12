import React from 'react';
import {StyleSheet, TouchableOpacity, View, ImageBackground, Text} from 'react-native';
import {Icon, Rating} from 'react-native-elements';
import theme from '../../../styles/theme';

const ClinicItem = props => {
  const {navigation} = props;

  return (
    <TouchableOpacity style={styles.item} activeOpacity={0.9} onPress={() => navigation.navigate('ClinicDetails')}>
      <ImageBackground
        imageStyle={styles.image}
        style={styles.background}
        resizeMode="cover"
        source={{
          uri:
            'http://www.hoanmy.com/upload/hoanmy.com/hinhanh/tintuc/tinhoanmy/dia-diem-benh-vien-hoan-my.jpg',
        }}>
        <View style={styles.bookmarkWrapper}>
          <Icon
            // onPress={() => toggleLike()}
            iconStyle={styles.bookmarkIcon}
            color={theme.colors.red}
            name="heart"
            type="antdesign"
            size={22}></Icon>
        </View>
      </ImageBackground>
      <View style={styles.info}>
        <View style={styles.row}>
          <View style={{flex: 2}}>
            <Text style={styles.clinicName}>{props.item.name}</Text>
          </View>
          <View style={[styles.col, styles.alignRight]}>
            <View style={styles.row}>
              <Rating
                style={styles.rating}
                imageSize={14}
                readonly
                startingValue={props.item.rating}
              />
              <Text style={[styles.ratingCount, styles.text]}>
                {props.item.ratingCount}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.col}>
            <View style={styles.row}>
              <Icon
                iconStyle={styles.icon}
                name="map-marker"
                type="material-community"
                size={15}></Icon>
              <Text style={styles.text}>{props.item.address}</Text>
            </View>
          </View>
          <View style={[styles.col, styles.alignRight]}>
            <Text style={styles.text}>{props.item.distance}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  item: {
    height: 280,
    marginBottom: 5,
  },
  image: {
    borderRadius: 10,
  },
  background: {
    height: 210,
    width: '100%',
    borderRadius: 10,
  },
  bookmarkWrapper: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  bookmarkIcon: {
    marginTop: 8,
    marginRight: 8,
  },
  row: {
    flexDirection: 'row',
    paddingVertical: 1,
  },
  col: {
    flex: 1,
  },
  info: {
    marginVertical: 5,
  },
  clinicName: {
    fontSize: 17,
    fontFamily: 'SF-Pro-Text-Regular',
  },
  alignRight: {
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  rating: {
    justifyContent: 'center'
  },
  ratingCount: {
    marginLeft: 5,
    justifyContent: 'center',
  },
  text: {
    color: theme.colors.gray,
    fontFamily: 'SF-Pro-Text-Regular',
    justifyContent: 'center',
  },
  icon: {
    color: theme.colors.gray,
    marginRight: 2,
    marginTop: 2,
  } 
});

export default ClinicItem;
