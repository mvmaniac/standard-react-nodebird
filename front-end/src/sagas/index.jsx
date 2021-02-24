import {all, fork} from 'redux-saga/effects';
import axios from 'axios';

import {API_URL} from '../config/config';
import postSaga from './post';
import userSaga from './user';

axios.defaults.baseURL = API_URL;
axios.defaults.withCredentials = true;

export default function* rootSaga() {
  yield all([fork(postSaga), fork(userSaga)]);
}
