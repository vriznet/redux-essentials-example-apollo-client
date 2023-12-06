import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Post } from '../../types/post';
import { RootState } from '.';
import { ReactionName } from '../../types/common';
import { POSTS_QUERY } from '../../graphqls/post.queries';
import {
  apolloQueryWithDelay,
  deepRemoveTypename,
  deepRemoveTypenameInArray,
} from '../../utils';
import {
  AddNewPostMutation,
  AddNewPostMutationVariables,
  PostsQuery,
  PostsQueryVariables,
} from '../../gql-codegen/graphql';
import { client } from '../../apollo';
import { ADD_NEW_POST_MUTATION } from '../../graphqls/post.mutations';

type PostsState = {
  posts: Post[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | undefined;
};

const initialState: PostsState = {
  posts: [],
  status: 'idle',
  error: undefined,
};

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const response = await apolloQueryWithDelay<PostsQuery, PostsQueryVariables>(
    POSTS_QUERY,
    3000
  );
  if (!response) {
    console.error('Post not found.');
    return [];
  }
  return deepRemoveTypenameInArray(response.posts) as Post[];
});

export const addNewPost = createAsyncThunk(
  'posts/addNewPost',
  async (initialPost: Omit<Post, 'id' | 'date' | 'reactions'>) => {
    const response = await client.mutate<
      AddNewPostMutation,
      AddNewPostMutationVariables
    >({
      mutation: ADD_NEW_POST_MUTATION,
      variables: initialPost,
    });
    if (!response || !response.data) {
      console.error('Something went wrong.');
      return [];
    }
    return deepRemoveTypename(response.data.addNewPost);
  }
);

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    postUpdated(state, action: { payload: Partial<Post> }) {
      const { id, title, content, userId, date, reactions } = action.payload;
      const existingPost = state.posts.find((post) => post.id === id);
      if (existingPost) {
        existingPost.title = title ?? existingPost.title;
        existingPost.content = content ?? existingPost.content;
        existingPost.userId = userId ?? existingPost.userId;
        existingPost.date = date ?? existingPost.date;
        existingPost.reactions = reactions ?? existingPost.reactions;
      }
    },
    reactionAdded(
      state,
      action: { payload: { postId: string; reactionName: ReactionName } }
    ) {
      const { postId, reactionName } = action.payload;
      const existingPost = state.posts.find((post) => post.id === postId);
      if (existingPost) {
        existingPost.reactions[reactionName]++;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addNewPost.fulfilled, (state, action) => {
        state.posts.push(action.payload);
      });
  },
});

export const selectPosts = (state: RootState) => state.posts.posts;
export const selectPostById = (state: RootState, postId: string) =>
  state.posts.posts.find((post) => post.id === postId);

export const { postUpdated, reactionAdded } = postsSlice.actions;

export default postsSlice.reducer;
