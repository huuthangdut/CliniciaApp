import axios from 'axios'
import API_URL_CONFIG from './ServerURL'

const API_URL = `http://${API_URL_CONFIG.ServerIP}:${API_URL_CONFIG.PORT}/graphql`

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
            is_available
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
              lat
              long
            }
            menu_info{
              name
              foods{
                name
                price
                _id
                is_available
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

const getRestaurantByMerchant = (merchantId, responseCb, errorCb) => {
  axios({
    url: API_URL,
    method: 'post',
    data: {
      query: `
        query RestaurentByMerChant($merchantId: ID!){
          restaurantByMerchant(merchantId: $merchantId){
            _id
            name
            location{
              address
              lat
              long
            }
          }
        }
      `,
      variables: {
        merchantId
      }
    }
  }).then(responseCb)
    .catch(errorCb)
}

const createRestaurant = (restaurantInput, responseCb, errorCb) => {
  axios({
    url: API_URL,
    method: 'post',
    data: {
      query: `
        mutation CreateRestaurant($restaurantInput: RestaurantInput!){
          createRestaurant(restaurantInput: $restaurantInput){
            _id
            cuisines
            name
            location {
              address
              lat
              long
            }
          }
        }
      `,
      variables: {
        restaurantInput
      }
    }
  }).then(responseCb)
    .catch(errorCb)
}

const addDishType = (dishTypeInput, responseCb, errorCb) => {
  axios({
    url: API_URL,
    method: 'post',
    data: {
      query: `
        mutation CreateDishType($dishTypeInput: DishTypeInput!){
          createDishType(dishTypeInput: $dishTypeInput){
            name
          }
        }
      `,
      variables: {
        dishTypeInput
      }
    }
  }).then(responseCb)
    .catch(errorCb)
}

const addFood = (foodInput, responseCb, errorCb) => {
  axios({
    url: API_URL,
    method: 'post',
    data: {
      query: `
        mutation CreateFood($foodInput: FoodInput!){
          createFood(foodInput: $foodInput){
            name
            price
          }
        }
      `,
      variables: {
        foodInput
      }
    }
  }).then(responseCb)
    .catch(errorCb)
}

const changeFoodState = (is_available, foodId , responseCb, errorCb) => {
  axios({
    url: API_URL,
    method: 'post',
    data: {
      query: `
        mutation changestatus($is_available: Boolean!, $foodId: ID!){
          changeFoodAvailable(isAvailable: $is_available,  foodId: $foodId)
        }
      `,
      variables: {
        is_available,
        foodId
      }
    }
  }).then(responseCb)
    .catch(errorCb)
}

const StoreService = {
  getRestaurants, getMenu, getStore, getStoreInCategory, getRestaurantByMerchant, createRestaurant,
  addDishType, addFood, changeFoodState
}

export default StoreService

