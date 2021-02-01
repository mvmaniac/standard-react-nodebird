import {HYDRATE} from 'next-redux-wrapper';
import {combineReducers} from 'redux';

import userReducer from './user';
import postReducer from './post';

const rootReducer = combineReducers({
  index: (state = {}, action) => {
    switch (action.type) {
      case HYDRATE:
        console.log('HYDRATE', HYDRATE);
        return {...state, ...action.payload};
      default:
        return state;
    }
  },
  user: userReducer,
  post: postReducer
});

export default rootReducer;
