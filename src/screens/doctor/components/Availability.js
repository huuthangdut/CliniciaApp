import React, { useState, useEffect } from 'react'
import { StyleSheet, View } from 'react-native'
import { ListItem } from 'react-native-elements'

const Availability = props => {
  const [enable, setEnable] = useState(false)

  const handleChange = () => {
    props.onChange(!enable)
    setEnable(!enable);
  }

  return (
    <View style={styles.container}>
      <ListItem
        key = 'title'
        title='Thời gian làm việc'
      />
      <ListItem
        key = 'switch'
        containerStyle = {styles.item}
        title='Có thể đặt lịch hôm nay'
        bottomDivider
        switch= {{
          value: enable,
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