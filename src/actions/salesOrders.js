import { BASE_API_URL } from '../utils/constants';
import { get, post } from '../utils/api';
import { getErrors, resetErrors } from './errors';

export const getOrderHeaders = (data) => {
    return async (dispatch) => {
      try {
        const orders = await get(`${BASE_API_URL}/getorderheaders`, {params: {from_date: data.fromDate, to_date: data.toDate, channel: data.channel, order_id: data.orderId}});
        // console.log(orders);
        dispatch(resetErrors());
        return orders.data;
      } catch (error) {
        error.response && dispatch(getErrors(error.response.data));
      }
    };
};

export const getOrderLines = (orderId) => {
    return async (dispatch) => {
      try {
        const lines = await get(`${BASE_API_URL}/getorderLines`, {params: {order_id: orderId}});
        // console.log(orders);
        dispatch(resetErrors());
        return lines.data;
      } catch (error) {
        error.response && dispatch(getErrors(error.response.data));
      }
    };
};