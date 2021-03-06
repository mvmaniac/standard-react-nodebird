import {all, call, fork, put, takeLatest} from 'redux-saga/effects';
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
// - 2번 연속 액션이 호출 되면 한번 요청 받고 응답 받고 2초뒤에 요청하고 응답 받음...

import {
  SIGN_UP_FAILURE,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  LOG_IN_FAILURE,
  LOG_OUT_REQUEST,
  LOG_OUT_SUCCESS,
  LOG_OUT_FAILURE,
  LOAD_MY_INFO_REQUEST,
  LOAD_MY_INFO_SUCCESS,
  LOAD_MY_INFO_FAILURE,
  LOAD_USER_INFO_REQUEST,
  LOAD_USER_INFO_SUCCESS,
  LOAD_USER_INFO_FAILURE,
  CHANGE_NICKNAME_REQUEST,
  CHANGE_NICKNAME_SUCCESS,
  CHANGE_NICKNAME_FAILURE,
  LOAD_FOLLOWING_REQUEST,
  LOAD_FOLLOWING_SUCCESS,
  LOAD_FOLLOWING_FAILURE,
  LOAD_FOLLOWERS_REQUEST,
  LOAD_FOLLOWERS_SUCCESS,
  LOAD_FOLLOWERS_FAILURE,
  FOLLOW_REQUEST,
  FOLLOW_SUCCESS,
  FOLLOW_FAILURE,
  UN_FOLLOW_REQUEST,
  UN_FOLLOW_SUCCESS,
  UN_FOLLOW_FAILURE,
  REMOVE_FOLLOWER_REQUEST,
  REMOVE_FOLLOWER_SUCCESS,
  REMOVE_FOLLOWER_FAILURE
} from '../reducers/user';

function signUpAPI(data) {
  return axios.post('/users', data);
}
function* signUp(action) {
  try {
    yield call(signUpAPI, action.data);

    yield put({
      type: SIGN_UP_SUCCESS
    });
  } catch (error) {
    console.error(error);

    yield put({
      type: SIGN_UP_FAILURE,
      error: error.response.data
    });
  }
}

function loginAPI(data) {
  return axios.post('/users/login', data);
}
function* login(action) {
  try {
    const result = yield call(loginAPI, action.data);

    yield put({
      type: LOG_IN_SUCCESS,
      data: result.data
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
  return axios.post('/users/logout');
}
function* logout() {
  try {
    yield call(logoutAPI);

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

function loadMyInfoAPI() {
  return axios.get('/users');
}
function* loadMyInfo() {
  try {
    const result = yield call(loadMyInfoAPI);

    yield put({
      type: LOAD_MY_INFO_SUCCESS,
      data: result.data
    });
  } catch (error) {
    console.error(error);

    yield put({
      type: LOAD_MY_INFO_FAILURE,
      error: error.response.data
    });
  }
}

function loadUserInfoAPI(data) {
  return axios.get(`/users/${data.userId}`);
}
function* loadUserInfo(action) {
  try {
    const result = yield call(loadUserInfoAPI, action.data);

    yield put({
      type: LOAD_USER_INFO_SUCCESS,
      data: result.data
    });
  } catch (error) {
    console.error(error);

    yield put({
      type: LOAD_USER_INFO_FAILURE,
      error: error.response.data
    });
  }
}

function changeNicknameAPI(data) {
  return axios.patch('/users/nickname', data);
}
function* changeNickname(action) {
  try {
    const result = yield call(changeNicknameAPI, action.data);

    yield put({
      type: CHANGE_NICKNAME_SUCCESS,
      data: result.data
    });
  } catch (error) {
    console.error(error);

    yield put({
      type: CHANGE_NICKNAME_FAILURE,
      error: error.response.data
    });
  }
}

function loadFollowingAPI() {
  return axios.get('/users/followings');
}
function* loadFollowing() {
  try {
    const result = yield call(loadFollowingAPI);

    yield put({
      type: LOAD_FOLLOWING_SUCCESS,
      data: result.data
    });
  } catch (error) {
    console.error(error);

    yield put({
      type: LOAD_FOLLOWING_FAILURE,
      error: error.response.data
    });
  }
}

function loadFollowersAPI() {
  return axios.get('/users/followers');
}
function* loadFollowers() {
  try {
    const result = yield call(loadFollowersAPI);

    yield put({
      type: LOAD_FOLLOWERS_SUCCESS,
      data: result.data
    });
  } catch (error) {
    console.error(error);

    yield put({
      type: LOAD_FOLLOWERS_FAILURE,
      error: error.response.data
    });
  }
}

function followAPI(data) {
  return axios.patch(`/users/${data.followingId}/follow`);
}
function* follow(action) {
  try {
    const result = yield call(followAPI, action.data);

    yield put({
      type: FOLLOW_SUCCESS,
      data: result.data
    });
  } catch (error) {
    console.error(error);

    yield put({
      type: FOLLOW_FAILURE,
      error: error.response.data
    });
  }
}

function unFollowAPI(data) {
  return axios.delete(`/users/${data.followingId}/follow`);
}

function* unFollow(action) {
  try {
    const result = yield call(unFollowAPI, action.data);

    yield put({
      type: UN_FOLLOW_SUCCESS,
      data: result.data
    });
  } catch (error) {
    console.error(error);

    yield put({
      type: UN_FOLLOW_FAILURE,
      error: error.response.data
    });
  }
}

function removeFollowerAPI(data) {
  return axios.delete(`/users/followers/${data.followerId}`);
}

function* removeFollower(action) {
  try {
    const result = yield call(removeFollowerAPI, action.data);

    yield put({
      type: REMOVE_FOLLOWER_SUCCESS,
      data: result.data
    });
  } catch (error) {
    console.error(error);

    yield put({
      type: REMOVE_FOLLOWER_FAILURE,
      error: error.response.data
    });
  }
}

function* watchSignUp() {
  yield takeLatest(SIGN_UP_REQUEST, signUp);
}

function* watchLogin() {
  yield takeLatest(LOG_IN_REQUEST, login);
}

function* watchLogout() {
  yield takeLatest(LOG_OUT_REQUEST, logout);
}

function* watchLoadMyInfo() {
  yield takeLatest(LOAD_MY_INFO_REQUEST, loadMyInfo);
}

function* watchLoadUserInfo() {
  yield takeLatest(LOAD_USER_INFO_REQUEST, loadUserInfo);
}

function* watchChangeNickname() {
  yield takeLatest(CHANGE_NICKNAME_REQUEST, changeNickname);
}

function* watchLoadFollowings() {
  yield takeLatest(LOAD_FOLLOWING_REQUEST, loadFollowing);
}

function* watchLoadFollowers() {
  yield takeLatest(LOAD_FOLLOWERS_REQUEST, loadFollowers);
}

function* watchFollow() {
  yield takeLatest(FOLLOW_REQUEST, follow);
}

function* watchUnFollow() {
  yield takeLatest(UN_FOLLOW_REQUEST, unFollow);
}

function* watchRemoveFollower() {
  yield takeLatest(REMOVE_FOLLOWER_REQUEST, removeFollower);
}

export default function* userSaga() {
  yield all([
    fork(watchSignUp),
    fork(watchLogin),
    fork(watchLogout),
    fork(watchLoadMyInfo),
    fork(watchLoadUserInfo),
    fork(watchChangeNickname),
    fork(watchLoadFollowings),
    fork(watchLoadFollowers),
    fork(watchFollow),
    fork(watchUnFollow),
    fork(watchRemoveFollower)
  ]);
}
