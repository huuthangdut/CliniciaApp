import React from 'react';
import {View, StyleSheet, Image, Text} from 'react-native';
import theme from '../../styles/theme';

const EmptyList = props => {
  return (
    <View style={styles.container}>
        <Image style={styles.image} resizeMode="contain" source={theme.icons.empty}></Image>
        <Text style={styles.text}>{props.text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        height: 150,
        width: 150,
        marginRight: 10
    },
    text: {
        fontSize: 14,
        fontFamily: 'SF-Pro-Text-Regular',
        textAlign: 'center',
        color: theme.colors.gray
    }
})

export default EmptyList;
