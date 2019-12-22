import axios from 'axios'
import API_URL_CONFIG from './ServerURL'

const API_URL = `http://${API_URL_CONFIG.ServerIP}:${API_URL_CONFIG.PORT}/graphql`

const updateDevice = (restaurantDeviceInput, responseCb, errorCb) => {
  axios({
    url: API_URL,
    method: 'post',
    data: {
      query: `
        mutation RestaurantDevice($restaurantDeviceInput: RestaurantDeviceInput!){
          updateRestaurantDevice(restaurantDeviceInput: $restaurantDeviceInput){
            user
            restaurant
          }
        }
      `,
      variables: {
        restaurantDeviceInput
      }
    },
  })
    .then(responseCb)
    .catch(errorCb)
}


export const NotificationService = {
  updateDevice
}