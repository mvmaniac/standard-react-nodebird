import {HYDRATE} from 'next-redux-wrapper';
import {combineReducers} from 'redux';

import userReducer from './user';
import postReducer from './post';

// const rootReducer = combineReducers({
//   index: (state = {}, action) => {
//     switch (action.type) {
//       case HYDRATE:
//         console.log('HYDRATE', HYDRATE);
//         return {...state, ...action.payload};
//       default:
//         return state;
//     }
//   },
//   user: userReducer,
//   post: postReducer
// });

const combinedReducer = combineReducers({
  user: userReducer,
  post: postReducer
});

const rootReducer = (state, action) => {
  switch (action.type) {
    case HYDRATE:
      // console.log('HYDRATE', HYDRATE);
      return action.payload;
    default: {
      // console.log('default', action);
      return combinedReducer(state, action);
    }
  }
};

export default rootReducer;
