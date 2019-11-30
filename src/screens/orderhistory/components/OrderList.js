import React, { useState } from 'react'
import {View, Text, StyleSheet, FlatList} from 'react-native'
import FlatListItemSeperator from '../../../components/core/FlatListItemSeperator'
import OrderHitoryItem from './OrderHitoryItem'

const OrderList = props => {
    const { listOrder, navigation } = props

    return (
        <View style={styles.container}>
            <FlatList
                style={styles.list}
                data={listOrder.reverse()}
                showsVerticalScrollIndicator={false}
                // ItemSeparatorComponent={FlatListItemSeperator}
                renderItem={({item}) => <OrderHitoryItem item={item} navigation={props.navigation}/>}
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