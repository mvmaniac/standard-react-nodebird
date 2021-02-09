import {all, call, delay, fork, put, takeLatest} from 'redux-saga/effects';
import axios from 'axios';

import faker from 'faker';

import {
  generateDummyPost,
  LOAD_POST_REQUEST,
  LOAD_POST_SUCCESS,
  LOAD_POST_FAILURE,
  ADD_POST_REQUEST,
  ADD_POST_SUCCESS,
  ADD_POST_FAILURE,
  REMOVE_POST_REQUEST,
  REMOVE_POST_SUCCESS,
  REMOVE_POST_FAILURE,
  ADD_COMMENT_REQUEST,
  ADD_COMMENT_SUCCESS,
  ADD_COMMENT_FAILURE
} from '../reducers/post';
import {ADD_POST_TO_ME, REMOVE_POST_OF_ME} from '../reducers/user';

faker.seed(10000);

function loadPostAPI(data) {
  return axios.post('/api/post', data);
}

function* loadPost(action) {
  try {
    // const result = yield call(loadPostAPI, action.data);

    delay(1000);

    yield put({
      type: LOAD_POST_SUCCESS,
      data: generateDummyPost(10)
    });
  } catch (error) {
    console.error(error);

    yield put({
      type: LOAD_POST_FAILURE,
      error: error.response.data
    });
  }
}

function addPostAPI(data) {
  return axios.post('/posts', {content: data});
}

function* addPost(action) {
  try {
    const result = yield call(addPostAPI, action.data);

    yield put({
      type: ADD_POST_SUCCESS,
      data: result.data
    });

    yield put({
      type: ADD_POST_TO_ME,
      data: result.data.id
    });
  } catch (error) {
    console.error(error);

    yield put({
      type: ADD_POST_FAILURE,
      error: error.response.data
    });
  }
}

function removePostAPI(data) {
  return axios.post(`/api/post/${data}`, data);
}

function* removePost(action) {
  try {
    // const result = yield call(removePostAPI, action.data);

    delay(1000);

    yield put({
      type: REMOVE_POST_SUCCESS,
      data: action.data
    });

    yield put({
      type: REMOVE_POST_OF_ME,
      data: action.data
    });
  } catch (error) {
    console.error(error);

    yield put({
      type: REMOVE_POST_FAILURE,
      error: error.response.data
    });
  }
}

function addCommentAPI(data) {
  return axios.post(`/posts/${data.postId}/comments`, data);
}

function* addComment(action) {
  try {
    const result = yield call(addCommentAPI, action.data);

    yield put({
      type: ADD_COMMENT_SUCCESS,
      data: result.data
    });
  } catch (error) {
    console.error(error);

    yield put({
      type: ADD_COMMENT_FAILURE,
      error: error.response.data
    });
  }
}

function* watchLoadPost() {
  yield takeLatest(LOAD_POST_REQUEST, loadPost);
}

function* watchAddPost() {
  yield takeLatest(ADD_POST_REQUEST, addPost);
}

function* watchRemovePost() {
  yield takeLatest(REMOVE_POST_REQUEST, removePost);
}

function* watchAddComment() {
  yield takeLatest(ADD_COMMENT_REQUEST, addComment);
}

export default function* postSaga() {
  yield all([
    fork(watchLoadPost),
    fork(watchAddPost),
    fork(watchRemovePost),
    fork(watchAddComment)
  ]);
}