import { Link, useParams } from 'react-router-dom';
import Spinner from '../components/Spinner';
import PostAuthor from '../features/posts/PostAuthor';
import ReactionButtons from '../features/posts/ReactionButtons';
import TimeAgo from '../features/posts/TimeAgo';
import { Post } from '../types/post';
import { posts } from '../data/posts';

const SinglePostPage = () => {
  const { postId } = useParams<{ postId: string }>();

  const useGetPostQuery: (postId: string) => {
    loading: boolean;
    data: Post | null;
    error: { message: string } | null;
  } = (postId) => {
    const post = posts.find((post) => post.id === postId);

    if (!post) {
      return {
        loading: false,
        data: null,
        error: {
          message: 'Post not found',
        },
      };
    }
    return {
      loading: false,
      data: post,
      error: null,
    };
  };

  if (!postId) {
    return (
      <div id="error-page">
        <h1>Oops!</h1>
        <p>Sorry, an error has occured.</p>
        <p>
          <i>Error: Post Id is not valid.</i>
        </p>
      </div>
    );
  }

  let content: JSX.Element;

  const {
    loading: getPostQueryLoading,
    data: getPostQuerydata,
    error: getPostQueryError,
  } = useGetPostQuery(postId);

  if (getPostQueryLoading) {
    content = <Spinner text="Loading..." />;
  } else if (!getPostQueryLoading && getPostQuerydata) {
    content = (
      <article>
        <h2>{getPostQuerydata.title}</h2>
        <div>
          <PostAuthor userId={getPostQuerydata.userId} />
          <TimeAgo timestamp={getPostQuerydata.date} />
        </div>
        <p className="post-content">{getPostQuerydata.content}</p>
        <ReactionButtons post={getPostQuerydata} />
        <Link to={`/editPost/${getPostQuerydata.id}`} className="button">
          Edit Post
        </Link>
      </article>
    );
  } else {
    content = (
      <div id="error-page">
        <h1>Oops!</h1>
        <p>Sorry, an unexpected error has occured.</p>
        <p>
          <i>Error: {getPostQueryError?.message || 'Unknown error'}</i>
        </p>
      </div>
    );
  }
  return <section>{content}</section>;
};

export default SinglePostPage;
