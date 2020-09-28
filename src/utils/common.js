import jwt_decode from 'jwt-decode';
import store from '../store/store';
// import { initiateGetProfile } from '../actions/profile';
import { signIn } from '../actions/auth';
import { history } from '../router/AppRouter';
import axios from 'axios';
import _ from 'lodash';

export const validateFields = (fieldsToValidate) => {
    return fieldsToValidate.every((field) => Object.values(field)[0] !== '');
};

// todo: where to call this function? Answer: index.js
export const maintainSession = () => {
  const user_token = localStorage.getItem('user_token');
  if (user_token) {
    const currentPath = window.location.pathname;
    if (currentPath === '/' || currentPath === '/register') {
      history.push('/dashboard');
    }
    const decoded = jwt_decode(user_token);
    updateStore(decoded);
  } else {
    history.push('/');
  }
};

export const updateStore = (user) => {
  const { user_id, email, first_name, last_name } = user;
  store.dispatch(
    signIn({
      user_id,
      email,
      first_name,
      last_name,
      token: localStorage.getItem('user_token')
    })
  );
//   store.dispatch(initiateGetProfile()); // removed 'email'
};

export const setAuthHeader = () => {
  const token = localStorage.getItem('user_token');
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }
};

export const removeAuthHeader = () => {
  delete axios.defaults.headers.common['Authorization'];
};

export const toLocalDateTime = (isoStr) => {
  if (!_.isEmpty(isoStr)) {
    const isoDate = new Date(isoStr);
    const localDate = new Date(isoDate.getTime() - (isoDate.getTimezoneOffset() * 60000 )).toISOString();
    const datePart = localDate.split("T")[0];
    const timePart = localDate.slice(11,16);
    const localDateTimeStr = datePart + " " + timePart; //format: YYYY-MM-DD HH:mm
    return localDateTimeStr;
  } else {
    return isoStr;
  }
}