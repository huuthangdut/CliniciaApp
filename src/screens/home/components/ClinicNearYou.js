import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ScrollView,
  ImageBackground,
  Picker,
  Alert,
} from 'react-native';
import theme from '../../../styles/theme';
import {Icon} from 'react-native-elements';
import {Rating} from 'react-native-elements';

const ClinicNearYou = props => {
  const [liked, setLiked] = useState(true);
  const [sortBy, setSortBy] = useState('top');

  toggleLike = () => {
    setLiked(!liked);
  };

  return (
    <View style={styles.container}>
      <View style={[styles.buttonGroup, styles.row]}>
        <TouchableOpacity
          style={[styles.col, styles.center]}
          activeOpacity={0.5}>
          <View style={styles.row}>
            <Picker
              mode='dropdown'
              selectedValue={sortBy}
              style={[{flex: 1, marginLeft: 5}, styles.buttonText]}
              itemStyle={styles.buttonText}
              onValueChange={(itemValue, itemIndex) => setSortBy(itemValue)}>
              <Picker.Item label="Top rated" value="top" />
              <Picker.Item label="Nearest" value="nearest" />
            </Picker>
          </View>
        </TouchableOpacity>
        <View style={styles.divider} />
        <TouchableOpacity
          style={[styles.col, styles.center]}
          activeOpacity={0.5}>
          <View style={styles.row}>
            <Icon
              iconStyle={styles.mapIcon}
              name="map"
              type="entypo"
              size={15}></Icon>
            <Text style={styles.buttonText}>Map</Text>
          </View>
        </TouchableOpacity>
      </View>
      <FlatList
        style={styles.list}
        showsVerticalScrollIndicator={true}
        data={props.items}
        renderItem={({item}) => (
          <TouchableOpacity style={styles.item} activeOpacity={0.9}>
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
                  onPress={() => toggleLike()}
                  iconStyle={styles.bookmarkIcon}
                  color={liked ? theme.colors.red : theme.colors.gray}
                  name="heart"
                  type="antdesign"
                  size={22}></Icon>
              </View>
            </ImageBackground>
            <View style={styles.info}>
              <View style={styles.row}>
                <View style={{flex: 2}}>
                  <Text style={styles.clinicName}>{item.name}</Text>
                </View>
                <View style={[styles.col, styles.alignRight]}>
                  <View style={styles.row}>
                    <Rating
                      style={styles.rating}
                      imageSize={14}
                      readonly
                      startingValue={item.rating}
                    />
                    <Text style={[styles.ratingCount, styles.text]}>
                      {item.ratingCount}
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
                    <Text style={styles.text}>{item.address}</Text>
                  </View>
                </View>
                <View style={[styles.col, styles.alignRight]}>
                  <Text style={styles.text}>{item.distance}</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 5,
  },
  item: {
    height: 280,
    marginBottom: 5,
  },
  background: {
    height: 210,
    width: '100%',
    borderRadius: 10,
  },
  image: {
    borderRadius: 10,
  },
  row: {
    flexDirection: 'row',
    paddingVertical: 1,
  },
  col: {
    flex: 1,
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
    // alignItems: 'flex-start',
    justifyContent: 'center'
    // color: theme.colors.gray
  },
  ratingCount: {
    marginLeft: 5,
    justifyContent: 'center'
  },
  info: {
    marginVertical: 5
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
  },
  buttonGroup: {
    width: '100%',
    height: 44,
    marginBottom: 10,
    backgroundColor: '#F9F9F9',
    borderWidth: 1,
    borderColor: '#EFEFF4',
    borderRadius: 6,
  },
  divider: {
    borderLeftWidth: 1,
    borderLeftColor: '#EFEFF4',
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 15,
    fontFamily: 'SF-Pro-Text-Regular',
    color: theme.colors.gray,
    lineHeight: 18
  },
  mapIcon: {
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
    color: theme.colors.gray,
    lineHeight: 18,
  },
  dropDownIcon: {
    color: theme.colors.gray,
    lineHeight: 18,
    width: 30,
    textAlign: 'right',
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
});

export default ClinicNearYou;
