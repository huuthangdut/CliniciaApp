import React, { useState } from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import { ListItem, Icon } from 'react-native-elements'
import theme from '../../../styles/theme'

const StarRating = props => {
  const rating = [1, 2, 3, 4, 5]
  const [choice, setChoice] = useState(1)

  return (
    <View style={styles.container}>
      <ListItem
        title='Star Rating'
      />
      <View style={styles.starFrame}>
        {
          rating.map(item => {
            return (
              <>
                <TouchableOpacity onPress={() => setChoice(item)} style={styles.border}>
                  <View style={styles.item}>
                    <Text style={styles.text}>{item}</Text>
                    {choice === item ? <Icon name='star' color='#FF9500' />
                    :<Icon name='star' color={theme.colors.darkGray}/>}
                  </View>
                </TouchableOpacity>
                {item !== 5 && <View style={styles.divider}/>}
              </>
            )
          })

        }

      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  starFrame: {
    display: 'flex',
    flexDirection: 'row',
    borderColor: theme.colors.darkGray,
    borderWidth: 1,
    marginHorizontal: 16,
    justifyContent: 'space-around',
    borderRadius: 50,
    flex: 1,
  },
  divider: {
    borderColor: 'black',
    borderRightWidth: 0.5,
  },
  border: {
    flex: 1 
  },
  item: {
    display: 'flex',
    flexDirection: 'row',
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    borderBottomColor: theme.colors.lightGray,
    borderBottomWidth: 1,
    marginBottom: 16,
    paddingBottom: 24
  }
})

export default StarRating