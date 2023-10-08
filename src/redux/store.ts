import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './module';

const store = configureStore({
  reducer: rootReducer,
});

export default store;
