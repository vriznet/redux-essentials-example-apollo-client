import { createSlice, nanoid } from '@reduxjs/toolkit';
import { Post } from '../../types/post';
import { RootState } from '.';
import { ReactionName } from '../../types/common';

type PostsState = Post[];

const initialState: PostsState = [
  {
    id: '0',
    title: 'First Post!',
    content: 'Hello!',
    userId: '1',
    date: new Date().toISOString(),
    reactions: {
      thumbsUp: 0,
      hooray: 0,
      heart: 0,
      rocket: 0,
      eyes: 0,
    },
  },
  {
    id: '1',
    title: 'Second Post',
    content: 'More text',
    userId: '2',
    date: new Date().toISOString(),
    reactions: {
      thumbsUp: 0,
      hooray: 0,
      heart: 0,
      rocket: 0,
      eyes: 0,
    },
  },
];

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    postAdded: {
      reducer(state, action: { payload: Post }) {
        state.push(action.payload);
      },
      prepare({
        title,
        content,
        userId,
      }: Omit<Post, 'id' | 'date' | 'reactions'>) {
        return {
          payload: {
            id: nanoid(),
            title,
            content,
            userId,
            date: new Date().toISOString(),
            reactions: {
              thumbsUp: 0,
              hooray: 0,
              heart: 0,
              rocket: 0,
              eyes: 0,
            },
          },
        };
      },
    },
    postUpdated(state, action: { payload: Partial<Post> }) {
      const { id, title, content, userId, date, reactions } = action.payload;
      const existingPost = state.find((post) => post.id === id);
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
      const existingPost = state.find((post) => post.id === postId);
      if (existingPost) {
        existingPost.reactions[reactionName]++;
      }
    },
  },
});

export const selectPosts = (state: RootState) => state.posts;

export const { postAdded, postUpdated, reactionAdded } = postsSlice.actions;

export default postsSlice.reducer;
