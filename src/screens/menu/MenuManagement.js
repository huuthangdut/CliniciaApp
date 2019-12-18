import React, { Fragment, useState, useEffect } from 'react'
import { View, StyleSheet, Text, TouchableOpacity, ActivityIndicator, ToastAndroid, ScrollView } from 'react-native'
import theme from '../../styles/theme'
import Header from '../../components/core/Header'
import WithContext from '../../components/core/WithContext'
import Accordion from 'react-native-collapsible/Accordion'
import { ListItem, Icon, Overlay } from 'react-native-elements'
import StoreService from '../../services/StoreService'
import AddDishTypeModal from './components/AddDishTypeModal'
import TextField from '../../components/core/TextField'

const MenuManagementScreen = props => {
  const { context } = props
  const { choosenRestaurant } = context

  const [activeSections, setActiveSections] = useState([])
  const [menu, setMenu] = useState([])
  const [isAddFoodOpen, setAddFoodOpen] = useState(false)
  const [isAddDishOpen, setAddDishOpen] = useState(false)
  const [choosenDishtype, setChoosenDishtype] = useState('')
  const [newDishType, setNewDishType] = useState('')
  const [dishtypeErr, setDishTypeErr] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    getMenu()
  }, [])

  const _renderHeader = section => {
    return (

      <View style={styles.header}>
        {/* <Text style={styles.headerText}>{section.name}</Text> */}
        <ListItem
          title={section.name}
          containerStyle={styles.headerText}
          rightElement={() => (
            <Icon
              type='material-community'
              name='arrow-down-drop-circle'
              color={theme.colors.primary}
            />
          )}
          titleStyle={{
            fontSize: 15,
            fontWeight: 'bold',
            marginLeft: 20,
            color: theme.colors.darkGray
          }}
        />
      </View>
    )
  }

  const openAddFoodModal = dishtype => {
    setAddFoodOpen(true)
    setChoosenDishtype(dishtype)
  }

  const getFoodData = (res, dishtype) => {
    getMenu()
    setAddFoodOpen(false)
    ToastAndroid.show('Add ' + res[0].name + ' to ' + dishtype.name + ' successfully !', ToastAndroid.SHORT)
  }

  const _renderContent = section => {
    return (
      <View style={styles.content}>
        <Overlay
          isVisible={isAddFoodOpen}
          animationType="fade"
          overlayStyle={{ borderRadius: 15 }}
          height={330}
          onBackdropPress={() => setAddFoodOpen(false)}
        >
          <AddDishTypeModal sendData={getFoodData} choosenDishtype={choosenDishtype} />
        </Overlay>
        {section.foods.map(item => (
          <ListItem
            title={item.name}
            subtitle={item.price + ' d'}
            bottomDivider
            containerStyle={{
              // backgroundColor: theme.colors.lightGray
            }}
            key={item._id}
          />
        ))}
        <TouchableOpacity onPress={() => openAddFoodModal(section)}>
          <ListItem
            title="Add Food"
            titleStyle={{
              color: theme.colors.primary,
              fontWeight: 'bold'
            }}
            bottomDivider
            rightIcon={() => (
              <Icon
                type='material-community'
                name='plus'
                color={theme.colors.primary}
              />
            )}
          />
        </TouchableOpacity>
      </View>
    )
  }

  const _updateSections = _activeSections => {
    setActiveSections(_activeSections)
  }

  const getMenu = () => {
    setLoading(true)

    StoreService.getMenu(
      choosenRestaurant._id,
      res => {
        setLoading(false)
        setMenu(res.data.data.menuByRestaurant)
      },
      err => {
        setLoading(false)
        alert(err)
      }
    )
  }

  const handleAddDishType = () => {
    let data = {
      restaurant: choosenRestaurant._id,
      name: newDishType
    }

    StoreService.addDishType(
      data,
      () => {
        getMenu()
        setNewDishType('')
        setAddDishOpen(false)
        ToastAndroid.show('Add dishtype successfully', ToastAndroid.SHORT)
      },
      err => {
        alert(err)
      }
    )
  }

  const renderEmpty = () => 
    <View style={{ justifyContent: "center", alignSelf: 'center', marginTop: '60%' }}>
      <Text style={{
        fontSize: 30,
        color: theme.colors.lightGray,
        fontWeight: 'bold',
        textAlign: "center"
      }}>Menu is empty</Text>
      <Text style={{
        fontSize: 30,
        color: theme.colors.lightGray,
        fontWeight: 'bold',
        textAlign: "center"
      }}>Create new</Text>
    </View>

  return (
    <View style={{ flex: 1 }}>
      <Header hasBackIcon={false} title='Menu Management' />
      {loading && <ActivityIndicator size={50} style={{ justifyContent: 'center', marginTop: '70%'}} />}
      <ScrollView>
      {menu.length > 0 ? (
        <Accordion
        sections={menu}
        activeSections={activeSections}
        renderHeader={_renderHeader}
        renderContent={_renderContent}
        onChange={_updateSections}
      />
      ) :
      !loading && renderEmpty()
      }
      
      
      {isAddDishOpen && <View style={styles.addDishTypeActionContainer}>
        <View>
          <TextField
            placeholder='Enter dish type name'
            containerStyle={{}}
            autoFocus
            errText={dishtypeErr}
            onChangeText={(value) => {
              if (!value || value.trim() === '') {
                setDishTypeErr('Name of Dish Type is required !')
              } else {
                setDishTypeErr('')
              }
              setNewDishType(value)
            }}
          />
          <Text style={styles.validateText}>{dishtypeErr}</Text>
        </View>
        <View style={styles.addDishTypeAction}>
          <TouchableOpacity onPress={() => setAddDishOpen(false)}>
            <Icon
              type='material-community'
              name='close-circle'
              color='red'
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleAddDishType}>
            <Icon
              type='material-community'
              name='check-circle'
              color='#4BB543'
            />
          </TouchableOpacity>
        </View>
      </View>}
      </ScrollView>
      {!isAddDishOpen && <View style={styles.addBtnContainer}>
        <TouchableOpacity onPress={() => setAddDishOpen(true)}>
          <Icon
            type='material-community'
            name='plus'
            containerStyle={{
            }}
            size={30}
            color={theme.colors.white}
          />
        </TouchableOpacity>
      </View>}
      
    </View>
  )
}

const styles = StyleSheet.create({
  collapsedItem: {
    backgroundColor: 'red'
  },
  content: {
    paddingHorizontal: 10
  },
  headerText: {
    backgroundColor: theme.colors.lightGray,
    fontSize: 20,
    height: 50,
    textAlign: 'center',
    textAlignVertical: 'center',
    marginTop: 10,
    marginHorizontal: 10,
    borderRadius: 25
  },
  title: {
    marginBottom: 2
  },
  addBtnContainer: {
    backgroundColor: theme.colors.primary,
    borderRadius: 30,
    position: 'absolute',
    zIndex: 1000,
    bottom: 20,
    right: 20,
    width: 45,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center'
  },
  addDishTypeAction: {
    position: 'absolute',
    flexDirection: 'row',
    width: '15%',
    justifyContent: 'space-between',
    height: '100%',
    alignItems: 'center',
    right: 25
  },
  addDishTypeActionContainer: {
    position: 'relative',
    marginTop: 10,
    paddingHorizontal: 10,
    height: 45,
  },
  validateText: {
    position: 'absolute',
    color: 'red',
    bottom: 2,
    fontSize: 13,
    left: 15
  }
});

export default WithContext(MenuManagementScreen);
