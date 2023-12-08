import { Link } from 'react-router-dom';
import PostAuthor from './PostAuthor';
import ReactionButtons from './ReactionButtons';
import TimeAgo from './TimeAgo';
import { Post } from '../../types/post';
import { useMemo } from 'react';
import Spinner from '../../components/Spinner';
import classNames from 'classnames';
import { useSelector } from 'react-redux';
import { selectPosts } from '../../redux/module/postsSlice';
import { RootState } from '../../redux/module';

interface IPostExcerptProps {
  post: Post;
}

const PostExcerpt = (props: IPostExcerptProps) => {
  return (
    <article className="post-excerpt" key={`post-${props.post.id}`}>
      <h3>{props.post.title}</h3>
      <div>
        <PostAuthor userId={props.post.userId} />
        <TimeAgo timestamp={props.post.date} />
      </div>
      <p className="post-content">{props.post.content.substring(0, 100)}</p>

      <ReactionButtons post={props.post} />
      <Link to={`/post/${props.post.id}`} className="button muted-button">
        View Post
      </Link>
    </article>
  );
};

const PostsList = () => {
  const posts = useSelector(selectPosts);
  const postStatus = useSelector((state: RootState) => state.posts.status);
  const postError = useSelector((state: RootState) => state.posts.error);

  const sortedPosts = useMemo(() => {
    const sortedPosts = [...posts];
    sortedPosts.sort((a, b) => b.date.localeCompare(a.date));
    return sortedPosts;
  }, [posts]);

  let content: JSX.Element;

  if (postStatus === 'loading') {
    return <Spinner text="Loading..." />;
  } else if (postStatus === 'succeeded') {
    const renderedPosts = sortedPosts.map((post) => (
      <PostExcerpt key={`post-${post.id}`} post={post} />
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
