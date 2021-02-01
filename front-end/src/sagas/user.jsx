import {all, call, delay, fork, put, takeLatest} from 'redux-saga/effects';
import axios from 'axios';

// all
// - 파라미터로 배열을 받는데 배열안에 있는 것들 한번에 실행함
// - 고로 여러 이펙트를 동시에 샐행 할 수 있게 됨

// call
// - 파라미터 받은 함수를 동기적으로 실행

// fork
// - 파라미터 받은 함수를 비동기적으로 실행

// put
// - dispatch와 동일하다고 보면 됨

// take
// - 첫 번째 파라미터로 액션 명을 받는데 해당 액션이 실행 될 때 까지 대기함
// - 두 번째 파라미터는 해당 액션이 실행 될 때 호출되는 함수
// - 한번만 실행되는데 무한 반복으로 실행하려면 while take로 실행하면 됨, 단 동기적으로 동작

// takeEvery
// - take와 같지만 while문을 쓰지 않더라도 무한 반복으로 대기함, 단 비동기적으로 동작
// - 2번 연속 액션이 호출 되면 2번 요청받고 2번 응답 받음

// takeLatest
// - takeEvery와 같음, 단, 전송이 2번 가더라도 응답은 1번만 받음 (중복 요청은 서버에서 처리 해야함)

// throttle
// - takeLatest와 다르게 세번째 파라미터에 밀리세컨드를 받음
// - throttle('action', actionFn, 2000) 이렇게 호출하면 2초 동안 action은 한번만 요청함

import {
  LOG_IN_FAILURE,
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  LOG_OUT_FAILURE,
  LOG_OUT_REQUEST,
  LOG_OUT_SUCCESS,
  SIGN_UP_FAILURE,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS
} from '../reducers/user';

function loginAPI(data) {
  return axios.post('/api/login', data);
}

function* login(action) {
  try {
    // const result = yield call(loginAPI, action.data);

    yield delay(1000);
    yield put({
      type: LOG_IN_SUCCESS,
      data: action.data
    });
  } catch (error) {
    console.error(error);

    yield put({
      type: LOG_IN_FAILURE,
      error: error.response.data
    });
  }
}

function logoutAPI() {
  return axios.post('/api/logout');
}

function* logout() {
  try {
    // const result = yield call(logoutAPI);

    yield delay(1000);
    yield put({
      type: LOG_OUT_SUCCESS
    });
  } catch (error) {
    console.error(error);

    yield put({
      type: LOG_OUT_FAILURE,
      error: error.response.data
    });
  }
}

function signUpAPI(data) {
  return axios.post('/api/signUp', data);
}

function* signUp(action) {
  try {
    // const result = yield call(signUpAPI, action.data);

    yield delay(1000);
    yield put({
      type: SIGN_UP_SUCCESS,
      data: action.data
    });
  } catch (error) {
    console.error(error);

    yield put({
      type: SIGN_UP_FAILURE,
      error: error.response.data
    });
  }
}

function* watchLogin() {
  yield takeLatest(LOG_IN_REQUEST, login);
}

function* watchLogout() {
  yield takeLatest(LOG_OUT_REQUEST, logout);
}

function* watchSignUp() {
  yield takeLatest(SIGN_UP_REQUEST, signUp);
}

export default function* userSaga() {
  yield all([fork(watchLogin), fork(watchLogout), fork(watchSignUp)]);
}
