import React, { useState } from 'react'
import { StyleSheet, View, TouchableOpacity } from 'react-native'
import { ListItem, Text, CheckBox } from 'react-native-elements'
import theme from '../../../styles/theme'

const SortOption = props => {
  const {value} = props;

  const [selectedOption, setSelectedOption] = useState(value);
  const [sortOptions, setSortOption] = useState([
    { value: '-StarRating', title: 'Đánh giá cao' },
    { value: '+Distance', title: 'Gần nhất' }
  ]);

  const handleChange = (value) => {
    setSelectedOption(value);
    props.onChange(value)
  }

  return (
    <View style={styles.container}>
      <ListItem
        title='Sắp xếp theo'
      />
      {
        sortOptions.map(item => {
          return (
            <TouchableOpacity key={item.value} onPress={() => handleChange(item.value)}>
              <ListItem
                key={item.value}
                containerStyle={styles.item}
                title={item.title}
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
                    onPress={() => handleChange(item.value)}
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