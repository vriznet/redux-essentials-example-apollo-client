import { Post } from '../types/post';

export const posts: Post[] = [
  {
    id: '1',
    title: 'My Post 1',
    content: 'My post content 1',
    userId: '1',
    date: new Date().toISOString(),
    reactions: {
      thumbsUp: 1,
      hooray: 2,
      heart: 3,
      rocket: 4,
      eyes: 5,
    },
  },
  {
    id: '2',
    title: 'My Post 2',
    content: 'My post content 2',
    userId: '2',
    date: new Date().toISOString(),
    reactions: {
      thumbsUp: 1,
      hooray: 2,
      heart: 3,
      rocket: 4,
      eyes: 5,
    },
  },
];
