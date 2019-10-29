import React, { useState, useEffect } from 'react'
import { StyleSheet, View } from 'react-native'
import { ListItem } from 'react-native-elements'

const Availability = props => {
  const [isOn, setIsOn] = useState()

  useEffect(() => {
    setIsOn(true)
  }, [])

  const handleChange = () => {
    setIsOn(!isOn)
  }

  return (
    <View style={styles.container}>
      <ListItem
        key = 'title'
        title='Availability'
      />
      <ListItem
        key = 'switch'
        containerStyle = {styles.item}
        title='Available Today'
        bottomDivider
        switch= {{
          value: isOn,
          onChange: handleChange 
        }}
        />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16
  },
  item: {
    height: 50
  }
})

export default Availability