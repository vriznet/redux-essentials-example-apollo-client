import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '../../types/user';
import { RootState } from '.';
import { apolloQueryWithDelay, deepRemoveTypenameInArray } from '../../utils';
import { UsersQuery, UsersQueryVariables } from '../../gql-codegen/graphql';
import { USERS_QUERY } from '../../graphqls/user.queries';

type UsersState = {
  users: User[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | undefined;
};

const initialState: UsersState = {
  users: [],
  status: 'idle',
  error: undefined,
};

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await apolloQueryWithDelay<UsersQuery, UsersQueryVariables>(
    USERS_QUERY,
    2000
  );
  if (!response) {
    console.error('User not found.');
    return [];
  }
  return deepRemoveTypenameInArray(response.users) as User[];
});

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const selectUsers = (state: RootState) => state.users.users;
export const selectUserById = (state: RootState, userId: string) =>
  state.users.users.find((user) => user.id === userId);

export default usersSlice.reducer;
