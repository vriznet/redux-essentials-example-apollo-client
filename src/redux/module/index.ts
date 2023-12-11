import { combineReducers } from '@reduxjs/toolkit';
import postsReducer from './postsSlice';
import usersReducer from './usersSlice';
import notificationsReducer from './notificationsSlice';

export const rootReducer = combineReducers({
  posts: postsReducer,
  users: usersReducer,
  notifications: notificationsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
