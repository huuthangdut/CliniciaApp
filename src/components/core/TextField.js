import React, { forwardRef } from 'react';
import { TextInput, StyleSheet } from 'react-native';
import theme from '../../styles/theme';

const TextField = forwardRef((props, ref) => {
    return (
        <TextInput 
            ref={ref}
            placeholderTextColor={theme.colors.gray}
            style={[styles.textInput, props.containerStyle]}
            {...props}
        />
    );
})

const styles = StyleSheet.create({
    textInput: {
        borderRadius: 25,
        height: 45,
        borderWidth: 1,
        borderColor: theme.colors.lightGray,
        paddingHorizontal: 16,
        marginBottom: 20,
        fontSize: 17,
        fontFamily: 'SF-Pro-Text-Regular',
        backgroundColor: theme.colors.lightGray
    }
});

export default TextField;