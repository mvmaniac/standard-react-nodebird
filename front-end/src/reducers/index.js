import {combineReducers} from 'redux';
import {enableES5} from 'immer';

import userReducer from './user';
import postReducer from './post';

enableES5();

const rootReducer = combineReducers({
  userReducer,
  postReducer
});

export default rootReducer;
