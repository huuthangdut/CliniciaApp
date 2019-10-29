import React, { useState } from 'react'
import { StyleSheet, View, TouchableOpacity } from 'react-native'
import { ListItem, Text, CheckBox } from 'react-native-elements'
import theme from '../../../styles/theme'

const SortOption = props => {
  const [selectedOption, setSelectedOption] = useState('highRating')
  const [sortOptions, setSortOption] = useState([
    { value: 'highRating', title: 'Star rating (Highest First)' },
    { value: 'lowRating', title: 'Star rating (Lowest First)' },
    { value: 'highPrice', title: 'Price (Highest First)' },
    { value: 'lowPrice', title: 'Price (Lowest First)' }
  ])

  const chooseOption = value => {
    setSelectedOption(value)
  }

  return (
    <View style={styles.container}>
      <ListItem
        title='Sort Option'
        
      />
      {
        sortOptions.map(item => {
          return (
            <TouchableOpacity onPress={() => setSelectedOption(item.value)}>
              <ListItem
                key={item.value}
                containerStyle={styles.item}
                title={item.title}
                bottomDivider
                rightElement={
                  <CheckBox
                    containerStyle={styles.checkBox}
                    checkedIcon="checkbox-marked-circle"
                    checkedColor={theme.colors.secondary}
                    iconType="material-community"
                    size={22}
                    right
                    uncheckedIcon="checkbox-blank-circle-outline"
                    checked={item.value === selectedOption}
                    onPress={() => setSelectedOption(item.value)}
                  />
                }
              />
            </TouchableOpacity>
          )
        })
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16
  },
  item: {
    height: 50,
    marginBottom: 2
  },
  checkBox:{
    marginRight: 0
  }
})

export default SortOption