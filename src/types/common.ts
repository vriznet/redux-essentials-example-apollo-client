export type ReactionName = 'thumbsUp' | 'hooray' | 'heart' | 'rocket' | 'eyes';

export type Reactions = {
  [key in ReactionName]: string;
};
