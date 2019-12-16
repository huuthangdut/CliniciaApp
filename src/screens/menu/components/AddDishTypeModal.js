import React, { useState, useEffect } from 'react'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import WithContext from '../../../components/core/WithContext'
import { Icon } from 'react-native-elements'
import TextField from '../../../components/core/TextField'
import theme from '../../../styles/theme'
import * as yup from 'yup'
import { setLocale } from 'yup'
import StoreService from '../../../services/StoreService'

let schema = yup.object().shape({
  price: yup
    .number()
    .min(1000)
})

setLocale({
  mixed: {
    default: 'Não é válido',
    required: 'Price is a required field'
  },
  number: {
    min: 'Price must be at least ${min}',
  },

})

const AddDishTypeModal = props => {
  const { choosenDishtype, sendData, context } = props
  const { choosenRestaurant } = context

  const [foodName, setFoodName] = useState('')
  const [foodPrice, setFoodPrice] = useState(0)
  const [foodNameErr, setFoodNameErr] = useState('')
  const [foodPriceErr, setFoodPriceErr] = useState('')
  const [isValid, setValid] = useState(false)

  const handleSendData = () => {
    let data = {
      restaurant: choosenRestaurant._id,
      detail: {
        name: foodName,
        price: +foodPrice
      },
      dishType: choosenDishtype._id
    }

    StoreService.addFood(
      data,
      res => {
        sendData(res.data.data.createFood, choosenDishtype)
      },
      err => {
        alert(err)
      }
    )
  }

  useEffect(() => {
    CheckValidation()
  }, [foodName])

  useEffect(() => {
    CheckValidation()
  }, [foodPrice])

  const validatePrice = value => {
    if (value) {
      schema.validate({ price: value }).then(value => {
        setFoodPriceErr('')
      })
      .catch((err) => {
        if(value === NaN) {
          setFoodPriceErr('Food price is a required field')
        } else {
          setFoodPriceErr(err.errors.toString())
        }
      });
    }
  }

  const CheckValidation = () => {
    if (foodName && foodPrice && foodNameErr.trim() === '' && foodPriceErr.trim() === '') {
      schema.isValid({ price: foodPrice }).then(isValid => {
        if(isValid){
          setValid(true)
        } else {
          setValid(false)
        }
      })
    } else {
      setValid(false)
    }
  }

  return (
    <View style={styles.root}>
      <Text style={styles.title}>Add new food</Text>
      <View>
        <Text style={styles.labelText}>Dish Type</Text>
        <View>
          <TextField
            value={choosenDishtype.name}
            editable={false}
            containerStyle={styles.textField}
          />
        </View>
        <View style={{ position: 'relative' }}>
          <TextField
            placeholder='Enter food name'
            errText={foodNameErr}
            onChangeText={(value) => {
              if (!value || value.trim() === '') {
                setFoodNameErr('Name of food is required !')
              } else {
                setFoodNameErr('')
              }
              setFoodName(value)
            }}
            containerStyle={styles.textField}
          />
          <Text style={styles.validateText}>{foodNameErr}</Text>
        </View>
        <View style={{ position: 'relative' }}>
          <TextField
            placeholder='Enter food price'
            errText={foodPriceErr}
            keyboardType='number-pad'
            onChangeText={(value) => {
              if (!value || value.trim() === '') {
                setFoodPriceErr('Price of food is required !')
              } else {
                setFoodPriceErr('')
              }
              setFoodPrice(value)
              validatePrice(value)
            }}
            containerStyle={styles.textField}
          />
          <Text style={styles.validateText}>{foodPriceErr}</Text>
        </View>
        <TouchableOpacity disabled={!isValid} onPress={handleSendData}>
          <Icon
            type='material-community'
            name='check-circle'
            color={isValid ? '#4BB543' : theme.colors.gray}
            size={40}
          />
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
  },
  labelText: {
    marginTop: 20,
    marginBottom: 5,
    color: theme.colors.gray,
    marginLeft: 26,
    fontSize: 12
  },
  textField: {
    marginHorizontal: 10,
    marginBottom: 20
  },
  title: {
    alignSelf: 'center',
    textTransform: 'uppercase',
    color: theme.colors.primary,
    fontWeight: '700',
    fontSize: 20
  },
  validateText: {
    position: 'absolute',
    color: 'red',
    bottom: 2,
    fontSize: 13,
    left: 15
  }
});

export default WithContext(AddDishTypeModal);
