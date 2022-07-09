import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistReducer } from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import { RootReducer, rootReducer } from './rootReducer';

const persistConfig = {
  key: 'challengeWeatherPersistor',
  storage: AsyncStorage,
  whitelist: [],
  stateReconciler: autoMergeLevel2,
};

const persistReducers = () => {
  return persistReducer<RootReducer>(persistConfig, rootReducer);
};

export { persistReducers };
