import { BASE_API_URL } from '../utils/constants';
import { getErrors } from './errors';
//import { history } from '../router/AppRouter';
import { UPDATE_PROFILE } from '../utils/constants';
import { get, post } from '../utils/api';
//import { setAuthHeader } from '../utils/common';
//import axios from 'axios';

// action creator
export const updateProfile = (profile) => ({
  type: UPDATE_PROFILE,
  profile
});

export const initiateUpdateProfile = (profileData) => {
  return async (dispatch) => {
    try {
      const profile = await post(`${BASE_API_URL}/profile`, profileData); //api.js
      dispatch(updateProfile(profile.data));
      //history.push('/profile');
    } catch (error) {
      error.response && dispatch(getErrors(error.response.data));
    }
  };
};

export const initiateGetProfile = () => { //removed 'email'
  return async (dispatch) => {
    try {
      //setAuthHeader(); //already set in api.js
      const profile = await get(`${BASE_API_URL}/profile`);
      dispatch(updateProfile(profile.data));
    } catch (error) {
      error.response && dispatch(getErrors(error.response.data));
    }
  };
};