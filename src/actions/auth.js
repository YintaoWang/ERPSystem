import { SIGN_IN, SIGN_OUT, BASE_API_URL } from '../utils/constants';
import axios from 'axios';
import { history } from '../router/AppRouter';
import { getErrors } from './errors';
// import { getTasksByUser } from './tasks';
//import { setAuthHeader, removeAuthHeader } from '../utils/common';
import { post, get } from '../utils/api';

// action creator
export const signIn = (user) => ({
  type: SIGN_IN,
  user
});

export const initiateLogin = (email, password) => {
  return async (dispatch) => {
    try {
      const result = await axios.post(`${BASE_API_URL}/signin`, {
        email,
        password
      });
      const user = result.data;
      localStorage.setItem('user_token', user.token);
      dispatch(signIn(user)); //Why??? add data to redux store??? yes
      //dispatch(initiateGetProfile()); // removed 'user.email'//todo why don't use dispatch(updateProfile(user))
    //   console.log(user.userid);
    //   const userid = user.userid;
      //dispatch(initiateLogout()).then(() => history.push('/'));
      //   dispatch(getTasksByUser(userid));
      //   dispatch(getTasksByUser(userid)).then(() => history.push('/dashboard')); //last ver.
      history.push('/dashboard');
    } catch (error) {
      console.log('error');
      error.response && dispatch(getErrors(error.response.data));
    }
  };
};

export const registerNewUser = (data) => {
  return async (dispatch) => {
    try {
      await axios.post(`${BASE_API_URL}/signup`, data);
      return { success: true };
    } catch (error) {
    //   console.log('error', error);
      error.response && dispatch(getErrors(error.response.data));
      return { success: false };
    }
  };
};

export const updateProfile = (data) => {
  return async (dispatch) => {
    try {
      const result = await axios.post(`${BASE_API_URL}/updateprofile`, data);
      const newProfile = result.data;
      localStorage.setItem('user_token', newProfile.token);
      dispatch(signIn(newProfile));
      return { success: true };
    } catch (error) {
      error.response && dispatch(getErrors(error.response.data));
      return { success: false };
    }
  };
};

export const signOut = () => ({
  type: SIGN_OUT
});

//todo: need to clear all localstorage???
export const initiateLogout = () => {
  return async (dispatch) => {
    try {
      //setAuthHeader(); already set in api.js
      await post(`${BASE_API_URL}/logout`, null, true, true); //params???
      //removeAuthHeader();
      localStorage.removeItem('user_token');
      return dispatch(signOut()); //'return' can be removed? NO!! return a promise.
      // or this way: dispatch(signOut());
      //history.push('/');
    } catch (error) {
      error.response && dispatch(getErrors(error.response.data));
    }
  };
};

export const getAllUsers = () => {
    return async (dispatch) => {
      try {
        const result = await get(`${BASE_API_URL}/getallusers`);
        const users = result.data;
        return users;
      } catch (error) {
        error.response && dispatch(getErrors(error.response.data));
      }
    };
};