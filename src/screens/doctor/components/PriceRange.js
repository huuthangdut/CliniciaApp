import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { ListItem, Input, Text } from 'react-native-elements'

const PriceRange = () => {
  const [lowRange, setLowRange] = useState(0)
  const [highRange, setHighRange] = useState(500000)

  return (
    <View style={styles.container}>
      <ListItem
        title='Price Range'
        key='priceRange'
      />
      <View style={styles.inputContainer}>
        <Input 
          label='From'
          labelStyle={styles.inputLabel}
          containerStyle={styles.inputItem}
          placeholder={'Low Range'}
        />
        <View style={styles.divider}></View>
        <Input
          label='To'
          labelStyle={styles.inputLabel}
          containerStyle={styles.inputItem}
          placeholder={'High Range'}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16
  },
  inputContainer: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: 15,
  },
  inputItem: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#D8D8D8',
    padding: 5,
    borderRadius: 10
  },
  inputLabel: {
    fontFamily: 'SF-Pro-Text-Regular',
    fontWeight: 'normal'
  },
  divider: {
    width: 8
  }
})

export default PriceRange