import React, { useState } from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import FlatListItemSeperator from '../../../components/core/FlatListItemSeperator';
import AppointmentItem from './AppointmentItem';

const AppointmentList = props => {
    const [orders, setOrder] = useState([
        {id: 1, total: 20000, totalQuantity: 1 , date: 'Monday, October 24', time: '10:00 AM', doctor: 'High5 Coffee', clinic: '436 Dien Bien Phu, Thanh Khe, Da Nang'},
        {id: 2, total: 20000, totalQuantity: 1 ,date: 'Monday, October 24', time: '10:00 AM', doctor: 'High5 Coffee', clinic: '436 Dien Bien Phu, Thanh Khe, Da Nang'},
        {id: 3, total: 20000, totalQuantity: 1 ,date: 'Monday, October 24', time: '10:00 AM', doctor: 'High5 Coffee', clinic: '436 Dien Bien Phu, Thanh Khe, Da Nang'},
        {id: 4, total: 20000, totalQuantity: 1 ,date: 'Monday, October 24', time: '10:00 AM', doctor: 'High5 Coffee', clinic: '436 Dien Bien Phu, Thanh Khe, Da Nang'},
        {id: 5, total: 20000, totalQuantity: 1 ,date: 'Monday, October 24', time: '10:00 AM', doctor: 'High5 Coffee', clinic: '436 Dien Bien Phu, Thanh Khe, Da Nang'},
        {id: 6, total: 20000, totalQuantity: 1 ,date: 'Monday, October 24', time: '10:00 AM', doctor: 'High5 Coffee', clinic: '436 Dien Bien Phu, Thanh Khe, Da Nang'},
        {id: 7, total: 20000, totalQuantity: 1 ,date: 'Monday, October 24', time: '10:00 AM', doctor: 'High5 Coffee', clinic: '436 Dien Bien Phu, Thanh Khe, Da Nang'},
        {id: 8, total: 20000, totalQuantity: 1 ,date: 'Monday, October 24', time: '10:00 AM', doctor: 'High5 Coffee', clinic: '436 Dien Bien Phu, Thanh Khe, Da Nang'},
        {id: 9, total: 20000, totalQuantity: 1 ,date: 'Monday, October 24', time: '10:00 AM', doctor: 'High5 Coffee', clinic: '436 Dien Bien Phu, Thanh Khe, Da Nang'},
        {id: 10, total: 20000, totalQuantity: 1 ,date: 'Monday, October 24', time: '10:00 AM', doctor: 'High5 Coffee', clinic: '436 Dien Bien Phu, Thanh Khe, Da Nang'},
    ])

    return (
        <View style={styles.container}>
            <FlatList
                style={styles.list}
                data={orders}
                showsVerticalScrollIndicator={false}
                ItemSeparatorComponent={FlatListItemSeperator}
                renderItem={({item}) => <AppointmentItem item={item} navigation={props.navigation}/>}
                keyExtractor={item => item.id.toString()}
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

export default AppointmentList;