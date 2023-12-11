import { useDispatch } from 'react-redux';
import { reactionEmoji, reactionEmojiNameList } from '../../data/emoji';
import { Post } from '../../types/post';
import { addPostReaction } from '../../redux/module/postsSlice';
import { AppDispatch } from '../../redux/store';

interface IReactionButtonsProps {
  post: Post | undefined;
}

const ReactionButtons = (props: IReactionButtonsProps) => {
  const dispatch = useDispatch<AppDispatch>();

  let reactionButtons;
  if (props.post === undefined) {
    reactionButtons = null;
  } else {
    const postId = props.post.id;
    const postReactions = props.post.reactions;
    reactionButtons = reactionEmojiNameList.map((reactionName) => {
      const handleAddReaction = () => {
        dispatch(addPostReaction({ postId, reactionName }));
      };

      return (
        <button
          key={reactionName}
          type="button"
          className="muted-button reaction-button"
          onClick={handleAddReaction}
          style={{ cursor: 'pointer' }}
        >
          {reactionEmoji[reactionName]} {postReactions[reactionName]}
        </button>
      );
    });
  }

  return <div>{reactionButtons}</div>;
};

export default ReactionButtons;
