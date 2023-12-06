import { createSlice } from '@reduxjs/toolkit';
import { User } from '../../types/user';
import { RootState } from '.';

type UsersState = User[];

const initialState: UsersState = [
  { id: '1', name: 'Tianna Jenkins' },
  { id: '2', name: 'Kevin Grant' },
  { id: '3', name: 'Madison Price' },
];

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
});

export const selectUsers = (state: RootState) => state.users;

export default usersSlice.reducer;
