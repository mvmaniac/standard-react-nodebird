import {all, call} from 'redux-saga/effects';
import axios from 'axios';

import {API_URL} from '../config/config';
import userSaga from './user';
import postSaga from './post';

axios.defaults.baseURL = API_URL;

export default function* rootSaga() {
  yield all([call(userSaga), call(postSaga)]);
}
