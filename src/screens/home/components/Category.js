import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  Image,
} from 'react-native';
import theme from '../../../styles/theme';
import {Icon} from 'react-native-elements';

const Category = props => {
  const {items, navigation, loading} = props;

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={[{flex: 3}, styles.alignLeft, styles.title]}>
          Chuyên khoa
        </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('Specialty')}
          style={[{flex: 1}, styles.alignRight, styles.row]}
          activeOpacity={0.7}>
          <Text style={styles.link}>Xem tất cả</Text>
          <Icon
            name="chevron-right"
            type="evilIcons"
            size={20}
            color={theme.colors.primary}></Icon>
        </TouchableOpacity>
      </View>
      {loading ? (
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator size={30} style={{color: '#000'}} />
          </View>
        ) : (
          <FlatList
            style={styles.list}
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            data={items}
            renderItem={({item}) => (
              <TouchableOpacity
                style={styles.item}
                activeOpacity={0.7}
                onPress={() => navigation.navigate('Doctor', { specialtyId: item.id })}>
                <View style={styles.iconWrapper}>
                  {/* <Image
                    style={{width: 40, height: 40}}
                    resizeMode="contain"
                    source={{uri: item.image}}
                  /> */}
                  <Icon name="heartbeat" type="font-awesome" size={40} color="white"/>
                </View>
                <View style={styles.center}>
                  <Text numberOfLines={2} style={styles.doctor}>{item.name}</Text>
                </View>
              </TouchableOpacity>
            )}
            keyExtractor={item => item.id.toString()}
          />
        )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 160,
    marginTop: 10,
  },
  row: {
    flexDirection: 'row',
  },
  col: {
    flex: 1,
  },
  alignLeft: {
    justifyContent: 'flex-start',
  },
  alignRight: {
    justifyContent: 'flex-end',
  },
  title: {
    fontSize: 18,
    fontFamily: 'SF-Pro-Text-Bold',
    lineHeight: 18,
  },
  link: {
    fontSize: 14,
    color: '#4486FF',
    alignItems: 'center',
  },
  list: {
    height: 120,
  },
  item: {
    width: 85,
    flexDirection: 'column',
    marginRight: 10,
    marginVertical: 8
  },
  iconWrapper: {
    height: 85,
    width: 85,
    backgroundColor: theme.colors.primary,
    borderRadius: 9,
    justifyContent: 'center',
    alignItems: 'center',
  },
  center: {
    alignItems: 'center',
  },
  doctor: {
    marginTop: 5,
    paddingHorizontal: 1,
    fontSize: 13,
    fontFamily: 'SF-Pro-Text-Regular',
    textAlign: 'center'
  },
});

export default Category;
