import React from 'react';
import {applyMiddleware, compose, createStore} from 'redux';
import {Provider} from 'react-redux';
import Head from 'next/head';
import withRedux from 'next-redux-wrapper';
import PropTypes from 'prop-types';

import AppLayout from '../components/AppLayout';
import rootReducer from '../reducers';

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

export default withRedux((initialState, options) => {
  // 미들웨어는 action과 store 사이에서 동작함
  const middlewares = [];
  const enhancer = compose(
    // 미들웨어 적용
    applyMiddleware(...middlewares),

    // Redux Devtools 사용하기 위해 추가
    !options.isServer && window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined'
      ? window.__REDUX_DEVTOOLS_EXTENSION__()
      : f => f
  );

  return createStore(rootReducer, initialState, enhancer);
})(NodeBird);
