import { all } from 'redux-saga/effects';

import { weatherSagas } from './weather';

export function* rootSaga(): any {
  return yield all([weatherSagas]);
}
