import { useSelector } from 'react-redux';
import { RootState } from '../../redux/module';
import { selectUserById } from '../../redux/module/usersSlice';

interface IPostAuthorProps {
  userId: string;
}

const PostAuthor = (props: IPostAuthorProps) => {
  const author = useSelector((state: RootState) =>
    selectUserById(state, props.userId)
  );

  return <span>by {author ? author.name : 'Unknown author'}</span>;
};

export default PostAuthor;
