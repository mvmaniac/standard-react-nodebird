import {all, call, fork, put, takeEvery, takeLatest} from 'redux-saga/effects';
import axios from 'axios';
import {
  LOG_IN_SUCCESS,
  LOG_IN_FAILURE,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE,
  LOG_IN_REQUEST,
  LOG_OUT_SUCCESS,
  LOG_OUT_FAILURE,
  LOG_OUT_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAILURE,
  LOAD_USER_REQUEST
} from '../reducers/user';

// call: 함수 동기적 호출
// fork: 함수 비동기적 호출
// put: 액션 dispatch
// take: 해당 액션이 dispatch 되면 제너레이터를 next하는 이펙트
// all: 여러 이펙트를 동시에 샐행 할 수 있게 함
// takeEvery: while(true)로 감싸는것과 같이 실행됨 (ex. 여러번 클릭 용도)
// takeLatest takeEvery와 동시에 여러번 액션이 호출되어도 최종 마지막 1번만 호출됨 (ex. 여러번 클릭해도 최종 1번만)

// login
function loginAPI (loginData) {
  return axios.post('/users/login', loginData, {
    withCredentials: true
  });
}

function* login (action) {
  try {
    // call은 동기적 호출이므로 loginAPI에 대한
    // 응답이 올때까지 기다리며, 응답이 오고 나서
    // put에 있는 액션이 실행됨
    const result = yield call(loginAPI, action.data);
    yield put({
      type: LOG_IN_SUCCESS,
      data: result.data
    });
  } catch (e) {
    console.error(e);

    yield put({
      type: LOG_IN_FAILURE
    });
  }
}

function* watchLogin () {
  // LOG_IN 액션을 받으면 LOG_IN_SUCCESS 액션을 실행
  // yield take(LOG_IN);
  // yield put({
  //  type: LOG_IN_SUCCESS
  // });

  // LOG_IN 액션이 동시에 실행되어도 login은 마지막 1번만 실행됨
  yield takeLatest(LOG_IN_REQUEST, login);
}

// logout
function logoutAPI () {
  return axios.post('/users/logout', {}, {
    withCredentials: true
  });
}

function* logout () {
  try {
    yield call(logoutAPI);
    yield put({
      type: LOG_OUT_SUCCESS
    });
  } catch (e) {
    console.error(e);

    yield put({
      type: LOG_OUT_FAILURE,
      error: e
    });
  }
}

function* watchLogout () {
  yield takeLatest(LOG_OUT_REQUEST, logout);
}

// loadUser
function loadUserAPI () {
  return axios.get('/users', {
    withCredentials: true
  });
}

function* loadUser () {
  try {
    const result = yield call(loadUserAPI);
    yield put({
      type: LOAD_USER_SUCCESS,
      data: result.data
    });
  } catch (e) {
    console.error(e);

    yield put({
      type: LOAD_USER_FAILURE,
      error: e
    });
  }
}

function* watchLoadUser () {
  yield takeEvery(LOAD_USER_REQUEST, loadUser);
}

// signUp
function signUpAPI (signUpData) {
  return axios.post('/users', signUpData);
}

function* signUp (action) {
  try {
    yield call(signUpAPI, action.data);
    yield put({
      type: SIGN_UP_SUCCESS
    });
  } catch (e) {
    console.error(e);

    yield put({
      type: SIGN_UP_FAILURE,
      error: e
    });
  }
}

function* watchSignUp () {
  yield takeEvery(SIGN_UP_REQUEST, signUp);
}

export default function* userSaga () {
  yield all([
    fork(watchLogin), 
    fork(watchLogout),
    fork(watchLoadUser),
    fork(watchSignUp)
  ]);
}
