import {all, fork, put, takeLatest, call} from 'redux-saga/effects';
import axios from 'axios';

import {
  ADD_POST_REQUEST,
  ADD_POST_FAILURE,
  ADD_POST_SUCCESS,
  ADD_COMMENT_REQUEST,
  ADD_COMMENT_SUCCESS,
  ADD_COMMENT_FAILURE,
  LOAD_MAIN_POSTS_REQUEST,
  LOAD_MAIN_POSTS_SUCCESS,
  LOAD_MAIN_POSTS_FAILURE,
  LOAD_HASHTAG_POSTS_REQUEST,
  LOAD_USER_POSTS_REQUEST,
  LOAD_USER_POSTS_SUCCESS,
  LOAD_USER_POSTS_FAILURE,
  LOAD_HASHTAG_POSTS_SUCCESS,
  LOAD_HASHTAG_POSTS_FAILURE,
  LOAD_COMMENTS_REQUEST,
  LOAD_COMMENTS_SUCCESS,
  LOAD_COMMENTS_FAILURE,
  UPLOAD_IMAGES_REQUEST,
  UPLOAD_IMAGES_SUCCESS,
  UPLOAD_IMAGES_FAILURE
} from '../reducers/post';

// addPost
function addPostAPI (data) {
  return axios.post('/posts', data, {
    withCredentials: true
  });
}

function* addPost (action) {
  try {
    const result = yield call(addPostAPI, action.data);
    yield put({
      type: ADD_POST_SUCCESS,
      data: result.data
    });
  } catch (e) {
    yield put({
      type: ADD_POST_FAILURE,
      error: e
    });
  }
}

function* watchAddPost () {
  yield takeLatest(ADD_POST_REQUEST, addPost);
}

// loadMainPosts
function loadMainPostsAPI () {
  return axios.get('/posts');
}

function* loadMainPosts () {
  try {
    const result = yield call(loadMainPostsAPI);
    yield put({
      type: LOAD_MAIN_POSTS_SUCCESS,
      data: result.data
    });
  } catch (e) {
    yield put({
      type: LOAD_MAIN_POSTS_FAILURE,
      error: e
    });
  }
}

function* watchLoadMainPosts () {
  yield takeLatest(LOAD_MAIN_POSTS_REQUEST, loadMainPosts);
}

// loadHashtagPosts
function loadHashtagPostsAPI (data) {
  return axios.get(`/hashtags/${data.tag}`);
}

function* loadHashtagPosts (action) {
  try {
    const result = yield call(loadHashtagPostsAPI, action.data);
    yield put({
      type: LOAD_HASHTAG_POSTS_SUCCESS,
      data: result.data
    });
  } catch (e) {
    yield put({
      type: LOAD_HASHTAG_POSTS_FAILURE,
      error: e
    });
  }
}

function* watchLoadHashtagPosts () {
  yield takeLatest(LOAD_HASHTAG_POSTS_REQUEST, loadHashtagPosts);
}

// loadUserPosts
function loadUserPostsAPI (data) {
  return axios.get(`/users/${data.userId}/posts`);
}

function* loadUserPosts (action) {
  try {
    const result = yield call(loadUserPostsAPI, action.data);
    yield put({
      type: LOAD_USER_POSTS_SUCCESS,
      data: result.data
    });
  } catch (e) {
    yield put({
      type: LOAD_USER_POSTS_FAILURE,
      error: e
    });
  }
}

function* watchLoadUserPosts () {
  yield takeLatest(LOAD_USER_POSTS_REQUEST, loadUserPosts);
}

// addComment
function addCommentAPI (data) {
  return axios.post(
    `/posts/${data.postId}/comments`,
    {content: data.content},
    {withCredentials: true}
  );
}

function* addComment (action) {
  try {
    const result = yield call(addCommentAPI, action.data);
    yield put({
      type: ADD_COMMENT_SUCCESS,
      data: {
        postId: action.data.postId,
        comment: result.data
      }
    });
  } catch (e) {
    yield put({
      type: ADD_COMMENT_FAILURE,
      error: e
    });
  }
}

function* watchAddComment () {
  yield takeLatest(ADD_COMMENT_REQUEST, addComment);
}

// loadComments
function loadCommentAPI (data) {
  return axios.get( `/posts/${data.postId}/comments`);
}

function* loadComment (action) {
  try {
    const result = yield call(loadCommentAPI, action.data);
    yield put({
      type: LOAD_COMMENTS_SUCCESS,
      data: {
        postId: action.data.postId,
        comments: result.data
      }
    });
  } catch (e) {
    yield put({
      type: LOAD_COMMENTS_FAILURE,
      error: e
    });
  }
}

function* watchLoadComments () {
  yield takeLatest(LOAD_COMMENTS_REQUEST, loadComment);
}

// uploadImages
function uploadImagesAPI (data) {
  return axios.post( `/posts/images`, data, {
    withCredentials: true
  });
}

function* uploadImages (action) {
  try {
    const result = yield call(uploadImagesAPI, action.data);
    yield put({
      type: UPLOAD_IMAGES_SUCCESS,
      data: result.data
    });
  } catch (e) {
    yield put({
      type: UPLOAD_IMAGES_FAILURE,
      error: e
    });
  }
}

function* watchUploadImages () {
  yield takeLatest(UPLOAD_IMAGES_REQUEST, uploadImages);
}

export default function* postSaga () {
  yield all([
    fork(watchAddPost),
    fork(watchLoadMainPosts),
    fork(watchAddComment),
    fork(watchLoadComments),
    fork(watchLoadHashtagPosts),
    fork(watchLoadUserPosts),
    fork(watchUploadImages)
  ]);
}
