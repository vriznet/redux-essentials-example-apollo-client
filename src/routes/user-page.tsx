import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUserById } from '../redux/module/usersSlice';
import { RootState } from '../redux/module';
import { createSelector } from '@reduxjs/toolkit';
import { useMemo } from 'react';

const UserPage = () => {
  const { userId } = useParams<{ userId: string }>();
  if (!userId)
    return (
      <div id="error-page">
        <h1>Oops!</h1>
        <p>Sorry, an error has occured.</p>
        <p>
          <i>Error: User ID not found.</i>
        </p>
      </div>
    );
  const user = useSelector((state: RootState) => selectUserById(state, userId));
  const selectPostsForUser = useMemo(() => {
    return createSelector(
      [
        (state: RootState) => state.posts.entities,
        (state: RootState, userId) => userId,
      ],
      (data, userId) => {
        if (data) {
          return Object.values(data).filter((post) => post?.userId === userId);
        }
      }
    );
  }, []);
  const postsForUser = useSelector((state: RootState) =>
    selectPostsForUser(state, userId)
  );

  const postTitles =
    postsForUser &&
    postsForUser.length > 0 &&
    postsForUser.map((post) => (
      <li key={post?.id}>
        <Link to={`/post/${post?.id}`}>{post?.title}</Link>
      </li>
    ));

  return (
    <section>
      <h2>{user?.name}</h2>
      <ul>{postTitles}</ul>
    </section>
  );
};

export default UserPage;
