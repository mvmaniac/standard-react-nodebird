import React from 'react';
import {applyMiddleware, compose, createStore} from 'redux';
import createSagaMiddleWare from 'redux-saga';
import {Provider} from 'react-redux';
import Head from 'next/head';
import withRedux from 'next-redux-wrapper';
import withReduxSaga from 'next-redux-saga';
import PropTypes from 'prop-types';
import axios from 'axios';

import AppLayout from '../components/AppLayout';
import rootReducer from '../reducers';
import rootSaga from '../sagas';
import {LOAD_USER_REQUEST} from '../reducers/user';

// component는  next에서 넣어주는 props로
// index.js, profile.js, sign-up.js 안에 있는 component 들이 넘어옴
// store는 state, action, reducer가 합쳐진 것
const NodeBird = ({Component, store, pageProps}) => {
  return (
    <Provider store={store}>
      <Head>
        <title>NodeBird - Dev</title>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/antd/3.26.7/antd.css" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
        />
      </Head>
      <AppLayout>
        <Component {...pageProps} />
      </AppLayout>
    </Provider>
  );
};

NodeBird.propTypes = {
  Component: PropTypes.elementType.isRequired,
  store: PropTypes.shape({}).isRequired,
  pageProps: PropTypes.shape({}).isRequired
};

// next에서 추가된 라이프 사이클 getInitialProps
// componentDidMount 보다 먼저 실행됨, 가장 최초에 작업이 실행됨
// 서버 사이드 렌더링 할 때 중요함
NodeBird.getInitialProps = async context => {
  const {ctx, Component} = context;
  let pageProps = {};

  const state = ctx.store.getState();
  const cookie = ctx.isServer ? ctx.req.headers.cookie : ''; // 서버 사이드 렌더링의 경우에는 쿠키를 직접 넣어주어야함

  if (ctx.isServer && cookie) {
    axios.defaults.headers.cookie = cookie;
  }

  if (!state.userReducer.me) {
    ctx.store.dispatch({
      type: LOAD_USER_REQUEST
    });
  }

  if (Component.getInitialProps) {
    // 각 컴포넌트 getInitialProps에서 return한 값이 넘어옴
    pageProps = await Component.getInitialProps(ctx);
  }

  // console.log('NodeBird.getInitialProps: %s', pageProps);
  return {pageProps};
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
  store.sagaTask = sagaMiddleware.run(rootSaga); // 2. 루트 사가를 사가 미들웨어에 등록
  return store;
};

// 3. withRedux가 NodeBird에 props의 store로 연결
export default withRedux(configureStore)(withReduxSaga(NodeBird));
