import { combineReducers } from '@reduxjs/toolkit';

import { weatherReducer } from './weather';

const rootReducer = combineReducers({
  weatherStore: weatherReducer,
});

export type RootReducer = ReturnType<typeof rootReducer>;
export { rootReducer };
