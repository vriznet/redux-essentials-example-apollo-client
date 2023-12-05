export type PostReactions = {
  thumbsUp: number;
  hooray: number;
  heart: number;
  rocket: number;
  eyes: number;
};

export type Post = {
  id: string;
  title: string;
  content: string;
  userId: string;
  date: string;
  reactions: PostReactions;
};
