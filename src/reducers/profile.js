import { UPDATE_PROFILE } from '../utils/constants';

//todo
const profileReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_PROFILE:
      return { ...action.profile }; //todo 
    default:
      return state;
  }
};

export default profileReducer;