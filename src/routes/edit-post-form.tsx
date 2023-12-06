import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import Spinner from '../components/Spinner';
import { Post } from '../types/post';
import { useDispatch, useSelector } from 'react-redux';
import { postUpdated, selectPosts } from '../redux/module/postsSlice';

const EditPostForm = () => {
  const { postId } = useParams<{ postId: string }>();
  const posts = useSelector(selectPosts);

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

  const useUpdatePostMutation = () => {
    const updatePost = (params: {
      postId: string;
      title: string;
      content: string;
      userId: string;
    }) => {
      console.log('updatePost: ', params);
    };
    return [updatePost];
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

  const {
    loading: getPostQueryLoading,
    data: getPostQueryData,
    error: getPostQueryError,
  } = useGetPostQuery(postId);

  const [updatePost] = useUpdatePostMutation();

  const [title, setTitle] = useState(getPostQueryData?.title || '');
  const [content, setContent] = useState(getPostQueryData?.content || '');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onTitleChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  const onContentChanged = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const onSavePostClicked = () => {
    try {
      if (title && content && getPostQueryData) {
        dispatch(postUpdated({ id: postId, title, content }));
        updatePost({ postId, title, content, userId: getPostQueryData.userId });
        navigate(`/post/${postId}`);
      } else {
        console.error('Title and content are required.');
      }
    } catch (error) {
      console.error('Failed to save the post: ', error);
    }
  };

  if (getPostQueryLoading || !getPostQueryData) {
    return <Spinner text="Loading..." />;
  }

  if (getPostQueryError) {
    return (
      <section>
        <h2>Error</h2>
        <p>{getPostQueryError.message}</p>
      </section>
    );
  }

  return (
    <section
      style={{ border: '1px solid #333', margin: '16px 0px', padding: '16px' }}
    >
      <h2 style={{ marginBottom: '8px' }}>Edit Post</h2>
      <form>
        <div style={{ marginBottom: '8px' }}>
          <label htmlFor="postTitle" style={{ display: 'flex' }}>
            Post Title:
          </label>
          <input
            type="text"
            id="postTitle"
            name="postTitle"
            placeholder="What's on your mind?"
            value={title}
            onChange={onTitleChanged}
            disabled={getPostQueryLoading}
          />
        </div>
        <div style={{ marginBottom: '8px' }}>
          <label htmlFor="postContent" style={{ display: 'flex' }}>
            Content:
          </label>
          <textarea
            id="postContent"
            name="postContent"
            value={content}
            onChange={onContentChanged}
            disabled={getPostQueryLoading}
          />
        </div>
      </form>
      <button
        type="button"
        onClick={onSavePostClicked}
        disabled={getPostQueryLoading}
      >
        Save Post
      </button>
    </section>
  );
};

export default EditPostForm;
