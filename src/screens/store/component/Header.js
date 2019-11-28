import React, { useEffect, useState } from 'react'
import { Text, View, Animated, StatusBar, StyleSheet } from 'react-native'
import { withNavigation } from 'react-navigation'
import { Button, Icon } from 'react-native-elements'
import theme from '../../../styles/theme'

const AnimatedIcon = Animated.createAnimatedComponent(Icon)

function Header(props) {
  const {styleHeader} = props

  return (
    <Animated.View style={{
      backgroundColor: styleHeader.headerStyle,
      height: 50,
      alignItems: 'flex-end',
      justifyContent: 'space-between',
      borderBottomWidth: styleHeader.borderStyle,
      flexDirection: 'row',
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      borderColor: '#ccc',
      alignItems: 'center'
    }}>
      <Button
        icon={
          <AnimatedIcon
            type='material-community'
            name='arrow-left'
            color={styleHeader.backBtnStyle}
            size={28}
            
          />
        }
        onPress={() => props.navigation.navigate('Home')}
        buttonStyle={styles.btn}
      />
      <Animated.Text style={{ color: theme.colors.primary, opacity: styleHeader.borderStyle }}>Mr.Lam</Animated.Text>
      <Button
        icon={
          <AnimatedIcon
            type='material-community'
            name='bookmark-outline'
            color={styleHeader.backBtnStyle}
            size={28}
          />
        }
        onPress={() => props.goBack()}
        buttonStyle={styles.btn}
      />
    </Animated.View>
  )
}

const styles = StyleSheet.create({
    // backgroundColor: null
    btn: {
      backgroundColor: null
    }
})

export default withNavigation(Header)