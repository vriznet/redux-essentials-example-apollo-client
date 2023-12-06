import { useDispatch } from 'react-redux';
import { reactionEmoji, reactionEmojiNameList } from '../../data/emoji';
import { Post } from '../../types/post';
import { reactionAdded } from '../../redux/module/postsSlice';

interface IReactionButtonsProps {
  post: Post;
}

const ReactionButtons = (props: IReactionButtonsProps) => {
  const dispatch = useDispatch();

  const useAddReactionMutation = () => {
    const addReaction = (params: { postId: string; reaction: string }) => {
      console.log('addReaction: ', params);
    };

    return [addReaction];
  };

  const [addReaction] = useAddReactionMutation();

  const reactionButtons = reactionEmojiNameList.map((reactionName) => {
    const handleAddReaction = () => {
      dispatch(reactionAdded({ postId: props.post.id, reactionName }));
      addReaction({ postId: props.post.id, reaction: reactionName });
    };

    return (
      <button
        key={reactionName}
        type="button"
        className="muted-button reaction-button"
        onClick={handleAddReaction}
        style={{ cursor: 'pointer' }}
      >
        {reactionEmoji[reactionName]} {props.post.reactions[reactionName]}
      </button>
    );
  });

  return <div>{reactionButtons}</div>;
};

export default ReactionButtons;
