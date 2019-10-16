import React, { useState, useEffect } from 'react'
import {
  View,
  StyleSheet,
  Image,
  Dimensions,
  Text
} from "react-native"
import theme from '../../../styles/theme'
import { FlatList } from 'react-native-gesture-handler'
import { Avatar } from 'react-native-elements'

const FavoriteList = props => {
  const [dataSource, setDataSource] = useState({});

  useEffect(() => {
    let items = Array.apply(null, Array(20)).map((v, i) => {
      return { id: i, src: 'http://placehold.it/200x200?text=' + (i + 1) }
    })
    setDataSource(items)
  }, [])

  return (
    <View style={styles.MainContainer}>
      <FlatList
        style = {styles.list}
        showsVerticalScrollIndicator={false}
        data={dataSource}
        renderItem={({ item }) => (
          <View style={styles.itemWrapper}>
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
                  containerStyle: {
                    backgroundColor: theme.colors.white,
                    width: 22,
                    height: 22,
                    justifyContent: 'center',
                    borderRadius: 11,
                    borderColor: theme.colors.favorite.borderHeartIcon,
                    borderWidth: 1
                  }
                }}
              />
              <Text style={styles.name}>Phúc Trần</Text>
              <View style={styles.rating}>
                <Image source={theme.tabIcons.star} />
                <Text>3.5</Text>
              </View>
            </View>
          </View>
        )}
        numColumns={3}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  )
}

// const elementWidth = (Dimensions.get('window').width - 60) / 3
// const contentHeight = Dimensions.get('window').height - (49 + 44 + 96)

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    // marginHorizontal: 15,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'blue'
  },
  list: {
    // backgroundColor: 'red',
  },
  itemWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 8,
    marginTop: 16
  },
  item: {
    borderRadius: 8,
    borderWidth: 1,
    backgroundColor: theme.colors.favorite.backgroundGray,
    borderColor: theme.colors.lightGray,
    height: 158,
    width: 104,
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    fontSize: 13,
    marginTop: 4
  },
  rating: {
    flexDirection: 'row'
  }
})

export default FavoriteList