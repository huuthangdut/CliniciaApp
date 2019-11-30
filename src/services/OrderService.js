import axios from 'axios'
import ServerIP from './ServerIP'

const API_URL = `http://${ServerIP}:8080/graphql`

const getOrdersOfUser = (userId, responseCb, errorCb) => {
  axios({
    url: API_URL,
    method: 'post',
    data: {
      query: `
      query OrdersOfUser($userId: ID!){
        ordersOfUser(userId: $userId)
        {
          _id 
          restaurant{
            name
            address
          }
          payment_method
          status
          delivery_address
          createdAt
          items{
            _id
            food{
              _id
              name
              price
            }
            qty
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

const createOrder = (data, responseCb, errorCb) => {
  axios({
    url: API_URL,
    method: 'post',
    data: {
      query: `
      mutation CreateOrder($orderInput : OrderInput!){
        createOrder(orderInput: $orderInput)
        {
          delivery_address
          restaurant{
            name
            address
          }
          items{
            food{
              name
            }
            qty
          }
          status
          payment_method
          createdAt
        }
      }
      `,
      variables: {
        orderInput: data
      }
    },
  })
    .then(responseCb)
    .catch(errorCb)
}

export const OrderService = {
  getOrdersOfUser, createOrder
}