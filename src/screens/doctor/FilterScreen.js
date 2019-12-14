import React, { useState}from 'react'
import { StyleSheet, View, ScrollView } from 'react-native'
import { ListItem, Text, Divider } from 'react-native-elements'
import Availability from './components/Availability'
import Header from '../../components/core/Header'
import SortOption from './components/SortOption'
import Gender from './components/Gender'
import Button from '../../components/core/Button'
import theme from '../../styles/theme'

const FilterScreen = (props) => {
  const [availableToday, setAvailableToday] = useState(false);
  const [sort, setSort] = useState();
  const [gender, setGender] = useState();
  const {navigation} = props;

  return (
    <>
      <Header navigation={navigation}/>
      <Text style={styles.header}>Lọc</Text>
      <ScrollView style={{flex: 1}}>
        <Availability onChange={(value) => setAvailableToday(value)}/>
        <Divider style={styles.horizontalDivider} />
        <SortOption onChange={(value) => setSort(value)}/>
        <Divider style={styles.horizontalDivider} />
        <Gender onChange={(value) => setGender(value)}/>
      </ScrollView>
      <View>
      <Button
        primary
        title="Áp dụng"
        onPress={() => navigation.navigate('Doctor', {sort, gender, availableToday})}
        style={styles.button}
      />
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  header: {
    fontSize: 34,
    padding: 15
  },
  button: {
    marginHorizontal: 16,
    marginBottom: 15
  },
  horizontalDivider: {
    // marginVertical: 5,
    backgroundColor: theme.colors.lightGray
  },
})

export default FilterScreen