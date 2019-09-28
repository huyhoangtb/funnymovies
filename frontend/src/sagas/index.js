import {call, fork, put, takeLatest, all, takeEvery} from 'redux-saga/effects';
import commonSaga from './common';
import socket from './socket';
import user from './user';
import context from './context';
import formSaga from './form';
import nodeData from './client-database';

export default function* root() {
  try {

    yield all([
      ...formSaga(),
      ...socket(),
      ...user(),
      ...context(),
      ...nodeData(),
    ])

  } catch (e) {
    console.log(e);
  }
}
