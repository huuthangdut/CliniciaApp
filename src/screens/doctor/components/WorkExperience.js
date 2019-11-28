import React, { useState } from 'react'
import {
  StyleSheet,
  View,
  TouchableOpacity,
  FlatList
} from 'react-native'
import { ListItem, Text, CheckBox } from 'react-native-elements'
import theme from '../../../styles/theme'

const WorkExperience = props => {
  const [selectedOption, setSelectedOption] = useState('any')
  const [sortOptions, setSortOption] = useState([
    { value: 'any', title: 'Any Experience' },
    { value: 'lessOne', title: '< 1' },
    { value: 'oneToFive', title: '1 - 5' },
    { value: 'fiveToTen', title: '5 - 10' },
    { value: 'tenToFifteen', title: '10 - 15' },
    { value: 'fifteenToTwenty', title: '15 - 20' }
  ])

  const chooseOption = value => {
    setSelectedOption(value)
  }

  const onPressEnd = (value) => {
    setSelectedOption(value)
  }

  return (
    <View style={styles.container}>
      <ListItem
        title='Year Experience'
      />
      <View style={styles.container}>
        <FlatList
          style={styles.list}
          showsVerticalScrollIndicator={false}
          data={sortOptions}
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              <TouchableOpacity onPress={() => setSelectedOption(item.value)}>
                <View style={selectedOption === item.value ? styles.selectedBorder : styles.border}>
                  <Text style={selectedOption === item.value ? styles.selectedInnerItem : styles.innerItem}>{item.title}</Text>
                </View>
              </TouchableOpacity>
            </View>
          )}
          numColumns={2}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  itemContainer: {
    padding: 4,
    flex: 1
  },
  innerItem: {
    fontSize: 15,
    padding: 20,
    color: theme.colors.darkGray
  },
  selectedInnerItem: {
    fontSize: 15,
    padding: 20,
    color: theme.colors.primary
  },
  border: {
    borderWidth: 1,
    borderColor: '#D8D8D8',
    borderRadius: 10,
    alignItems: 'center'
  },
  selectedBorder: {
    borderWidth: 1,
    borderColor: theme.colors.primary,
    borderRadius: 10,
    alignItems: 'center'
  },
  list: {
    paddingHorizontal: 11
  }
})

export default WorkExperience