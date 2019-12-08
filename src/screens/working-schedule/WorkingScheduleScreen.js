import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import theme from '../../styles/theme';

const WorkingScheduleScreen = props => {

    return (
        <View style={styles.container}>
            <Text>WorkingScheduleScreen</Text>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.white
    }
});

export default WorkingScheduleScreen;