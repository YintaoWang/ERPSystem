import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import authReducer from '../reducers/auth';
import errorsReducer from '../reducers/errors';
// import tasksReducer from '../reducers/tasks';
import profileReducer from '../reducers/profile'; //todo

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  combineReducers({
    auth: authReducer,
    errors: errorsReducer,
    // tasks: tasksReducer,
    profile: profileReducer
  }),
  composeEnhancers(applyMiddleware(thunk))
);

export default store;