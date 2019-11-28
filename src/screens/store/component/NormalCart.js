import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, StyleSheet, FlatList } from 'react-native';
import { Icon, Button, Divider } from 'react-native-elements';
import CostDetail from './CostDetail';
import CartItem from './CartItem';
import theme from '../../../styles/theme';
import Header from '../../../components/core/Header'

function NormalCart(props) {
  const { navigation, cart, storeId } = props;

  const [subTotal, setSubtotal] = useState(0)
  const [delivery, setDelivery] = useState(0)
  const [total, setTotal] = useState(0)
  const [discount, setDiscount] = useState(0)
  const [deliveryAddress, setDeliveryAddress] = useState(0)

  useEffect(() => {
    getPrice()
  })

  const getPrice = () => {
    let sub = 0

    cart && cart.map(item => {
      sub += item.quantity * item.price
    })

    setSubtotal(sub)
    setTotal(sub)
  }

  return (
    <View>
        <Header navigation={navigation}/>
      <View style={styles.shadow}>
        <View style={styles.contentContainer}>
          <View style={styles.storeInfo}>
            <Text style={styles.storeName}>{cart.storeName}</Text>
            <View style={styles.addressRow}>
              <Icon
                type="material-community"
                name="map-marker"
                color={theme.colors.gray}
                size={18}
              />
              <Text style={styles.addressInfo} numberOfLines={1}>
                {deliveryAddress}
              </Text>
            </View>
            {/* <View
              style={{
                backgroundColor: theme.colors.primary,
                alignSelf: 'flex-start',
                paddingHorizontal: 12,
                paddingVertical: 2,
                borderRadius: 12,
              }}
            >
              <Text style={{ color: '#fff', fontSize: 16 }}>Promotion</Text>
            </View> */}
          </View>
          <FlatList
            data={cart}
            renderItem={({ item }) => <CartItem item={item} />}
            keyExtractor={item => `item${item._id}`}
            contentContainerStyle={styles.list}
          />
        </View>
      </View>
      <SafeAreaView style={styles.total}>
        <CostDetail title="SubTotal" price={subTotal} />
        <CostDetail title="Delivery" price={delivery} />
        <Divider style={{ backgroundColor: theme.colors.gray }} />
        <CostDetail
          title="Total"
          price={total}
          style={{
            // fontFamily: theme.text.fonts['sfpt-bold'],
            fontSize: 20,
          }}
        />
        <Button
          title="Continue"
          titleStyle={{ fontSize: 22 }}
          buttonStyle={{
            backgroundColor: theme.colors.primary,
            borderRadius: 8,
            marginTop: 16,
          }}
          activeOpacity={0.5}
          onPress={() => navigation.navigate('ReviewOrder', { cart: cart,storeId: storeId})}
        />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  storeName: {
    // fontFamily: theme.text.fonts['sfpt-bold'],
    fontSize: 24,
  },
  storeInfo: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderColor: theme.colors.lightGray,
    paddingHorizontal: 16,
    backgroundColor: '#f3f3f3',
  },
//   shadow: theme.shadow,
  contentContainer: {
    backgroundColor: '#fff',
    height: 400,
    borderRadius: 8,
    // marginTop: 16,
    marginHorizontal: 16,
  },
  addressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  addressInfo: {
    // fontFamily: theme.text.fonts['sfpt-medium'],
    fontSize: 18,
    color: theme.colors.gray,
  },
  list: { paddingHorizontal: 16 },
  total: {
    marginTop: 100,
    paddingHorizontal: 16,
    borderTopWidth: 0.5,
    borderColor: theme.colors.lightGray,
    backgroundColor: '#fff',
    height: '100%',
  },
});

export default NormalCart;
