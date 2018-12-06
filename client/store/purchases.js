import axios from "axios";
import history from "../history";

const GET_ORDERS = "GET_ORDERS";
const GET_ORDERS_FOR_USER = "GET_ORDERS_FOR_USER";

const defaultOrders = {
  orders: [],
  myOrders: [],
  selectedOrder: {},
};

const getOrders = orders => ({ type: GET_ORDERS, orders });
const getMyOrders = myOrders => ({ type: GET_ORDERS_FOR_USER, myOrders});


export const fetchAllPurchases = () => dispatch =>
  axios
    .get('/api/purchases')
    .then(res => {
      dispatch(getOrders(res.data));
    })
    .catch(err => console.log(err));

export const postPurchases = cart => dispatch => {
  fetchAllPurchases()
    .then(res => {
      return res.data.length
    })
    .then(newOrderId => {
      cart.forEach(cartItem => {
        cartItem.orderId = newOrderId;
        axios.post('/api/purchases', cartItem);
      })
    })
}

export const fetchPurchases = (userId) => dispatch =>
  axios
    .get(`/api/purchases/user/${userId}`)
    .then(res => {
      dispatch(getMyOrders(sortByOrder(res.data)));
    })
    .catch(err => console.log(err));

export default function(state = defaultOrders, action) {
  switch (action.type) {
    case GET_ORDERS:
      return Object.assign({}, state, {orders: action.orders});
    case GET_ORDERS_FOR_USER:
      return Object.assign({}, state, {myOrders: action.myOrders});
    default:
      return state;
  }
}

function sortByOrder(allOrders){
  let obj = {};
  allOrders.forEach(order => {
    obj[order.orderId] ? obj[order.orderId].push(order) : obj[order.orderId] = [order];
  })
  return obj;
}
