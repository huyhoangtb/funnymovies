import Requester from 'common/network/http/Request';
import dataNodeActions, { dataActionTypes } from 'action-creators/client-database';
import { call, fork, put, takeEvery} from 'redux-saga/effects';

function* fetchData(action) {
  const { values, options, url } = action;
  const method = action.method || 'get';
  const response = yield call(
    Requester[method],
    url,
    values,
  );

  if (response && (response._success || (options && response[options.checkSuccessOnField]))) {
    if (options && options.dispatchAfterSuccess) {
      if (options.dispatchFullResponse) {
        yield put(options.dispatchAfterSuccess(response));
      } else {
        yield put(options.dispatchAfterSuccess(response._result));
      }
    }

    if (options && options.onSuccess) {
      if (options.dispatchFullResponse) {
        options.onSuccess(response, values);
      } else {
        options.onSuccess(response._result, values);
      }
    }
    if (options && options.namespace) {
      if (options.dispatchFullResponse) {
        yield put(dataNodeActions.storeDataUsingNamespace(response, options.namespace));
      } else {
        yield put(dataNodeActions.storeDataUsingNamespace(response._result, options.namespace));
      }
    }
    return;
  }
  if (options && options.onFail) {
    options.onFail(response, values);
  }
}


function* updateNode(action) {
  const { values, options, url } = action;
  const method = action.method || 'post';
  const response = yield call(
    Requester[method],
    url,
    values,
  );

  if (response && (response.success || (options && response[options.checkSuccessOnField]))) {
    if (options && options.dispatchAfterSuccess) {
      if (options.dispatchFullResponse) {
        yield put(options.dispatchAfterSuccess(response));
      } else {
        yield put(options.dispatchAfterSuccess(response.result));
      }
    }
    if (options && options.onSuccess) {
      if (options.dispatchFullResponse) {
        options.onSuccess(response, values);
      } else {
        options.onSuccess(response.result, values);
      }
    }
    return;
  }
  if (options && options.onFail) {
    options.onFail(response, values);
  }
}

export default function* () {
  return [
    yield takeEvery(dataActionTypes.FETCH_DATA, fetchData),
    yield takeEvery(dataActionTypes.UPDATE_NODE_DATA, updateNode)
  ]
}
