import React, { useState } from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import FlatListItemSeperator from '../../../components/core/FlatListItemSeperator';
import AppointmentItem from './AppointmentItem';

const AppointmentList = props => {
    const [appointments, setAppointments] = useState([
        {id: 1, image: '', date: 'Monday, October 24', time: '10:00 AM', doctor: 'Edward Janowski', clinic: 'Hoan My Hospital '},
        {id: 2, image: '', date: 'Monday, October 24', time: '10:00 AM', doctor: 'Edward Janowski', clinic: 'Hoan My Hospital'},
        {id: 3, image: '', date: 'Monday, October 24', time: '10:00 AM', doctor: 'Edward Janowski', clinic: 'Hoan My Hospital'},
        {id: 4, image: '', date: 'Monday, October 24', time: '10:00 AM', doctor: 'Edward Janowski', clinic: 'Hoan My Hospital'},
        {id: 5, image: '', date: 'Monday, October 24', time: '10:00 AM', doctor: 'Edward Janowski', clinic: 'Hoan My Hospital'},
        {id: 6, image: '', date: 'Monday, October 24', time: '10:00 AM', doctor: 'Edward Janowski', clinic: 'Hoan My Hospital'},
        {id: 7, image: '', date: 'Monday, October 24', time: '10:00 AM', doctor: 'Edward Janowski', clinic: 'Hoan My Hospital'},
        {id: 8, image: '', date: 'Monday, October 24', time: '10:00 AM', doctor: 'Edward Janowski', clinic: 'Hoan My Hospital'},
        {id: 9, image: '', date: 'Monday, October 24', time: '10:00 AM', doctor: 'Edward Janowski', clinic: 'Hoan My Hospital'},
        {id: 10, image: '', date: 'Monday, October 24', time: '10:00 AM', doctor: 'Edward Janowski', clinic: 'Hoan My Hospital'}
    ])

    return (
        <View style={styles.container}>
            <FlatList
                style={styles.list}
                data={appointments}
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