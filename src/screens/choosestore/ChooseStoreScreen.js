import React, { useRef, useState, useEffect } from 'react';
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

const ChooseStoreScreen = props => {
  const { navigation } = props
  const { storeRestaurant, user } = props.context
  

  const [listStore, setListStore] = useState()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (user.userId) {
      getUserStore()
    }
  }, [user])

  useEffect(() => {
    ToastAndroid.show('Creat store successfully', ToastAndroid.SHORT)
    if (navigation.state.params && navigation.state.params.reload) {
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
        navigation.navigate('App')
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
          <Header title='Choose a Store' />
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
              <View style={{ justifyContent: "center", alignSelf: 'center', marginTop: '50%' }}>
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
      {loading && <ActivityIndicator />}
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
