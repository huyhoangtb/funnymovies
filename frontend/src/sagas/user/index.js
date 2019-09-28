import Requester from 'common/network/http/Request';
import endpoints from 'configs/endpoints';
import userActions, { userActionTypes } from 'action-creators/user';
import { call, fork, put, takeEvery, } from 'redux-saga/effects';

function* logout(action) {
  const { options } = action;
  const result = yield call(
    Requester.get,
    endpoints.user.logout,
  );
  yield put(userActions.receivedToken({}));
  yield put(userActions.receivedUserInfo({}));
  if (options && options.onSuccess) {
    options.onSuccess(result);
  }
}

export default function* () {
  return [
    yield takeEvery(userActionTypes.LOGOUT_FROM_APPLICATION, logout)
  ]
}
