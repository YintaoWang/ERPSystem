import { BASE_API_URL } from '../utils/constants';
import { get, post } from '../utils/api';
import { getErrors } from './errors';

export const addNewItem = (data) => {
    return async (dispatch) => {
      try {
        console.log(data);
        const item = await post(`${BASE_API_URL}/addnewitem`, data);
        // return { success: true };
        return item.data;
      } catch (error) {
        error.response && dispatch(getErrors(error.response.data));
        // return { success: false };
      }
    };
};

export const getAllItems = () => {
    return async (dispatch) => {
      try {
        const items = await get(`${BASE_API_URL}/getallitems`);
        return items.data
      } catch (error) {
        error.response && dispatch(getErrors(error.response.data));
      }
    };
};

export const getItemById = (id) => {
  return async (dispatch) => {
    try {
      const item = await get(`${BASE_API_URL}/getitembyid`, {params: {item_id: id}});
      return item.data
    } catch (error) {
      error.response && dispatch(getErrors(error.response.data));
    }
  };
};

export const updateItem = (data) => {
  return async (dispatch) => {
    try {
      await post(`${BASE_API_URL}/updateitem`, data);
      return { success: true };
    } catch (error) {
      error.response && dispatch(getErrors(error.response.data));
      return { success: false };
    }
  };
};

export const updateInStock = (data) => {
  return async (dispatch) => {
    try {
      await post(`${BASE_API_URL}/updateinstock`, data);
      return { success: true };
    } catch (error) {
      error.response && dispatch(getErrors(error.response.data));
      return { success: false };
    }
  };
};
  
//upload item image
export const uploadItemImage = (data) => {
  return async (dispatch) => {
    try {
    //   console.log(data);
      await post(`${BASE_API_URL}/uploaditemimage`, data);
      return { success: true };
    } catch (error) {
      error.response && dispatch(getErrors(error.response.data));
      return { success: false };
    }
  };
};

//delete a item???
