import { reactionEmoji, reactionEmojiNameList } from '../../data/emoji';
import { Post } from '../../types/post';

interface IReactionButtonsProps {
  post: Post;
}

const ReactionButtons = (props: IReactionButtonsProps) => {
  const useAddReactionMutation = () => {
    const addReaction = (params: { postId: string; reaction: string }) => {
      console.log('addReaction: ', params);
    };

    return [addReaction];
  };

  const [addReaction] = useAddReactionMutation();

  const reactionButtons = reactionEmojiNameList.map((reactionName) => {
    const handleAddReaction = () => {
      addReaction({ postId: props.post.id, reaction: reactionName });
    };

    return (
      <button
        key={reactionName}
        type="button"
        className="muted-button reaction-button"
        onClick={handleAddReaction}
      >
        {reactionEmoji[reactionName]} {props.post.reactions[reactionName]}
      </button>
    );
  });

  return <div>{reactionButtons}</div>;
};

export default ReactionButtons;
