import {all, call, fork, put, takeLatest} from 'redux-saga/effects';
import axios from 'axios';

import {
  GET_POST_REQUEST,
  GET_POST_SUCCESS,
  GET_POST_FAILURE,
  LOAD_POST_REQUEST,
  LOAD_POST_SUCCESS,
  LOAD_POST_FAILURE,
  LOAD_POST_BY_USER_REQUEST,
  LOAD_POST_BY_USER_SUCCESS,
  LOAD_POST_BY_USER_FAILURE,
  LOAD_POST_BY_HASHTAG_REQUEST,
  LOAD_POST_BY_HASHTAG_SUCCESS,
  LOAD_POST_BY_HASHTAG_FAILURE,
  ADD_POST_REQUEST,
  ADD_POST_SUCCESS,
  ADD_POST_FAILURE,
  REMOVE_POST_REQUEST,
  REMOVE_POST_SUCCESS,
  REMOVE_POST_FAILURE,
  ADD_COMMENT_REQUEST,
  ADD_COMMENT_SUCCESS,
  ADD_COMMENT_FAILURE,
  REMOVE_COMMENT_REQUEST,
  REMOVE_COMMENT_SUCCESS,
  REMOVE_COMMENT_FAILURE,
  RETWEET_REQUEST,
  RETWEET_SUCCESS,
  RETWEET_FAILURE,
  LIKE_POST_REQUEST,
  LIKE_POST_SUCCESS,
  LIKE_POST_FAILURE,
  UN_LIKE_POST_REQUEST,
  UN_LIKE_POST_SUCCESS,
  UN_LIKE_POST_FAILURE,
  UPLOAD_IMAGES_REQUEST,
  UPLOAD_IMAGES_SUCCESS,
  UPLOAD_IMAGES_FAILURE
} from '../reducers/post';
import {ADD_POST_TO_ME, REMOVE_POST_OF_ME} from '../reducers/user';

function getPostAPI(data) {
  return axios.get(`/posts/${data.postId}`);
}
function* getPost(action) {
  try {
    const result = yield call(getPostAPI, action.data);

    yield put({
      type: GET_POST_SUCCESS,
      data: result.data
    });
  } catch (error) {
    console.error(error);

    yield put({
      type: GET_POST_FAILURE,
      error: error.response.data
    });
  }
}

function loadPostAPI(lastId = 0) {
  return axios.get(`/posts?lastId=${lastId}`);
}
function* loadPost(action) {
  try {
    const result = yield call(loadPostAPI, action.data.lastId);

    yield put({
      type: LOAD_POST_SUCCESS,
      data: result.data
    });
  } catch (error) {
    console.error(error);

    yield put({
      type: LOAD_POST_FAILURE,
      error: error.response.data
    });
  }
}

function loadPostByUserAPI(lastId = 0, userId) {
  return axios.get(`/posts?lastId=${lastId}&userId=${userId}`);
}
function* loadPostByUser(action) {
  try {
    const {data} = action;
    const result = yield call(loadPostByUserAPI, data.lastId, data.userId);

    yield put({
      type: LOAD_POST_BY_USER_SUCCESS,
      data: result.data
    });
  } catch (error) {
    console.error(error);

    yield put({
      type: LOAD_POST_BY_USER_FAILURE,
      error: error.response.data
    });
  }
}

function loadPostByHashtagAPI(lastId = 0, hashtag) {
  return axios.get(
    `/posts?lastId=${lastId}&hashtag=${encodeURIComponent(hashtag)}`
  );
}
function* loadPostByHashtag(action) {
  try {
    const {data} = action;
    const result = yield call(loadPostByHashtagAPI, data.lastId, data.hashtag);

    yield put({
      type: LOAD_POST_BY_HASHTAG_SUCCESS,
      data: result.data
    });
  } catch (error) {
    console.error(error);

    yield put({
      type: LOAD_POST_BY_HASHTAG_FAILURE,
      error: error.response.data
    });
  }
}

function addPostAPI(data) {
  const {content, imagePaths} = data;

  return axios.post('/posts', {
    content,
    imagePaths
  });
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
  return axios.delete(`/posts/${data.postId}`);
}
function* removePost(action) {
  try {
    const result = yield call(removePostAPI, action.data);

    yield put({
      type: REMOVE_POST_SUCCESS,
      data: result.data
    });

    yield put({
      type: REMOVE_POST_OF_ME,
      data: result.data
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

function removeCommentAPI(data) {
  return axios.delete(`/posts/${data.postId}/comments/${data.commentId}`, data);
}
function* removeComment(action) {
  try {
    const result = yield call(removeCommentAPI, action.data);

    yield put({
      type: REMOVE_COMMENT_SUCCESS,
      data: result.data
    });
  } catch (error) {
    console.error(error);

    yield put({
      type: REMOVE_COMMENT_FAILURE,
      error: error.response.data
    });
  }
}

function retweetAPI(data) {
  return axios.patch(`/posts/${data.postId}/retweet`);
}
function* retweet(action) {
  try {
    const result = yield call(retweetAPI, action.data);

    yield put({
      type: RETWEET_SUCCESS,
      data: result.data
    });
  } catch (error) {
    console.error(error);

    yield put({
      type: RETWEET_FAILURE,
      error: error.response.data
    });
  }
}

function likePostAPI(data) {
  return axios.patch(`/posts/${data.postId}/like`);
}
function* likePost(action) {
  try {
    const result = yield call(likePostAPI, action.data);

    yield put({
      type: LIKE_POST_SUCCESS,
      data: result.data
    });
  } catch (error) {
    console.error(error);

    yield put({
      type: LIKE_POST_FAILURE,
      error: error.response.data
    });
  }
}

function unLikePostAPI(data) {
  return axios.delete(`/posts/${data.postId}/like`);
}
function* unLikePost(action) {
  try {
    const result = yield call(unLikePostAPI, action.data);

    yield put({
      type: UN_LIKE_POST_SUCCESS,
      data: result.data
    });
  } catch (error) {
    console.error(error);

    yield put({
      type: UN_LIKE_POST_FAILURE,
      error: error.response.data
    });
  }
}

function uploadImagesAPI(data) {
  return axios.post('/posts/images', data);
}
function* uploadImages(action) {
  try {
    const result = yield call(uploadImagesAPI, action.data);

    yield put({
      type: UPLOAD_IMAGES_SUCCESS,
      data: result.data
    });
  } catch (error) {
    console.error(error);

    yield put({
      type: UPLOAD_IMAGES_FAILURE,
      error: error.response.data
    });
  }
}

function* watchGetPost() {
  yield takeLatest(GET_POST_REQUEST, getPost);
}

function* watchLoadPost() {
  yield takeLatest(LOAD_POST_REQUEST, loadPost);
}

function* watchLoadPostByUser() {
  yield takeLatest(LOAD_POST_BY_USER_REQUEST, loadPostByUser);
}

function* watchLoadPostByHashtag() {
  yield takeLatest(LOAD_POST_BY_HASHTAG_REQUEST, loadPostByHashtag);
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

function* watchRemoveComment() {
  yield takeLatest(REMOVE_COMMENT_REQUEST, removeComment);
}

function* watchRetweet() {
  yield takeLatest(RETWEET_REQUEST, retweet);
}

function* watchLikePost() {
  yield takeLatest(LIKE_POST_REQUEST, likePost);
}

function* watchUnLikePost() {
  yield takeLatest(UN_LIKE_POST_REQUEST, unLikePost);
}

function* watchUploadImages() {
  yield takeLatest(UPLOAD_IMAGES_REQUEST, uploadImages);
}

export default function* postSaga() {
  yield all([
    fork(watchGetPost),
    fork(watchLoadPost),
    fork(watchLoadPostByUser),
    fork(watchLoadPostByHashtag),
    fork(watchAddPost),
    fork(watchRemovePost),
    fork(watchAddComment),
    fork(watchRemoveComment),
    fork(watchRetweet),
    fork(watchLikePost),
    fork(watchUnLikePost),
    fork(watchUploadImages)
  ]);
}
