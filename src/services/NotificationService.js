import axios from 'axios'
import ServerIP from './ServerIP'

const API_URL = `http://${ServerIP}:8080/graphql`

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