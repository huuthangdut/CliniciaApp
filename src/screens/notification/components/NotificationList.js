import React, { useState } from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import FlatListItemSeperator from '../../../components/core/FlatListItemSeperator';
import NotificationItem from './NotificationItem';

const NotificationList = props => {
    const [notifications, setNotifications] = useState([
        {id: 1, image: '', date: '10 min ago', content: 'Your order have been cancel', hasRead: true},
        {id: 2, image: '', date: '10 min ago', content: 'Your order have been cancel', hasRead: false},
        {id: 3, image: '', date: '10 min ago', content: 'Your order have been cancel', hasRead: true},
        {id: 4, image: '', date: '10 min ago', content: 'Your order have been cancel', hasRead: true},
        {id: 5, image: '', date: '10 min ago', content: 'Your order have been cancel', hasRead: false},
        {id: 6, image: '', date: '10 min ago', content: 'Your order have been cancel', hasRead: false},
        {id: 7, image: '', date: '10 min ago', content: 'Your order have been cancel', hasRead: true},
        {id: 8, image: '', date: '10 min ago', content: 'Your order have been cancel', hasRead: true},
        {id: 9, image: '', date: '10 min ago', content: 'Your order have been cancel', hasRead: true},
        {id: 10, image: '', date: '10 min ago', content: 'Your order have been cancel', hasRead: false},
        {id: 11, image: '', date: '10 min ago', content: 'Your order have been cancel', hasRead: true},
        {id: 12, image: '', date: '10 min ago', content: 'Your order have been cancel', hasRead: true},
    ])

    return (
        <View style={styles.container}>
            <FlatList
                style={styles.list}
                data={notifications}
                showsVerticalScrollIndicator={false}
                ItemSeparatorComponent={() => <FlatListItemSeperator marginVertical={0}/>}
                renderItem={({item}) => <NotificationItem item={item} navigation={props.navigation}/>}
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
        marginTop: 5
    }
});

export default NotificationList;