import React, { useState, useRef, useEffect } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import BottomSheet from 'reanimated-bottom-sheet'
import theme from '../../../styles/theme'
import { ListItem, Icon, withBadge } from 'react-native-elements'

const Cart = props => {
  const { cart, handleItem, goToOrder, context } = props

  const [isOpenCart, setOpenCart] = useState(2)

  const bottomSheetRef = useRef(null)

  const getTotal = () => {
    let _total = 0
    cart.map(item => {
      _total += item.quantity * item.price
    })
    return _total
  }

  const handleGoToOrder = () => {
    goToOrder()
  }

  const renderHeader = () => {
    let totalElement = null
    let BadgedIcon = withBadge()(Icon)

    if (cart.length > 0) {
      cart.map(item => {
        totalElement += item.quantity
      })
    }

    if (totalElement) {
      BadgedIcon = withBadge(totalElement)(Icon)
    }

    return (
      <View style={styles.header} >
        <View style={styles.priceBar}>
          <ListItem
            key='cartHeader'
            title={getTotal().toString() + ' đ'}
            containerStyle={styles.priceBarInner}
            leftElement={
              <BadgedIcon size={40} name="store" iconStyle={styles.storeIcon} />
            }
            titleStyle={styles.cartText}
            onPress={handleCart}
          />
        </View>
        <TouchableOpacity style={styles.orderButton} onPress={() => handleGoToOrder()}>
            <Icon iconStyle={styles.storeIcon} size={30} name='cart-arrow-right' type='material-community' />
        </TouchableOpacity>
      </View>
    )
  }

  const handleCart = () => {
    if (isOpenCart === 2) {
      bottomSheetRef.current.snapTo(0)
    } else {
      bottomSheetRef.current.snapTo(2)
    }
  }

  const renderRightEle = item => {
    let inputItem = { ...item }

    if (cart.length > 0) {
      cart.map(cartItem => {
        if (cartItem._id === inputItem._id) {
          inputItem = { ...cartItem }
        }
      })
    }
    return ( 
      // <HandleStoreItem item={inputItem} handleItem={handleItem} />
      <View style={cart ? styles.inCartContainer : styles.handleQuantityContainer}>
      {  (inputItem.quantity && inputItem.quantity) > 0 && (
        <>
          <Icon
            type='font-awesome'
            name='minus-circle'
            iconStyle={styles.icon}
            onPress={() => handleItem(inputItem, -1)}
          />
          <Text style={styles.quantity}>
            {inputItem.quantity}
          </Text>
        </>
      )}

      {( inputItem.quantity && inputItem.quantity) ? <Icon
        type='font-awesome'
        name='plus-circle'
        iconStyle={styles.icon}
        onPress={() => handleItem(inputItem, 1)}
      />
        : <Icon
          type='material-community'
          name='plus-circle-outline'
          iconStyle={styles.icon}
          onPress={() => handleItem(inputItem, 1)}
        />}
    </View>
    )
  }

  const renderContent = () => {
    return (
      <View style={styles.content}>
        {cart.map(cartItem => {
          return (
            <ListItem
              key={cartItem.title}
              title={cartItem.title}
              subtitle={cartItem.price}
              containerStyle={styles.cartItem}
              rightElement={
                renderRightEle(cartItem)
              }
            />
          )

        })}
      </View>
    )
  }

  const onOpenEnd = () => {
    setOpenCart(0)
  }

  const onCloseEnd = () => {
    setOpenCart(2)
  }

  return (
    // <View style={styles.container}>
    <BottomSheet
      ref={bottomSheetRef}
      snapPoints={[650, 50, 50]}
      renderHeader={renderHeader}
      renderContent={renderContent}
      initialSnap={1}
      onOpenEnd={onOpenEnd}
      onCloseEnd={onCloseEnd}
      enabledManualSnapping
      enabledBottomClamp={true}
    />
    // </View>
  )
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: theme.colors.primary,
    height: 50,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: '100%'
  },
  content: {
    backgroundColor: theme.colors.favorite.backgroundGray,
    height: 600,
  },
  container: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  storeIcon: {
    color: theme.colors.white,
  },
  cartText: {
    color: theme.colors.white,
    fontSize: 24,
    fontFamily: 'SF-Pro-Text-Semibold',
    paddingLeft: 10,
  },
  btnOrder: {
    height: 50,
  },
  cart: {
    backgroundColor: 'black',
    // marginTop: 50
  },
  orderButton: {
    width: '15%',
    justifyContent:'center',
    alignItems:'flex-end',
    paddingRight: 16
  },
  priceBar: {
    width: '85%'
  },
  priceBarInner: {
    backgroundColor: theme.colors.primary,
    height: 50
  },
  cartItem: {
  },
  quantity: {
    paddingHorizontal: 10,
    fontSize: 20
  },
  icon: {
    color: theme.colors.primary,
  },
  handleQuantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inCartContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
})

export default Cart