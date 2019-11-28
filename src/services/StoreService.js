import axios from 'axios'
import ServerIP from './ServerIP'

const API_URL = `http://${ServerIP}:8080/graphql`

const getRestaurants = (responseCb, errorCb) => {
  axios({
    url: API_URL,
    method: 'post',
    data: {
      query: `
        query{
            restaurants
            {
              _id
              address
              name
            }
          }
      `
    }
  })
    .then(responseCb)
    .catch(errorCb)
}

const getStore = (storeId, responseCb, errorCb) => {
  axios({
    url: API_URL,
    method: 'post',
    data: {
      query: `
      query Menu($storeId: ID!) {
        menuByRestaurant(restaurantId: $storeId){
          _id
          name
          foods{
            _id
            name
            price
          }
        }
      }
      `,
      variables: {
        storeId
      }
    }
  }).then(responseCb)
  .catch(errorCb)
}

const StoreService = {
  getRestaurants, getStore
}

export default StoreService
