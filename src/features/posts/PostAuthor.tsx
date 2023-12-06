import { useSelector } from 'react-redux';
import { RootState } from '../../redux/module';

interface IPostAuthorProps {
  userId: string;
}

const PostAuthor = (props: IPostAuthorProps) => {
  const author = useSelector((state: RootState) =>
    state.users.find((user) => user.id === props.userId)
  );

  return <span>by {author ? author.name : 'Unknown author'}</span>;
};

export default PostAuthor;
