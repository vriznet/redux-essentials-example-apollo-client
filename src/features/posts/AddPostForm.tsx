import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectUsers } from '../../redux/module/usersSlice';
import { addNewPost } from '../../redux/module/postsSlice';
import { AppDispatch } from '../../redux/store';
import { unwrapResult } from '@reduxjs/toolkit';

const AddPostForm = () => {
  const users = useSelector(selectUsers);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [userId, setUserId] = useState('');
  const [addRequestStatus, setAddRequestStatus] = useState<'idle' | 'pending'>(
    'idle'
  );

  const dispatch = useDispatch<AppDispatch>();

  const canSave =
    [title, content, userId].every(Boolean) && addRequestStatus === 'idle';

  const onTitleChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  const onContentChanged = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };
  const onAuthorChanged = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(e.target.value);
  };
  const onSavePostClicked = async () => {
    if (canSave) {
      try {
        setAddRequestStatus('pending');
        const resultAction = await dispatch(
          addNewPost({ title, content, userId })
        );
        unwrapResult(resultAction);
        setTitle('');
        setContent('');
        setUserId('');
      } catch (error) {
        console.error('Failed to save the post: ', error);
      } finally {
        setAddRequestStatus('idle');
      }
    }
  };

  const usersOptions = users.map((user) => (
    <option key={`user-${user.id}`} value={user.id}>
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
