import { BASE_API_URL } from '../utils/constants';
import { get, post } from '../utils/api';
import { getErrors } from './errors';

export const addNewTask = (data) => {
    return async (dispatch) => {
      try {
        console.log(data);
        await post(`${BASE_API_URL}/addnewtask`, data);
        return { success: true };
      } catch (error) {
        error.response && dispatch(getErrors(error.response.data));
        return { success: false };
      }
    };
};

export const getTasksByUser = (userid) => {
  return async (dispatch) => {
    try {
      const tasks = await get(`${BASE_API_URL}/gettasksbyuser`, {params: {user_id: userid}});
      return tasks.data;
    } catch (error) {
      error.response && dispatch(getErrors(error.response.data));
    }
  };
};

export const getAllTasks = () => {
    return async (dispatch) => {
      try {
        const tasks = await get(`${BASE_API_URL}/getalltasks`);
        return tasks.data;
      } catch (error) {
        error.response && dispatch(getErrors(error.response.data));
      }
    };
};

export const updateTask = (data) => {
  return async (dispatch) => {
    try {
      console.log(data);
      await post(`${BASE_API_URL}/updatetask`, data);
      return { success: true };
    } catch (error) {
      error.response && dispatch(getErrors(error.response.data));
      return { success: false };
    }
  };
};

export const approveFinishedTask = (data) => {
  return async (dispatch) => {
    try {
      console.log(data);
      await post(`${BASE_API_URL}/approvefinishedtask`, data);
      return { success: true };
    } catch (error) {
      error.response && dispatch(getErrors(error.response.data));
      return { success: false };
    }
  };
};