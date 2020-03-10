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
  LOAD_USER_REQUEST,
  FOLLOW_USER_SUCCESS,
  FOLLOW_USER_FAILURE,
  FOLLOW_USER_REQUEST,
  UN_FOLLOW_USER_REQUEST,
  UN_FOLLOW_USER_SUCCESS,
  UN_FOLLOW_USER_FAILURE,
  LOAD_FOLLOWERS_REQUEST,
  LOAD_FOLLOWERS_SUCCESS,
  LOAD_FOLLOWERS_FAILURE,
  LOAD_FOLLOWINGS_REQUEST,
  LOAD_FOLLOWINGS_SUCCESS,
  LOAD_FOLLOWINGS_FAILURE,
  REMOVE_FOLLOWER_REQUEST,
  REMOVE_FOLLOWER_SUCCESS,
  REMOVE_FOLLOWER_FAILURE,
  EDIT_NICKNAME_REQUEST,
  EDIT_NICKNAME_SUCCESS,
  EDIT_NICKNAME_FAILURE
} from '../reducers/user';

// call: 함수 동기적 호출
// fork: 함수 비동기적 호출
// put: 액션 dispatch
// take: 해당 액션이 dispatch 되면 제너레이터를 next하는 이펙트
// all: 여러 이펙트를 동시에 샐행 할 수 있게 함
// takeEvery: while(true)로 감싸는것과 같이 실행됨 (ex. 여러번 클릭 용도, 카운트같은거?)
// takeLatest takeEvery와 동시에 여러번 액션이 호출되어도 최종 마지막 1번만 호출됨 (ex. 여러번 클릭해도 최종 1번만)

// login
function loginAPI(data) {
  return axios.post('/users/login', data, {
    withCredentials: true
  });
}

function* login(action) {
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
    yield put({
      type: LOG_IN_FAILURE,
      error: e?.response.data
    });
  }
}

function* watchLogin() {
  // LOG_IN 액션을 받으면 LOG_IN_SUCCESS 액션을 실행
  // yield take(LOG_IN);
  // yield put({
  //  type: LOG_IN_SUCCESS
  // });

  // LOG_IN 액션이 동시에 실행되어도 login은 마지막 1번만 실행됨
  yield takeLatest(LOG_IN_REQUEST, login);
}

// logout
function logoutAPI() {
  return axios.post(
    '/users/logout',
    {},
    {
      withCredentials: true
    }
  );
}

function* logout() {
  try {
    yield call(logoutAPI);
    yield put({
      type: LOG_OUT_SUCCESS
    });
  } catch (e) {
    yield put({
      type: LOG_OUT_FAILURE,
      error: e
    });
  }
}

function* watchLogout() {
  yield takeLatest(LOG_OUT_REQUEST, logout);
}

// loadUser
function loadUserAPI(data) {
  // userId 값이 있다면 남의 정보를 요청함
  return axios.get(data && data.userId ? `/users/${data.userId}` : '/users', {
    withCredentials: true
  });
}

function* loadUser(action) {
  try {
    const result = yield call(loadUserAPI, action.data);
    yield put({
      type: LOAD_USER_SUCCESS,
      data: result.data,
      me: !action.data // 남의 정보인지 내 정보인지 판단하기 위한 용도
    });
  } catch (e) {
    // console.error(e);
    yield put({
      type: LOAD_USER_FAILURE,
      error: e
    });
  }
}

function* watchLoadUser() {
  yield takeEvery(LOAD_USER_REQUEST, loadUser);
}

// signUp
function signUpAPI(data) {
  return axios.post('/users', data);
}

function* signUp(action) {
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

function* watchSignUp() {
  yield takeEvery(SIGN_UP_REQUEST, signUp);
}

// follow
function followAPI(data) {
  return axios.post(
    `/users/${data.userId}/followings`,
    {},
    {
      withCredentials: true
    }
  );
}

function* follow(action) {
  try {
    const result = yield call(followAPI, action.data);
    yield put({
      type: FOLLOW_USER_SUCCESS,
      data: result.data
    });
  } catch (e) {
    console.error(e);

    yield put({
      type: FOLLOW_USER_FAILURE,
      error: e
    });
  }
}

function* watchFollow() {
  yield takeLatest(FOLLOW_USER_REQUEST, follow);
}

// unFollow
function unFollowAPI(data) {
  return axios.delete(`/users/${data.userId}/followings`, {
    withCredentials: true
  });
}

function* unFollow(action) {
  try {
    const result = yield call(unFollowAPI, action.data);
    yield put({
      type: UN_FOLLOW_USER_SUCCESS,
      data: result.data
    });
  } catch (e) {
    console.error(e);

    yield put({
      type: UN_FOLLOW_USER_FAILURE,
      error: e
    });
  }
}

function* watchUnFollow() {
  yield takeLatest(UN_FOLLOW_USER_REQUEST, unFollow);
}

// loadFollowings
function loadFollowingsAPI({userId, offset = 0, limit = 3}) {
  // 디폴트 매개변수가 null 인 경우는 동작하지 않음
  return axios.get(
    `/users/${userId || 0}/followings?offset=${offset}&limit=${limit}`,
    {
      withCredentials: true
    }
  );
}

function* loadFollowings(action) {
  try {
    const result = yield call(loadFollowingsAPI, action.data);
    yield put({
      type: LOAD_FOLLOWINGS_SUCCESS,
      data: result.data
    });
  } catch (e) {
    console.error(e);

    yield put({
      type: LOAD_FOLLOWINGS_FAILURE,
      error: e
    });
  }
}

function* watchLoadFollowings() {
  yield takeLatest(LOAD_FOLLOWINGS_REQUEST, loadFollowings);
}

// loadFollowers
function loadFollowersAPI({userId, offset = 0, limit = 3}) {
  // 디폴트 매개변수가 null 인 경우는 동작하지 않음
  return axios.get(
    `/users/${userId || 0}/followers?offset=${offset}&limit=${limit}`,
    {
      withCredentials: true
    }
  );
}

function* loadFollowers(action) {
  try {
    const result = yield call(loadFollowersAPI, action.data);
    yield put({
      type: LOAD_FOLLOWERS_SUCCESS,
      data: result.data
    });
  } catch (e) {
    console.error(e);

    yield put({
      type: LOAD_FOLLOWERS_FAILURE,
      error: e
    });
  }
}

function* watchLoadFollowers() {
  yield takeLatest(LOAD_FOLLOWERS_REQUEST, loadFollowers);
}

// removeFollower
function removeFollowerAPI(data) {
  return axios.delete(`/users/${data.userId}/followers`, {
    withCredentials: true
  });
}

function* removeFollower(action) {
  try {
    const result = yield call(removeFollowerAPI, action.data);
    yield put({
      type: REMOVE_FOLLOWER_SUCCESS,
      data: result.data
    });
  } catch (e) {
    console.error(e);

    yield put({
      type: REMOVE_FOLLOWER_FAILURE,
      error: e
    });
  }
}

function* watchRemoveFollower() {
  yield takeLatest(REMOVE_FOLLOWER_REQUEST, removeFollower);
}

// editNickname
function editNicknameAPI(data) {
  return axios.patch(
    '/users/nickname',
    {nickname: data.nickname},
    {
      withCredentials: true
    }
  );
}

function* editNickname(action) {
  try {
    const result = yield call(editNicknameAPI, action.data);
    yield put({
      type: EDIT_NICKNAME_SUCCESS,
      data: result.data
    });
  } catch (e) {
    console.error(e);

    yield put({
      type: EDIT_NICKNAME_FAILURE,
      error: e
    });
  }
}

function* watchEditNickname() {
  yield takeLatest(EDIT_NICKNAME_REQUEST, editNickname);
}

export default function* userSaga() {
  yield all([
    fork(watchLogin),
    fork(watchLogout),
    fork(watchLoadUser),
    fork(watchSignUp),
    fork(watchFollow),
    fork(watchUnFollow),
    fork(watchLoadFollowings),
    fork(watchLoadFollowers),
    fork(watchRemoveFollower),
    fork(watchEditNickname)
  ]);
}
