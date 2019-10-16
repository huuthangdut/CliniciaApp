import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Image, Text, Dimensions} from 'react-native';
import theme from '../../../styles/theme';
import {FlatList} from 'react-native-gesture-handler';
import {Avatar} from 'react-native-elements';

const FavoriteList = props => {
  const [dataSource, setDataSource] = useState({});

  useEffect(() => {
    let items = Array.apply(null, Array(20)).map((v, i) => {
      return {id: i, src: 'http://placehold.it/200x200?text=' + (i + 1)};
    });
    setDataSource(items);
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={dataSource}
        renderItem={({item}) => (
          <View style={styles.itemContainer}>
            <View style={styles.item}>
              <Avatar
                rounded
                size={64}
                showEditButton
                editButton={{
                  name: 'heart',
                  type: 'font-awesome',
                  color: 'red',
                  size: 14,
                  containerStyle: styles.loveIcon,
                }}
              />
              <Text numberOfLines={2} style={styles.name}>
                Edward Janowski
              </Text>
              <View style={styles.rating}>
                <View style={styles.starWrapper}>
                  <Image style={styles.starIcon} source={theme.tabIcons.star} />
                </View>
                <Text style={styles.ratingText}>3.5</Text>
              </View>
            </View>
          </View>
        )}
        numColumns={3}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 8,
    marginBottom: 16,
  },
  item: {
    borderRadius: 8,
    borderWidth: 1,
    padding: 5,
    backgroundColor: theme.colors.favorite.backgroundGray,
    borderColor: theme.colors.lightGray,
    height: 158,
    width: Dimensions.get('screen').width / 3.6,
    justifyContent: 'center',
    alignItems: 'center'
  },
  name: {
    fontSize: 13,
    fontFamily: 'SF-Pro-Text-Regular',
    textAlign: 'center',
    lineHeight: 20,
    marginTop: 5
  },
  rating: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
  },
  ratingText: {
    fontSize: 13,
    fontFamily: 'SF-Pro-Text-Regular',
    color: theme.colors.darkGray,
  },
  starWrapper: {
    justifyContent: 'center',
    alignContent: 'center',
  },
  starIcon: {
    width: 12,
    height: 12,
    marginRight: 4,
  },
  loveIcon: {
    backgroundColor: theme.colors.white,
    width: 22,
    height: 22,
    justifyContent: 'center',
    borderRadius: 11,
    borderColor: theme.colors.favorite.borderHeartIcon,
    borderWidth: 1,
  },
});

export default FavoriteList;
