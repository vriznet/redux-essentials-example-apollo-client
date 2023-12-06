import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postAdded } from '../../redux/module/postsSlice';
import { selectUsers } from '../../redux/module/usersSlice';

const AddPostForm = () => {
  const users = useSelector(selectUsers);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [userId, setUserId] = useState('');

  const useAddNewPostMutation = () => {
    const addNewPost = (params: {
      title: string;
      content: string;
      userId: string;
    }) => {
      console.log('addNewPost: ', params);
    };
    return [addNewPost];
  };
  const [addNewPost] = useAddNewPostMutation();

  const dispatch = useDispatch();

  const onTitleChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  const onContentChanged = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };
  const onAuthorChanged = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(e.target.value);
  };
  const onSavePostClicked = () => {
    try {
      if (canSave) {
        dispatch(
          postAdded({
            title,
            content,
            userId,
          })
        );
        addNewPost({ title, content, userId });
        setTitle('');
        setContent('');
      }
    } catch (error) {
      console.error('Failed to save the post: ', error);
    }
  };

  const canSave = Boolean(title) && Boolean(content) && Boolean(userId);

  const usersOptions = users.map((user) => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ));

  return (
    <section
      style={{ border: '1px solid #333', margin: '16px 0px', padding: '16px' }}
    >
      <h2 style={{ marginBottom: '8px' }}>Add a New Post</h2>
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
          <label htmlFor="postAuthor" style={{ display: 'flex' }}>
            Author:
          </label>
          <select id="postAuthor" value={userId} onChange={onAuthorChanged}>
            <option value=""></option>
            {usersOptions}
          </select>
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
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <button type="button" onClick={onSavePostClicked} disabled={!canSave}>
            Save Post
          </button>
        </div>
      </form>
    </section>
  );
};

export default AddPostForm;
