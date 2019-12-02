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
              location{
                address
                lat
                long
              }
              name
            }
          }
      `
    }
  })
    .then(responseCb)
    .catch(errorCb)
}

const getMenu = (storeId, responseCb, errorCb) => {
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

const getStore = (storeId, responseCb, errorCb) => {
  axios({
    url: API_URL,
    method: 'post',
    data: {
      query: `
        query Menu($storeId: ID!) {
          restaurantById(restaurantId: $storeId){
            _id
            name
            location {
              address
            }
            menu_info{
              name
              foods{
                name
                price
                _id
              }
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

const getStoreInCategory = (query, responseCb, errorCb) => {
  axios({
    url: API_URL,
    method: 'post',
    data: {
      query: `
      query GetCategory($query: String!){
        searchRestaurant(query: $query)
        {
          _id
          cuisines
          name
          location{
            address
            lat
            long
          }
          menu_info{
            foods{
              name
            }
          }
        }
      }
      `,
      variables: {
        query
      }
    }
  }).then(responseCb)
    .catch(errorCb)
}

const StoreService = {
  getRestaurants, getMenu, getStore, getStoreInCategory
}

export default StoreService
