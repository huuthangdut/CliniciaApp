import React, { useRef, useState, useEffect, useContext } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Text,
  ToastAndroid
} from 'react-native';
import theme from '../../styles/theme'
import WithContext from '../../components/core/WithContext'
import Header from '../../components/core/Header';
import StoreService from '../../services/StoreService';
import { ListItem, Icon } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { NotificationService } from '../../services/NotificationService';
import { NotificationContext } from '../../components/core/NotificationsContext';

const ChooseStoreScreen = props => {
  const { navigation } = props
  const { storeRestaurant, user, loadOrderList } = props.context
  const notificationContext = useContext(NotificationContext)

  const [listStore, setListStore] = useState()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (user.userId) {
      getUserStore()
    }
  }, [user])

  useEffect(() => {
    if (navigation.state.params && navigation.state.params.reload) {
      ToastAndroid.show('Creat store successfully', ToastAndroid.SHORT)
      getUserStore()
    }
  }, [navigation.state.params])

  const getUserStore = () => {
    setLoading(true)

    StoreService.getRestaurantByMerchant(
      user.userId,
      res => {
        setListStore(res.data.data.restaurantByMerchant)
        setLoading(false)
      },
      err => {
        alert(err)
      }
    )
  }

  const chooseStore = choosenStore => {
    StoreService.getStore(
      choosenStore._id,
      res => {
        storeRestaurant(res.data.data.restaurantById)
        navigation.navigate('OrderHisTory', {pickStore : res.data.data.restaurantById._id})
        saveStoreDivice(choosenStore._id)
      },
      err => {
        alert(err)
      }
    )
  }
  
  const saveStoreDivice = storeId => {
    let data = {
      restaurant: storeId,
      token: notificationContext.fcmToken.get,
      deviceId: notificationContext.deviceId.get,
      user: user.userId
    }
    NotificationService.updateDevice(
      data,
      res => {
      },
      err => {
        alert(err)
      }
    )

  }

  return (
    <View style={styles.root}>
      <>
        <View>
          <Header hasBackIcon={false} title='Choose a Store' />
          {loading && <ActivityIndicator size={50} style={{ marginTop: '70%' }} />}
          {listStore && listStore.length > 0 ?
            (<FlatList
              data={listStore}
              renderItem={({ item }) =>
                <ListItem
                  title={item.name}
                  subtitle={item.location.address}
                  Component={TouchableOpacity}
                  containerStyle={styles.itemContainer}
                  onPress={() => chooseStore(item)}
                  key={item._id}
                />
              }
              keyExtractor={item => item._id}
            />)
            :
            (
              !loading && <View style={{ justifyContent: "center", alignSelf: 'center', marginTop: '50%' }}>
                <Text style={{
                  fontSize: 30,
                  color: theme.colors.lightGray,
                  fontWeight: 'bold'
                }}>Store list is empty</Text>
                <Text style={{
                  fontSize: 30,
                  color: theme.colors.lightGray,
                  fontWeight: 'bold'
                }}>Create new store</Text>
              </View>
            )
          }
        </View>
        <View style={styles.addBtnContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('CreateStore', { userId: user.userId })}>
            <Icon
              type='material-community'
              name='plus'
              containerStyle={{
              }}
              size={45}
              color={theme.colors.white}
            />
          </TouchableOpacity>
        </View>
      </>

    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: theme.colors.lightGray,
    marginHorizontal: 10,
    marginTop: 10,
    padding: 10,
    height: 80,
    borderRadius: 10
  },
  addBtnContainer: {
    backgroundColor: theme.colors.primary,
    borderRadius: 30,
    position: 'absolute',
    zIndex: 1000,
    bottom: 30,
    right: 30,
    justifyContent: 'center',
    alignItems: 'center'
  },
  root: {
    position: 'relative',
    flex: 1
  }
});

export default WithContext(ChooseStoreScreen);
