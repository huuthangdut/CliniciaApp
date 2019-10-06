/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {Icon} from 'react-native-elements';
import theme from '../../styles/theme';
import FlatListItemSeperator from '../../components/core/flat-list-item-seperator.component';

const SpecialtyScreen = (props) => {
  const [categories, setCategories] = useState([
    {id: 1, icon: 'home', name: 'Dentist', numOfDoctors: 96},
    {id: 2, icon: 'home', name: 'Cardiology', numOfDoctors: 96},
    {id: 3, icon: 'home', name: 'Physician', numOfDoctors: 96},
    {id: 4, icon: 'home', name: 'Dentist', numOfDoctors: 96},
    {id: 5, icon: 'home', name: 'Dentist', numOfDoctors: 96},
    {id: 6, icon: 'home', name: 'Dentist', numOfDoctors: 96},
    {id: 7, icon: 'home', name: 'Dentist', numOfDoctors: 96},
    {id: 8, icon: 'home', name: 'Dentist', numOfDoctors: 96},
    {id: 9, icon: 'home', name: 'Dentist', numOfDoctors: 96},
    {id: 10, icon: 'home', name: 'Dentist', numOfDoctors: 96},
    {id: 11, icon: 'home', name: 'Dentist', numOfDoctors: 96},
    {id: 12, icon: 'home', name: 'Dentist', numOfDoctors: 96},
  ]);
  
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Specialities</Text>
      <FlatList
        style={styles.list}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={FlatListItemSeperator}
        data={categories}
        renderItem={({item}) => (
          <TouchableOpacity style={styles.item} activeOpacity={0.7}>
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
        )}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 15,
  },
  header: {
    fontSize: 34,
    fontFamily: 'SF-Pro-Display-Bold',
  },
  title: {
    fontSize: 17,
    fontFamily: 'SF-Pro-Text-Bold'
  },
  text: {
    fontSize: 14,
    fontFamily: 'SF-Pro-Text-Regular',
    color: theme.colors.gray
  },    
  row: {
    flexDirection: 'row',
  },
  list: {
    marginTop: 15,
  },
  item: {
    width: '100%',
    height: 80,
  },
  imageWrapper: {
    height: 80,
    width: 80,
    backgroundColor: theme.colors.primary,
    borderRadius: 9,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textWrapper: {
      flex:  1,
      marginVertical: 10,
      marginHorizontal: 20,
      justifyContent: 'center'
  },
  iconWrapper: {
    width: 20,
    justifyContent: 'center'
  }
});

export default SpecialtyScreen;
