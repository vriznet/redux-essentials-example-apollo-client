import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from '@reduxjs/toolkit';
import { Post, PostReactions } from '../../types/post';
import { RootState } from '.';
import { POSTS_QUERY } from '../../graphqls/post.queries';
import {
  apolloQueryWithDelay,
  deepRemoveTypename,
  deepRemoveTypenameInArray,
} from '../../utils';
import {
  AddNewPostMutation,
  AddNewPostMutationVariables,
  AddPostReactionMutation,
  AddPostReactionMutationVariables,
  PostsQuery,
  PostsQueryVariables,
  UpdatePostMutation,
  UpdatePostMutationVariables,
} from '../../gql-codegen/graphql';
import { client } from '../../apollo';
import {
  ADD_NEW_POST_MUTATION,
  ADD_POST_REACTION_MUTATION,
  UPDATE_POST_MUTATION,
} from '../../graphqls/post.mutations';

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

export const updatePost = createAsyncThunk(
  'posts/updatePost',
  async (updatePost: Omit<Post, 'date' | 'reactions' | 'userId'>) => {
    const response = await client.mutate<
      UpdatePostMutation,
      UpdatePostMutationVariables
    >({
      mutation: UPDATE_POST_MUTATION,
      variables: updatePost,
    });
    if (!response || !response.data) {
      console.error('Something went wrong.');
      return [];
    }
    return deepRemoveTypename(response.data.updatePost);
  }
);

export const addPostReaction = createAsyncThunk(
  'posts/addPostReaction',
  async (reaction: { postId: string; reactionName: string }) => {
    const response = await client.mutate<
      AddPostReactionMutation,
      AddPostReactionMutationVariables
    >({
      mutation: ADD_POST_REACTION_MUTATION,
      variables: {
        postId: reaction.postId,
        reactionName: reaction.reactionName,
      },
    });
    if (
      !response ||
      !response.data ||
      response.data.addPostReaction.ok === false
    ) {
      console.error('Something went wrong.');
      return null;
    }
    return {
      postId: reaction.postId,
      reactionName: reaction.reactionName,
    };
  }
);

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
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
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        const { id, title, content, userId, date, reactions } = action.payload;
        const existingPost = state.posts.find((post) => post.id === id);
        if (existingPost) {
          existingPost.title = title ?? existingPost.title;
          existingPost.content = content ?? existingPost.content;
          existingPost.userId = userId ?? existingPost.userId;
          existingPost.date = date ?? existingPost.date;
          existingPost.reactions = reactions ?? existingPost.reactions;
        }
      })
      .addCase(addPostReaction.fulfilled, (state, action) => {
        if (!action.payload) return;
        const { postId, reactionName } = action.payload;
        const existingPost = state.posts.find((post) => post.id === postId);
        if (existingPost) {
          existingPost.reactions[reactionName as keyof PostReactions]++;
        }
      });
  },
});

export const selectPosts = (state: RootState) => state.posts.posts;
export const selectPostById = (state: RootState, postId: string) =>
  state.posts.posts.find((post) => post.id === postId);
export const selectPostsByUser = createSelector(
  [selectPosts, (state: RootState, userId: string) => userId],
  (posts, userId) => posts.filter((post) => post.userId === userId)
);

export default postsSlice.reducer;
