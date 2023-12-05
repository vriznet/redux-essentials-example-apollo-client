import { Link } from 'react-router-dom';
import PostAuthor from './PostAuthor';
import ReactionButtons from './ReactionButtons';
import TimeAgo from './TimeAgo';
import { Post } from '../../types/post';
import { posts } from '../../data/posts';
import { useMemo } from 'react';
import Spinner from '../../components/Spinner';
import classNames from 'classnames';

interface IPostExcerptProps {
  post: Post;
}

const PostExcerpt = (props: IPostExcerptProps) => {
  return (
    <article className="post-excerpt" key={props.post.id}>
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
  const useGetPostsQuery: () => {
    loading: boolean;
    data: {
      posts: Post[];
    } | null;
    error: {
      message: string;
    } | null;
  } = () => {
    return {
      loading: false,
      data: {
        posts,
      },
      error: null,
    };
  };
  const {
    loading: getPostsQueryLoading,
    data: getPostsQueryData,
    error: getPostsQueryError,
  } = useGetPostsQuery();

  if (getPostsQueryLoading || !getPostsQueryData) {
    return <Spinner text="Loading..." />;
  }

  const sortedPosts = useMemo(() => {
    const sortedPosts = [...getPostsQueryData.posts];
    sortedPosts.sort((a, b) => b.date.localeCompare(a.date));
    return sortedPosts;
  }, [getPostsQueryData.posts]);

  let content: JSX.Element;

  if (!getPostsQueryLoading && getPostsQueryData) {
    const renderedPosts = sortedPosts.map((post) => (
      <PostExcerpt key={post.id} post={post} />
    ));

    const containerClassname = classNames('posts-container', {
      disabled: getPostsQueryLoading,
    });

    content = <div className={containerClassname}>{renderedPosts}</div>;
  } else if (getPostsQueryError) {
    content = <div>{getPostsQueryError.message}</div>;
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
