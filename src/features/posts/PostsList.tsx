import { Link } from 'react-router-dom';
import PostAuthor from './PostAuthor';
import ReactionButtons from './ReactionButtons';
import TimeAgo from './TimeAgo';
import Spinner from '../../components/Spinner';
import classNames from 'classnames';
import { useSelector } from 'react-redux';
import { selectPostById, selectPostIds } from '../../redux/module/postsSlice';
import { RootState } from '../../redux/module';

interface IPostExcerptProps {
  postId: string;
}

const PostExcerpt = (props: IPostExcerptProps) => {
  const post = useSelector((state: RootState) =>
    selectPostById(state, props.postId)
  );
  if (!post) return null;
  return (
    <article className="post-excerpt" key={`post-${post?.id}`}>
      <h3>{post?.title}</h3>
      <div>
        <PostAuthor userId={post?.userId} />
        <TimeAgo timestamp={post?.date} />
      </div>
      <p className="post-content">{post?.content.substring(0, 100)}</p>

      <ReactionButtons post={post} />
      <Link to={`/post/${post?.id}`} className="button muted-button">
        View Post
      </Link>
    </article>
  );
};

const PostsList = () => {
  const orderedPostIds = useSelector(selectPostIds);
  const postStatus = useSelector((state: RootState) => state.posts.status);
  const postError = useSelector((state: RootState) => state.posts.error);

  let content: JSX.Element;

  if (postStatus === 'loading') {
    return <Spinner text="Loading..." />;
  } else if (postStatus === 'succeeded') {
    const renderedPosts = orderedPostIds.map((postId) => (
      <PostExcerpt key={postId} postId={postId as string} />
    ));

    const containerClassname = classNames('posts-container');

    content = <div className={containerClassname}>{renderedPosts}</div>;
  } else if (postStatus === 'failed') {
    content = <div>{postError}</div>;
  } else {
    content = <div>Something went wrong...</div>;
  }

  return (
    <section className="posts-list">
      <h2>Posts</h2>
      {content}
    </section>
  );
};

export default PostsList;
