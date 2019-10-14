import React from 'react';
import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import {Avatar, Rating, Icon} from 'react-native-elements';
import theme from '../../../styles/theme';

const Nearby = props => {
  const {items, navigation} = props;
  return (
    <View>
      <View style={styles.headerBar}>
        <Text style={styles.headerText}>Nearby</Text>
        <TouchableOpacity
          onPress={() => {}}
          style={styles.link}
          activeOpacity={0.7}>
          <Text style={styles.linkText}>See all</Text>
          <Icon
            name="chevron-right"
            type="evilIcons"
            size={15}
            color={theme.colors.primary}></Icon>
        </TouchableOpacity>
      </View>
      <FlatList
        style={styles.list}
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        data={items}
        renderItem={({item}) => (
          <TouchableOpacity
            style={styles.item}
            activeOpacity={0.7}
            onPress={() => {}}>
            <Avatar
              size={64}
              rounded
              source={{
                uri:
                  'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
              }}
            />
            <Text numberOfLines={2} style={styles.name}>
              {item.name}
            </Text>
            <View style={styles.rating}>
              <Rating
                imageSize={13}
                readonly
                startingValue={1}
                ratingCount={1}
              />
              <Text style={styles.ratingText}>{item.rating}</Text>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  headerBar: {
    flexDirection: 'row',
    marginBottom: 16,
    paddingHorizontal: 5,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 17,
    fontFamily: 'SF-Pro-Text-Bold',
    flex: 1,
  },
  link: {
    flexDirection: 'row',
    width: 60,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  linkText: {
    fontSize: 11,
    fontFamily: 'SF-Pro-Text-Semibold',
    color: '#4486FF',
    alignItems: 'center',
  },
  item: {
    flexDirection: 'column',
    height: 130,
    width: 80,
    marginRight: 8,
    alignItems: 'center',
  },
  name: {
    fontSize: 13,
    fontFamily: 'SF-Pro-Text-Regular',
    textAlign: 'center',
  },
  rating: {
    flexDirection: 'row',
    marginTop: 5,
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 13,
    fontFamily: 'SF-Pro-Text-Regular',
    color: theme.colors.gray,
    marginLeft: 3,
  },
});

export default Nearby;
