import {applyMiddleware, compose, createStore} from 'redux';
import createSagaMiddleware from 'redux-saga';
import {createWrapper} from 'next-redux-wrapper';
import {composeWithDevTools} from 'redux-devtools-extension';

import rootReducer from '../reducers';
import rootSaga from '../sagas';

// 커스텀 미들웨어
// eslint-disable-next-line no-unused-vars
const loggerMiddleware = ({dispatch, getState}) => (next) => (action) => {
  console.log(action);
  return next(action);
};

const configureStore = (context) => {
  console.log(context);

  const sagaMiddleware = createSagaMiddleware();

  const middlewares = [sagaMiddleware, loggerMiddleware];
  const enhancer =
    process.env.NODE_ENV === 'production'
      ? compose(applyMiddleware(...middlewares))
      : composeWithDevTools(applyMiddleware(...middlewares));

  const store = createStore(rootReducer, enhancer);
  store.sagaTask = sagaMiddleware.run(rootSaga);

  return store;
};

const wrapper = createWrapper(configureStore, {
  debug: process.env.NODE_ENV === 'development'
});

export default wrapper;
