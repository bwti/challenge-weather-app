import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { persistStore } from 'redux-persist';
import logger from 'redux-logger';

import { persistReducers } from './persitReducers';
import { rootSaga } from './rootSaga';

const sagaMiddleware = createSagaMiddleware();
const persistedReducer = persistReducers();

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [sagaMiddleware, logger],
});

export const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
