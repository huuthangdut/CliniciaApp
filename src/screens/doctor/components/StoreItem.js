import React from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import theme from '../../../styles/theme'
import { Icon } from 'react-native-elements'
import WithContext from '../../../components/core/WithContext'

const StoreItem = props => {
  const { item, navigation, context } = props

  return (
    <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('Store', { storeId: item._id })}>
      <View style={styles.content}>
        <Text style={styles.name}>{item.name}</Text>
        <View style={styles.row}>
          <Icon
            name="map-marker"
            type="font-awesome"
            size={12}
            color="#C8C7CC"
          />
          <Text numberOfLines={1} style={styles.text}>{item.location.address}</Text>
          <Icon name="dot-single" type="entypo" size={12} color="#C8C7CC" />
          <Text style={styles.text}> km</Text>
        </View>
        <View style={styles.row}>
          <Text>About:  km </Text>
        </View>
        <View style={styles.row}>
          <Text>Average: </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  item: {
    width: '100%',
    height: 110,
    backgroundColor: theme.colors.white,
    flexDirection: 'row',
  },
  image: {
    marginRight: 15,
    justifyContent: 'center',
  },
  content: {
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: theme.colors.lightGray,
    borderRadius: 10,
    marginVertical: 5
  },
  name: {
    fontSize: 15,
    fontFamily: 'SF-Pro-Text-Medium',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 1,
  },
  text: {
    fontSize: 13,
    fontFamily: 'SF-Pro-Text-Regular',
    color: theme.colors.darkGray,
    paddingHorizontal: 5,
  },
  rating: {
    height: 10,
  },
  price: {
    fontSize: 13,
    fontFamily: 'SF-Pro-Text-Regular',
    color: theme.colors.black,
    paddingHorizontal: 5,
  },
  likeWrapper: {
    width: 30,
    justifyContent: 'center'
  },
});

export default WithContext(StoreItem)
