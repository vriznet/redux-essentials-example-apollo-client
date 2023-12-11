import {
  createAsyncThunk,
  createEntityAdapter,
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
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | undefined;
};

const postsAdpater = createEntityAdapter<Post>({
  sortComparer: (a, b) => b.date.localeCompare(a.date),
});

const initialState = postsAdpater.getInitialState<PostsState>({
  status: 'idle',
  error: undefined,
});

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
        postsAdpater.upsertMany(state, action.payload);
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addNewPost.fulfilled, (state, action) => {
        postsAdpater.addOne(state, action.payload);
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        const { id, title, content, userId, date, reactions } = action.payload;
        const existingPost = state.entities[id];
        if (existingPost) {
          existingPost.title = title;
          existingPost.content = content;
          existingPost.userId = userId;
          existingPost.date = date;
          existingPost.reactions = reactions;
        }
      })
      .addCase(addPostReaction.fulfilled, (state, action) => {
        if (!action.payload) return;
        const { postId, reactionName } = action.payload;
        const existingPost = state.entities[postId];
        if (existingPost) {
          existingPost.reactions[reactionName as keyof PostReactions]++;
        }
      });
  },
});

export const {
  selectAll: selectPosts,
  selectById: selectPostById,
  selectIds: selectPostIds,
} = postsAdpater.getSelectors<RootState>((state: RootState) => state.posts);

export default postsSlice.reducer;
