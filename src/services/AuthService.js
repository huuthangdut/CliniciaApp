import axios from 'axios'
import ServerIP from './ServerIP'

const API_URL = `http://${ServerIP}:8080/graphql`

const login = (email, password, responseCb, errorCb) => {
  axios({
    url: API_URL,
    method: 'post',
    data: {
      query: `
        mutation Login($email: String!, $password: String!){
        login( email: $email password: $password){
          lName
          fName
          userId
          email
          authToken
        }
      }
      `,
      variables: {
        email,
        password
      }
    },
    
  })
    .then(responseCb)
    .catch(errorCb)
}

const signUp = ( data ,responseCb, errorCb ) => {
  axios({
    url: API_URL,
    method: 'post',
    data: {
      query: `
        mutation SignUp($userInput: UserInput!) {
          createUser(userInput: $userInput)
          {
            _id
            fName
            lName
            email
            authToken
          }
        }
      `,
      variables: {
        userInput: data
      }
    },
  })
    .then(responseCb)
    .catch(errorCb)
}

const addAddress = ( data ,responseCb, errorCb ) => {
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

const getLocations = (userId ,responseCb, errorCb ) => {
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