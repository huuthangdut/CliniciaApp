import React, {Fragment, useState} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import theme from '../../styles/theme';
import Header from '../../components/core/Header';
import CheckingServiceList from './components/CheckingServiceList';
import { Icon } from 'react-native-elements';

const CheckingServiceScreen = props => {
    const {navigation} = props;

    return (
        <Fragment>
            <Header navigation={navigation} hasBackIcon={true}/>
            <View style={styles.container}>
                <Text style={styles.header}>Quản lý dịch vụ khám</Text>
                <View style={styles.list}>
                    <CheckingServiceList navigation={navigation}/>
                </View>
            </View>
            <TouchableOpacity style={styles.addButton} activeOpacity={0.7} onPress={() => navigation.navigate('AddCheckingService')}>
                <Icon type="ionicon" name="ios-add-circle" size={60} color={theme.colors.primary}/>
            </TouchableOpacity>
        </Fragment>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'white',
        paddingHorizontal: 20,
    },
    header: {
        fontSize: 28,
        fontFamily: 'SF-Pro-Display-Bold',
    },
    list: {
        flex: 1,
        marginTop: 10
    },
    addButton: {
        position: 'absolute',
        bottom: 10,
        right: 20,
        zIndex: 9999
    }
});

export default CheckingServiceScreen;