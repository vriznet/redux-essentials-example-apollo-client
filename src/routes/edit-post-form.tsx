import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import Spinner from '../components/Spinner';
import { useDispatch, useSelector } from 'react-redux';
import { selectPostById, updatePost } from '../redux/module/postsSlice';
import { RootState } from '../redux/module';
import { AppDispatch } from '../redux/store';

const EditPostForm = () => {
  const { postId } = useParams<{ postId: string }>();

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
  const postsStatus = useSelector((state: RootState) => state.posts.status);
  const post = useSelector((state: RootState) => selectPostById(state, postId));

  const [title, setTitle] = useState(post?.title || '');
  const [content, setContent] = useState(post?.content || '');

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const onTitleChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  const onContentChanged = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const onSavePostClicked = () => {
    try {
      if (title && content) {
        dispatch(updatePost({ id: postId, title, content }));
        navigate(`/post/${postId}`);
      } else {
        console.error('Title and content are required.');
      }
    } catch (error) {
      console.error('Failed to save the post: ', error);
    }
  };

  if (postsStatus === 'loading') {
    return <Spinner text="Loading..." />;
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
          />
        </div>
      </form>
      <button type="button" onClick={onSavePostClicked}>
        Save Post
      </button>
    </section>
  );
};

export default EditPostForm;
