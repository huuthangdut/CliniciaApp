import React, { useState, useEffect, useCallback } from 'react';
import {
  Text,
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'
import { ListItem, Button, Overlay, Icon } from 'react-native-elements'
import OrderModal from './component/OrderModal'
import theme from '../../styles/theme'
import Header from '../../components/core/Header'
import WithContext from '../../components/core/WithContext'
import { AuthService } from '../../services/AuthService'

const ReviewOrderScreen = (props) => {
  const { navigation, context } = props
  const { user } = context

  const [isVisible, setIsVisible] = useState(false);
  const [state, setstate] = useState({
    location: [
      {
        id: 1,
        type: 'home address',
        address: '382 Ton Duc Thang, Lien Chieu, Da Nang',
      },
      {
        id: 2,
        type: 'workplace',
        address: '54 Nguyen Luong Bang, Hoa Khanh, Da Nang',
      },
      {
        id: 3,
        type: 'workplace',
        address: '54 Nguyen Luong Bang, Hoa Khanh, Da Nang',
      },
      {
        id: 4,
        type: 'workplace',
        address: '54 Nguyen Luong Bang, Hoa Khanh, Da Nang',
      },
    ],

  });

  const [locations, setLocation] = useState([])
  const [payment, setPayment] = useState([
    {
      id: 1,
      type: 'VNpay',
      card_info: '312381203813',
    },
    {
      id: 2,
      type: 'Cash',
      card_info: 'Giao hang truc tiep',
    }
  ])

  useEffect(() => {
    getLocation()
  }, [])

  const getLocation = () => {
    AuthService.getLocations(
      user.userId,
      res => {
        setLocation(res.data.data.user.location)
      },
      err => {
        alert(err)
      }
    )
  }

  const selectAddress = selectedItem => {
    setLocation(prev => {
      return prev.map(item =>
        (item.lat + item.long) !== (selectedItem.lat + selectedItem.long) ? { ...item, isSelect: false } : { ...selectedItem, isSelect: true }
      )
    })
  };

  const selectPayment = item => {
    setPayment(prev => {
      return prev.map(el =>
        el.id !== item.id ? { ...el, isSelect: false } : { ...item, isSelect: true }
      )
    })
  }

  const renderListAdress = ({ item }) => (
    <ListItem
      key={item.lat + item.long}
      contentContainerStyle={{
        marginHorizontal: -5,
      }}
      subtitle={item.address}
      subtitleProps={{ numberOfLines: 1 }}
      subtitleStyle={{
        // fontFamily: theme.text.fonts.sfpt,
      }}
      onPress={() => selectAddress(item)}
      containerStyle={[
        styles.listContainer,
        {
          borderWidth: item.isSelect ? 1 : 0,
        },
      ]}
      checkmark={{
        color: theme.colors.primary,
        type: 'material-community',
        name: 'check-circle',
        opacity: item.isSelect ? 1 : 0,
        size: 26,
      }}
      Component={TouchableOpacity}
      activeOpacity={0.5}
    />
  );

  const renderListPayment = ({ item }) => (
    <ListItem
      title={item.type}
      titleStyle={styles.listItemTitle}
      contentContainerStyle={{
        marginHorizontal: -5,
      }}
      subtitle={item.card_info}
      subtitleProps={{ numberOfLines: 1 }}
      subtitleStyle={{
        // fontFamily: theme.text.fonts.sfpt,
      }}
      onPress={() => selectPayment(item)}
      containerStyle={[
        styles.listContainer,
        {
          borderWidth: item.isSelect ? 1 : 0,
        },
      ]}
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

  return (
    <View style={{ backgroundColor: theme.colors.lightGray, flex: 1 }}>
      {/* {console.log('after' + locations)} */}
      <Header navigation={navigation}/>
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
          <View >
            <View style={{ maxHeight: 280 }}>
              <Text style={styles.title}>delivery address</Text>
              <FlatList
                data={locations}
                renderItem={renderListAdress}
                keyExtractor={item => item.lat + item.long}
                extraData={locations}
                alwaysBounceVertical={false}
              />
            </View>
            <View style={{ maxHeight: 280, marginTop: 20 }}>
              <Text style={styles.title}>payment method</Text>
              <FlatList
                data={payment}
                renderItem={renderListPayment}
                keyExtractor={item => item.id}
                alwaysBounceVertical={false}
              />
            </View>
          </View>
          <Button
            title="Payment"
            buttonStyle={{
              backgroundColor: theme.colors.primary,
              marginTop: 50,
            }}
            onPress={() => toggleModal()}
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
    backgroundColor: '#fff',
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
    flex: 1
  },
});

ReviewOrderScreen.navigationOptions = ({ navigation }) => {
  return {
    headerBackImage: (
      <Button
        icon={
          <Icon
            type="material-community"
            name="arrow-left"
            color={theme.colors.primary}
            size={28}
          />
        }
        onPress={() => navigation.navigate('Home')}
        buttonStyle={{
          backgroundColor: null,
        }}
      />
    ),
  };
};

export default WithContext(ReviewOrderScreen)