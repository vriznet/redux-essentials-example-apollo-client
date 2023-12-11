import { Link, useParams } from 'react-router-dom';
import Spinner from '../components/Spinner';
import PostAuthor from '../features/posts/PostAuthor';
import ReactionButtons from '../features/posts/ReactionButtons';
import TimeAgo from '../features/posts/TimeAgo';
import { selectPostById } from '../redux/module/postsSlice';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/module';

const SinglePostPage = () => {
  const { postId } = useParams<{ postId: string }>();

  if (!postId) {
    return null;
  }

  const post = useSelector((state: RootState) => selectPostById(state, postId));
  const postsStatus = useSelector((state: RootState) => state.posts.status);

  let content: JSX.Element;

  if (postsStatus === 'loading') {
    content = <Spinner text="Loading..." />;
  } else {
    content = (
      <article>
        <h2>{post?.title}</h2>
        <div>
          <PostAuthor userId={post?.userId || '0'} />
          <TimeAgo timestamp={post?.date || '0'} />
        </div>
        <p className="post-content">{post?.content}</p>
        <ReactionButtons post={post} />
        <Link to={`/editPost/${post?.id}`} className="button">
          Edit Post
        </Link>
      </article>
    );
  }
  return <section>{content}</section>;
};

export default SinglePostPage;
