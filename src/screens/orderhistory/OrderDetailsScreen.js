import React, { Fragment, useEffect, useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native'
import OrderHistoryStatus from './components/OrderHistoryStatus'
import Button from '../../components/core/Button'
import theme from '../../styles/theme'
import Header from '../../components/core/Header'
import FormatTime from '../../helper/FormatTime'
import { ListItem } from 'react-native-elements'
import { OrderService } from '../../services/OrderService'
import WithContext from '../../components/core/WithContext'

const OrderDetailsScreen = props => {
  const { navigation, context } = props
  const { orderDetail } = navigation.state.params
  const { loadOrderList } = context

  const [total, setTotal] = useState(0)
  const [itemsQuan, setItemsQuan] = useState(0)
  const [status, setStatus] = useState('')

  useEffect(() => {
    getTotal()
    getItemsQuan()
    setStatus(orderDetail.status)
  }, [])

  const getTotal = () => {
    let _total = orderDetail.items.reduce((accumulator, currentValue) => {
      accumulator += currentValue.qty * currentValue.food.price
      return accumulator
    }, 0)
    _total+= orderDetail.shipping_fee
    setTotal(_total)
  }

  const getItemsQuan = () => {
    let _total = orderDetail.items.reduce((accumulator, currentValue) => {
      accumulator += currentValue.qty
      return accumulator
    }, 0)

    setItemsQuan(_total)
  }

  const rejectOrder = () => {
    OrderService.changeOrderStatus(
      orderDetail._id,
      'rejected',
      res => {
        setStatus(res.data.data.updateOrder.status)
        loadOrderList()
        navigation.navigate('OrderHisTory')
      },
      err => {
        alert(err)
      }
    )
  }

  const confirmOrder = () => {
    OrderService.changeOrderStatus(
      orderDetail._id,
      'confirmed',
      res => {
        setStatus(res.data.data.updateOrder.status)
        loadOrderList()
        navigation.navigate('OrderHisTory')
      },
      err => {
        alert(err)
      }
    )
  }

  return (
    <Fragment>
      <Header title='Order detail' navigation={navigation}/>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <View style={styles.headerInfo}>
            <View style={styles.headerTextWrapper}>
              <Text style={styles.headerText}>{orderDetail.user.firstName} {orderDetail.user.lastName}</Text>

            </View>
          </View>
          <View style={styles.content}>
            <View style={{ ...styles.itemRow, ...styles.firstRow }}>
              <Text style={styles.smText}>{FormatTime.FormatTimeFromMili(parseInt(orderDetail.createdAt))}</Text>
              <OrderHistoryStatus type={status} />
            </View>
            <View style={styles.itemRow}>
              <Text style={styles.smText}>Delivery address</Text>
              <Text style={styles.lgText}>{orderDetail.delivery_address}</Text>
              <Text style={styles.smText}>{orderDetail.distance} km away</Text>
            </View>
            <View style={styles.itemRow}>
              <Text style={styles.lgText}>{"Order Items"}</Text>
              <Text style={styles.smText}>{itemsQuan} item(s)</Text>
            </View>
            <View style={styles.listFood}>
              {
                orderDetail.items.map((item, index) => {
                  return (
                    <ListItem
                      key={index.toString()}
                      title={item.food.name}
                      containerStyle={{
                        height: 15,
                        width: '100%',
                        backgroundColor: theme.colors.lightGray,
                        paddingHorizontal: 0
                      }}
                      titleStyle={{
                        fontSize: 15,
                        // textAlign:'center'
                      }}
                      bottomDivider={index === orderDetail.items.length -1 ? true : false}
                      rightElement={
                        <Text>
                          {item.qty} x {item.food.price} d
                      </Text>
                      }
                    />
                  )
                })
              }
              <ListItem
                key={'shipping_fee'}
                title='Shipping fee'
                containerStyle={{
                  height: 15,
                  width: '100%',
                  backgroundColor: theme.colors.lightGray,
                  paddingHorizontal: 0,
                  marginBottom: 5
                }}
                bottomDivider
                titleStyle={{
                  fontSize: 15,
                  // textAlign:'center'
                }}
                rightElement={
                  <Text>
                    {orderDetail.shipping_fee} d
                      </Text>
                }
              />
              <ListItem
                key={'total'}
                title='Total'
                containerStyle={{
                  height: 15,
                  width: '100%',
                  backgroundColor: theme.colors.lightGray,
                  paddingHorizontal: 0
                }}
                titleStyle={{
                  fontSize: 25,
                  fontWeight: 'bold',
                  color: theme.colors.primary
                }}
                rightElement={
                  <Text style={{
                    fontSize: 25,
                    fontWeight: 'bold',
                    color: theme.colors.primary
                  }}>
                    {total} d
                  </Text>
                }
              />
            </View>
            <View style={styles.itemRow}>
              <Text style={styles.smText}>Payment Method</Text>
              <Text style={styles.lgText}>{orderDetail.payment_method}</Text>
            </View>
          </View>
          {
            orderDetail && orderDetail.status === 'waitting' && (
              <View style={styles.groupBtn}>
                <Button
                  title="Reject Order"
                  onPress={() => rejectOrder()}
                  style={styles.cancelBtn}
                  titleStyle={{ color: theme.colors.primary }} />
                <Button
                  title="Confirm Order"
                  onPress={() => confirmOrder()}
                  primary
                  style={{ ...styles.confirmBtn, }}
                />
              </View>
            )
          }
        </View>
      </ScrollView>
    </Fragment>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    paddingHorizontal: 20,
  },
  headerInfo: {
    height: 50,
  },
  headerTextWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    flex: 1,
    textTransform: "uppercase",
    color: theme.colors.darkGray,
    marginLeft: 20
  },
  contact: {
    width: 100,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconWrapper: {
    width: 45,
    height: 45,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    color: theme.colors.primary,
  },
  divider: {
    height: 1,
    width: '100%',
    backgroundColor: theme.colors.lightGray,
    marginVertical: 5,
  },
  content: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: theme.colors.lightGray,
    padding: 20,
    borderRadius: 25
  },
  itemRow: {
    marginVertical: 10,
  },
  smText: {
    fontSize: 13,
    fontFamily: 'SF-Pro-Text-Medium',
    color: theme.colors.gray,
    lineHeight: 20,
  },
  lgText: {
    fontSize: 16,
    fontFamily: 'SF-Pro-Text-Medium',
    lineHeight: 25,
  },
  cancelBtn: {
    marginVertical: 15,
    width: 180,
  },
  confirmBtn: {
    marginVertical: 15,
    width: 180,
  },
  listFood: {
    backgroundColor: theme.colors.lightGray,
  },
  firstRow: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  groupBtn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  }
})

export default WithContext(OrderDetailsScreen)
