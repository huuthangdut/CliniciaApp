import React, { useState}from 'react'
import { StyleSheet, View, ScrollView } from 'react-native'
import { ListItem, Text } from 'react-native-elements'
import Availability from './components/Availability'
import Header from '../../components/core/Header'
import SortOption from './components/SortOption'
import Gender from './components/Gender'
import WorkExperience from './components/WorkExperience'
import PriceRange from './components/PriceRange'
import StarRating from './components/StarRating'
import Button from '../../components/core/Button'

const FilterScreen = () => {
  const [sortOptions, setSortOption] = useState([
    { val: 'highRating', title: 'Star rating (Highest First)' },
    { val: 'lowRating', title: 'Star rating (Lowest First)' },
    { val: 'highPrice', title: 'Price (Highest First)' },
    { val: 'lowPrice', title: 'Price (Lowest First)' }
  ])

  return (
    <ScrollView>
      <Header/>
      <Text style={styles.header}>Filter</Text>
      <Availability/>
      <SortOption/>
      <Gender/>
      <WorkExperience/>
      <PriceRange/>
      <StarRating/>
      <Button
        primary
        title="Apply"
        // onPress={() => navigation.navigate('ReviewAppointment')}
        style={styles.button}
      />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  header: {
    fontSize: 34,
    padding: 15
  },
  button: {
    marginHorizontal: 16,
  }
})

export default FilterScreen