import React, { useState } from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Icon, Image, SearchBar} from 'react-native-elements';
import theme from '../../../styles/theme';

const HomeHeader = props => {
  const [searchInputText, setSearchInputText] = useState('')
  const [showSearchBar, setShowSearchBar] = useState(false)

  return (
    <>
    <Text 
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          textAlign:'center',
          fontSize: 35,
          fontWeight: 'bold',
          color: theme.colors.primary,
        }}
      >
        ExFood
      </Text>
    <View style={styles.header}>
      
      {!showSearchBar && <TouchableOpacity style={styles.location}>
        <View style={styles.headerTextContainer}>
          {/* <Text style={styles.locationText}>in Da Nang</Text> */}
        </View>
      </TouchableOpacity>}
      <View style={{flex: 1}}>
        {showSearchBar && <SearchBar
          containerStyle={styles.searchBar}
          inputContainerStyle={styles.searchInput}
          onChangeText={val => setSearchInputText(val)}
          value={searchInputText}
          searchIcon={false}
        />}
      </View>
      <TouchableOpacity style={styles.search} onPress={() => setShowSearchBar(!showSearchBar)}>
        <Icon name="search" type="feather" size={20} />
      </TouchableOpacity>
    </View>
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 55,
    marginBottom: 5,
    paddingHorizontal: 15,
    flexDirection: 'row',
  },
  location: {
    flexDirection: 'row',
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  headerTextContainer: {
    justifyContent: 'center',
  },
  yourLocation: {
    fontSize: 11,
    fontFamily: 'SF-Pro-Text-Regular',
    color: theme.colors.darkGray,
  },
  locationText: {
    fontSize: 13,
    fontFamily: 'SF-Pro-Text-Semibold',
    color: theme.colors.primary
  },
  search: {
    width: 30,
    justifyContent: 'center',
  },
  searchBar: {
    backgroundColor: theme.colors.white,
    borderBottomWidth: 0,
    borderTopWidth: 0
  },
  searchInput: {
    backgroundColor: theme.colors.lightGray
  }
});

export default HomeHeader;
