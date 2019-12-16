import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native'
import FlatListItemSeperator from '../../../components/core/FlatListItemSeperator'
import OrderHitoryItem from './OrderHitoryItem'

const OrderList = props => {
  const { listOrder, navigation, reload } = props

  const [isLoading, setLoading] = useState(false)

  const handleRefresh = () => {
    setLoading(true)
    reload()
  }

  useEffect(() => {
    setLoading(false)
  }, [listOrder])

  return (
    <View style={styles.container}>
      <FlatList
        onRefresh={handleRefresh}
        style={styles.list}
        data={listOrder}
        refreshing={isLoading}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => <OrderHitoryItem item={item} navigation={props.navigation} />}
        keyExtractor={item => item._id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  list: {
    marginTop: 2
  }
});

export default OrderList