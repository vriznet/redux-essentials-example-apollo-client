import { combineReducers } from '@reduxjs/toolkit';
import postsReducer from './postsSlice';
import usersReducer from './usersSlice';

export const rootReducer = combineReducers({
  posts: postsReducer,
  users: usersReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
