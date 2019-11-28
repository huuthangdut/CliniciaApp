import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, FlatList, Alert, Image} from 'react-native';
import theme from '../../../styles/theme';
import {Icon} from 'react-native-elements';

const Category = props => {
  const {items, navigation} = props;

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <TouchableOpacity 
          onPress={() => navigation.navigate('Specialty')}
          style={[{flex: 1}, styles.alignRight, styles.row]}
          activeOpacity={0.7}>
          {/* <Text style={styles.link}>View all</Text> */}
          {/* <Icon
            name='chevron-right'
            type='evilIcons'
            size={20}
            color={theme.colors.primary}></Icon> */}
            
        </TouchableOpacity>
      </View>
      <View>
        <FlatList
          style={styles.list}
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          data={items}
          renderItem={({item}) => (
            <TouchableOpacity style={styles.item} activeOpacity={0.7} onPress={() => navigation.navigate('Doctor')}>
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
