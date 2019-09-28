import { takeLatest } from 'redux-saga/effects';

function* common(action) {

}

export default function* () {
  return [
    yield takeLatest('COMMON_SAGA*', common)
  ]
}

