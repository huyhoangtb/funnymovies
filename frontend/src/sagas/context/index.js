import Requester from 'common/network/http/Request';
import endpoints from 'configs/endpoints.js';
import contextActions, {contextActionTypes} from 'action-creators/context';
import {call, put, takeEvery, takeLatest} from 'redux-saga/effects';

function* getPublicContext(action) {
  const response = yield call(
    Requester.get,
    endpoints.context.publicContext,
  );


  if (response && response._success) {
    yield put(contextActions.setApplicationContext(response._result));
  }
}

export default function* () {
  return [
    yield takeEvery(contextActionTypes.LOAD_APP_CONTEXT, getPublicContext)
  ]
}
