import axios from 'axios'
import ServerIP from './ServerIP'

const API_URL = `http://${ServerIP}:8080/graphql`

const login = (email, password, fcmToken, deviceId, merchantApp , responseCb, errorCb) => {
  axios({
    url: API_URL,
    method: 'post',
    data: {
      query: `
        mutation Login(
            $email: String!, 
            $password: String!, 
            $fcmToken: String!, 
            $deviceId: String!,
            $merchantApp: Boolean!
          ){
          login( 
            email: $email 
            password: $password 
            fcmToken: $fcmToken 
            deviceId: $deviceId 
            merchantApp: $merchantApp
          ){
            lastName
            firstName
            userId
            email
            createdRestaurants{
              name
              location{
                address
                lat
                long
              }
              cuisines
              _id
            }
            authToken
            location{
              address
              lat
              long
            }
          }
        }
      `,
      variables: {
        email,
        password,
        fcmToken,
        deviceId,
        merchantApp
      }
    },

  })
    .then(responseCb)
    .catch(errorCb)
}

const signUp = (data, isMerchant, responseCb, errorCb) => {
  axios({
    url: API_URL,
    method: 'post',
    data: {
      query: `
        mutation SignUp($userInput: UserInput!, $isMerchant: Boolean!) {
          createUser(userInput: $userInput, isMerchant: $isMerchant)
          {
            _id
            firstName
            lastName
            email
            authToken
          }
        }
      `,
      variables: {
        userInput: data,
        isMerchant
      }
    },
  })
    .then(responseCb)
    .catch(errorCb)
}

const addAddress = (data, responseCb, errorCb) => {
  axios({
    url: API_URL,
    method: 'post',
    data: {
      query: `
        mutation AddLocation($locationInput: LocationInput!){
          addLocation(location: $locationInput)
          {
            _id
            email
            location{
              address
              lat
              long
            }
          }
        }
      `,
      variables: {
        locationInput: data
      }
    },
  })
    .then(responseCb)
    .catch(errorCb)
}

const getLocations = (userId, responseCb, errorCb) => {
  axios({
    url: API_URL,
    method: 'post',
    data: {
      query: `
        query GetLocation($userId: ID!){
          user(userId: $userId)
          {
            location{
              address
              lat
              long
            }
          }
        }
      `,
      variables: {
        userId
      }
    },
  })
    .then(responseCb)
    .catch(errorCb)
}

export const AuthService = {
  login, signUp, addAddress, getLocations
}