import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, FlatList, Image} from 'react-native';
import theme from '../../../styles/theme'

const Category = props => {
  const {items, navigation} = props;

  return (
    <View style={styles.container}>
      <View>
        <FlatList
          style={styles.list}
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          data={items}
          renderItem={({item}) => (
            <TouchableOpacity style={styles.item} activeOpacity={0.7} onPress={() => navigation.navigate('Stores', {category: item.key})}>
              <View style={styles.iconWrapper}>
                  <Image style={{width: 40, height: 40 }} source={item.icon} />
              </View>
              <View style={styles.center}>
                <Text style={styles.doctor}>{item.name}</Text>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={item => item.id.toString()}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 150,
    marginTop: 10,
  },
  row: {
    flexDirection: 'row',
  },
  col: {
    flex: 1
  },
  alignLeft: {
    justifyContent: 'flex-start'
  },
  alignRight: {
    justifyContent: 'flex-end'
  },
  title: {
    fontSize: 18,
    fontFamily: 'SF-Pro-Text-Bold',
    lineHeight: 18,
  },
  link: {
    fontSize: 14,
    color: theme.colors.primary,
    alignItems: 'center',
  },
  list: {
    height: 120,
  },
  item: {
    width: 85,
    flexDirection: 'column',
    marginRight: 13,
    marginVertical: 8,
    borderRadius: 43
  },
  iconWrapper: {
    height: 85,
    width: 85,
    backgroundColor: theme.colors.primary,
    borderRadius: 9,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 43
  },
  center: {
    alignItems: 'center',
  },
  doctor: {
    marginTop: 5,
    fontSize: 14,
    fontFamily: 'SF-Pro-Text-Regular',
  }
});

export default Category;
