import React from 'react';
import { View } from 'react-native';
import NormalCart from './component/NormalCart';
import theme from '../../styles/theme';

function CheckoutScreen(props) {
  const { navigation } = props
  const { cart, storeId} = navigation.state.params

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.lightGray }}>
      <NormalCart navigation={navigation} cart={cart} storeId={storeId} />
    </View>
  );
}

export default CheckoutScreen;
