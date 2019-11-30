import React, { useState, useEffect, useCallback } from 'react';
import {
  Text,
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native'
import { ListItem, Button, Overlay, Icon } from 'react-native-elements'
import OrderModal from './component/OrderModal'
import theme from '../../styles/theme'
import Header from '../../components/core/Header'
import WithContext from '../../components/core/WithContext'
import { AuthService } from '../../services/AuthService'
import { OrderService } from '../../services/OrderService'

const PaymentScreen = (props) => {
  const { navigation, context } = props
  const { user, loadOrderList } = context
  const { cart, storeId, deliveryAddress } = navigation.state.params

  const [isVisible, setIsVisible] = useState(false);

  const [paymentMethod, setPaymentMethod] = useState('')

  const [payment, setPayment] = useState([
    {
      id: 1,
      type: 'VNpay',
      card_info: '312381203813',
    },
    {
      id: 2,
      type: 'COD',
      card_info: 'Pay when received',
    }
  ])

  const createOrder = () => {
    const items = cart.map(item => {
      return { qty : item.quantity, food: item._id }
    })

    let data = {
      items: items,
      user: user.userId,
      delivery_address: deliveryAddress,
      restaurant: storeId
    }

    OrderService.createOrder(
      data,
      res => {
        console.log(res.data.data)
        loadOrderList()
      },
      err => {
        alert(err)
      }
    )
  }

  useEffect(() => {
    payment.map(item => {
      if(item.isSelect) {
        setPaymentMethod(item.type)
      }
    })
  }, [payment])

  const selectPayment = item => {
    setPayment(prev => {
      return prev.map(el =>
        el.id !== item.id ? { ...el, isSelect: false } : { ...item, isSelect: true }
      )
    })
  }

  const renderListPayment = ({ item }) => (
    <ListItem
      title={item.type}
      titleStyle={styles.listItemTitle}
      subtitle={item.card_info}
      subtitleProps={{ numberOfLines: 1 }}
      subtitleStyle={{
      }}
      onPress={() => selectPayment(item)}
      containerStyle={styles.listContainer}
      checkmark={{
        type: 'material-community',
        name: 'check-circle',
        color: theme.colors.primary,
        opacity: item.isSelect ? 1 : 0,
        size: 26,
      }}
      Component={TouchableOpacity}
      activeOpacity={0.5}
    />
  );

  const toggleModal = () => {
    setIsVisible(!isVisible);
  };

  const handleOrder = () => {
    toggleModal()
    createOrder()
  }

  return (
    <View style={{ backgroundColor: theme.colors.lightGray, flex: 1 }}>
      <Header navigation={navigation} title={'Payment'} />
      <View style={styles.shadow}>
        <Overlay
          isVisible={isVisible}
          animationType="slide"
          overlayStyle={{ borderRadius: 24 }}
          height={475}
        >
          <OrderModal navigation={navigation} hideModal={toggleModal} />
        </Overlay>
        <View style={styles.contentContainer}>
          <FlatList
            data={payment}
            renderItem={renderListPayment}
            keyExtractor={item => item.id}
            alwaysBounceVertical={false}
          />
          <Button
            disabled={paymentMethod === '' ? true : false}
            title="Payment"
            titleStyle={{ fontSize: 22 }}
            buttonStyle={{
              backgroundColor: theme.colors.primary,
              borderRadius: 8,
              marginBottom: 50
            }}
            onPress={() => handleOrder()}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: theme.colors.lightGray,
    height: '100%',
  },
  title: {
    textTransform: 'uppercase',
    fontSize: 16,
    marginBottom: 16,
  },
  listItemTitle: {
    textTransform: 'uppercase',
    color: theme.colors.primary,
    marginBottom: 4,
    fontSize: 14,
  },
  listContainer: {
    borderColor: theme.colors.primary,
    backgroundColor: theme.colors.lightGray,
    marginBottom: 10,
    flex: 1,
    backgroundColor: theme.colors.white,
    borderRadius: 10
  },
});

export default WithContext(PaymentScreen)