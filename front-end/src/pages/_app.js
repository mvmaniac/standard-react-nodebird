import React from 'react';
import {applyMiddleware, compose, createStore} from 'redux';
import createSagaMiddleWare from 'redux-saga';
import {Provider} from 'react-redux';
import Head from 'next/head';
import withRedux from 'next-redux-wrapper';
import PropTypes from 'prop-types';

import AppLayout from '../components/AppLayout';
import rootReducer from '../reducers';
import rootSaga from '../sagas';

// component는  next에서 넣어주는 props로
// index.js, profile.js, sign-up.js 안에 있는 component 들이 넘어옴
// store는 state, action, reducer가 합쳐진 것
const NodeBird = ({Component, store}) => {
  return (
    <Provider store={store}>
      <Head>
        <title>NodeBird - Dev</title>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/antd/3.26.7/antd.css" />
      </Head>
      <AppLayout>
        <Component />
      </AppLayout>
    </Provider>
  );
};

NodeBird.propTypes = {
  Component: PropTypes.elementType.isRequired,
  store: PropTypes.shape({}).isRequired
};

const configureStore = (initialState, options) => {
  // 미들웨어는 action과 store 사이에서 동작함
  const sagaMiddleware = createSagaMiddleWare();
  const middlewares = [sagaMiddleware]; // 1. 사가 미들웨어를 리덕스에 미들웨어로 등록
  
  const enhancer =
    process.env.NODE_ENV === 'production'
      ? compose(applyMiddleware(...middlewares))
      : compose(
          // 미들웨어 적용
          applyMiddleware(...middlewares),
          // Redux Devtools 사용하기 위해 추가
          !options.isServer && window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined'
            ? window.__REDUX_DEVTOOLS_EXTENSION__()
            : f => f
        );

  const store = createStore(rootReducer, initialState, enhancer);
  sagaMiddleware.run(rootSaga); // 2. 루트 사가를 사가 미들웨어에 등록
  return store;
};

// 3. withRedux가 NodeBird에 props의 store로 연결
export default withRedux(configureStore)(NodeBird);
