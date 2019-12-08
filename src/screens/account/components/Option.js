import React from 'react'
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import { ListItem } from 'react-native-elements'
import theme from '../../../styles/theme'

const Option = props => {
  const { navigation } = props

  const listOption = [
    {
      title: 'Yêu thích',
      screen: 'Favorite'
    }
  ]

  return (
    <View style={styles.option}>
      <Text style={styles.headerLabel}></Text>
      {
        listOption.map((item, i) => (
          <TouchableOpacity key={i} onPress={() => navigation.navigate(item.screen)}>
            <ListItem
              key={i}
              title={item.title}
              bottomDivider
              chevron
            />
          </TouchableOpacity>
        ))
      }
    </View>
  )
}

const styles = StyleSheet.create({
  headerLabel: {
    paddingLeft: 15,
    fontSize: 16,
    fontFamily: theme.colors.black,
    backgroundColor: theme.colors.lightGray,
    color: theme.colors.darkGray,
    lineHeight: 40
  }
});

export default Option;