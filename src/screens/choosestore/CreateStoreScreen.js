import React, { useRef, useState, useEffect } from 'react'
import {
  TouchableWithoutFeedback,
  View,
  Keyboard,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  ScrollView,
  Text,
  ToastAndroid
} from 'react-native';
import TextField from '../../components/core/TextField'
import Button from '../../components/core/Button'
import theme from '../../styles/theme'
import WithContext from '../../components/core/WithContext'
import { AuthService } from '../../services/AuthService'
import Header from '../../components/core/Header'
import AutoComplete from './components/AutoComplete'
import StoreService from '../../services/StoreService';

const CreateStoreScreen = props => {
  const { navigation, context } = props
  const { user } = context

  const cuisinesRef = useRef();

  const [name, setName] = useState('')
  const [cuisines, setCuisines] = useState('')
  const [location, setLocation] = useState('ádsd')
  const [isLoading, setLoading] = useState(false)
  const [nameError, setNameError] = useState('')
  const [cuisinesError, setCuisinesError] = useState('')
  const [isValid, setValid] = useState(false)

  const focusCuisines = () => {
    cuisinesRef.current.focus()
  }

  const CheckValidation = () => {
    if (name && cuisines && location && nameError.trim() === '' && cuisinesError.trim() === '') {
      setValid(true)
    } else {
      setValid(false)
    }
  }

  useEffect(() => {
    CheckValidation()
  })

  const handleErr = errs => {
    let errors = []

    if (errs.length > 0) {
      errs.map(item => {
        errors.push(item.message)
      })
    }

    setLoading(false)
    alert(errors)
  }

  const getData = _location => {
    setLocation(_location)
  }

  const handleAdd = () => {
    let restaurantInput = {
      location: location,
      cuisines: cuisines,
      name: name,
      merchant: user.userId
    }

    StoreService.createRestaurant(
      restaurantInput,
      res => {
        navigation.navigate('ChooseStore', {reload: true})
      },
      err => {
        alert(err)
      }
    )
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <>
        <Header title='Create a new store' />
        <View style={styles.form}>
          <ScrollView style={{ flex: 1, paddingHorizontal: 20 }}>
            <>
              <View>
                <TextField
                  placeholder="Name"
                  onChangeText={(value) => {
                    if (!value || value.trim() === '') {
                      setNameError('Name is a required field !')
                    } else {
                      setNameError('')
                    }
                    setName(value)
                  }}
                  onSubmitEditing={focusCuisines}
                  errText={nameError}
                  returnKeyType="next"
                />
                <Text style={styles.validateText}>{nameError}</Text>
              </View>
              <View>
                <TextField
                  ref={cuisinesRef}
                  placeholder="Cuisines"
                  onChangeText={(value) => {
                    if (!value || value.trim() === '') {
                      setCuisinesError('Cuisine is a required field !')
                    } else {
                      setCuisinesError('')
                    }
                    setCuisines(value)
                  }}
                  errText={cuisinesError}
                  returnKeyType="next"
                />
                <Text style={styles.validateText}>{cuisinesError}</Text>
              </View>
              <AutoComplete sendData={getData} />
            </>
            <View
              style={{
                ...styles.row,
                marginBottom: 40,
              }}>
            </View>
            {isLoading ? <ActivityIndicator size={50} color={theme.colors.white} />
              :
              <Button
                title={"Add"}
                primary
                onPress={handleAdd}
                disabled={!isValid} />
            }
          </ScrollView>
        </View>
      </>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    paddingHorizontal: 25,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
  },
  row: {
    flexDirection: 'row'
  },
  form: {
    flexGrow: 2,
    marginTop: 20
  },
  heading: {
    fontSize: 40,
    fontFamily: 'SF-Pro-Display-Bold',
    marginVertical: 16,
    color: theme.colors.white
  },
  title: {
    fontSize: 17,
    fontFamily: 'SF-Pro-Text-Regular',
    color: theme.colors.white,
    marginVertical: 28
  },
  forgotPasswordLabel: {
    flex: 1,
    textAlign: 'right',
    color: theme.colors.white,
    fontSize: 15,
    fontFamily: 'SF-Pro-Text-Regular',
    marginBottom: 5
  },
  signUpLabel: {
    textAlign: "center",
    marginVertical: 8,
    fontSize: 17,
    fontFamily: 'SF-Pro-Text-Regular',
    color: theme.colors.white,
    fontWeight: 'bold'
  },
  validateText: {
    position: 'absolute',
    color: 'red',
    bottom: 2,
    fontSize: 13,
    left: 15
  }
});

export default WithContext(CreateStoreScreen);
