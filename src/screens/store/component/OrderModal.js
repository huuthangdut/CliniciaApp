import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import theme from '../../../styles/theme';
import { StackActions } from 'react-navigation';


function OrderModal(props) {
  const { navigation, hideModal } = props;
  return (
    <View
      style={{ alignItems: 'center', justifyContent: 'space-evenly', flex: 1 }}
    >
      <Icon
        type="material-community"
        name="check"
        color={theme.colors.primary}
        size={80}
        containerStyle={{
          borderColor: 'rgba(255,140,0,0.3)',
          borderWidth: 6,
          width: 120,
          height: 120,
          borderRadius: 60,
          alignSelf: 'center',
          justifyContent: 'center',
        }}
      />
      <Text style={styles.title}>Success</Text>
      <Button
        title="Continue Shopping"
        onPress={() => {
          hideModal();
          navigation.dispatch(StackActions.popToTop());
        }}
        buttonStyle={{
          backgroundColor: theme.colors.primary,
          width: 235,
          height: 44,
          borderRadius: 22,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    // fontFamily: theme.text.fonts['sfpt-bold'],
    fontSize: 28,
  },
});

export default OrderModal;
