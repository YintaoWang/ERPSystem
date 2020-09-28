import { GET_TASKS } from '../utils/constants';

//todo
const tasksReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_TASKS:
      return  action.tasks; //todo: ...meaning???
    default:
      return state;
  }
};

export default tasksReducer;