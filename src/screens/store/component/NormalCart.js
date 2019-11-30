import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, StyleSheet, FlatList, Picker, PickerItem } from 'react-native';
import { Icon, Button, Divider } from 'react-native-elements';
import CostDetail from './CostDetail';
import CartItem from './CartItem';
import theme from '../../../styles/theme';
import Header from '../../../components/core/Header'
import { AuthService } from '../../../services/AuthService'
import WithContext from '../../../components/core/WithContext'

function NormalCart(props) {
  const { navigation, cart, storeId, context } = props
  const { user } = context

  const [subTotal, setSubtotal] = useState(0)
  const [delivery, setDelivery] = useState(0)
  const [total, setTotal] = useState(0)
  const [discount, setDiscount] = useState(0)
  const [deliveryAddress, setDeliveryAddress] = useState(0)
  const [addresses, setAddresses] = useState([])

  useEffect(() => {
    getAddresses()
    getPrice()
  },[])

  const getAddresses = () => {
    AuthService.getLocations(
      user.userId,
      res => {
        setAddresses(res.data.data.user.location)
      },
      err => {
        alert(err)
      }
    )
  }

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
      <Header navigation={navigation} title='Checkout Cart' />
      <View style={styles.shadow}>
        <View style={styles.contentContainer}>
          <Picker
            itemStyle={styles.pickerItem}
            style={styles.locationPicker}
            selectedValue={deliveryAddress}
            onValueChange={(itemValue) => setDeliveryAddress(itemValue)}
          >
            {addresses.map((item, index) => {
              return(
                <Picker.Item  label={item.address} value={item.address} key={index.toString()}/>
              )
            })}
          </Picker>
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
          onPress={() => navigation.navigate('ReviewOrder', { cart: cart, storeId: storeId, deliveryAddress: deliveryAddress })}
        />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  storeName: {
    fontSize: 24,
  },
  storeInfo: {
    // backgroundColor: '#f3f3f3',
  },
  contentContainer: {
    // backgroundColor: '#fff',
    height: 400,
  },
  addressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  addressInfo: {
    fontSize: 18,
    color: theme.colors.gray,
  },
  list: { 
    paddingHorizontal: 20,
    marginTop: 10
  },
  total: {
    marginTop: 100,
    paddingHorizontal: 16,
    borderTopWidth: 0.5,
    borderColor: theme.colors.lightGray,
    backgroundColor: '#fff',
    height: '100%',
  },
  locationPicker: {
    marginHorizontal: 20,
    marginTop: 10,
  },
  pickerItem: {
    
  }
})

export default WithContext(NormalCart)
