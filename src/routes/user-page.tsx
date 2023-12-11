import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUserById } from '../redux/module/usersSlice';
import { RootState } from '../redux/module';
import { selectPostsByUser } from '../redux/module/postsSlice';

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
  const postsForUser = useSelector((state: RootState) =>
    selectPostsByUser(state, userId)
  );
  const postTitles = postsForUser.map((post) => (
    <li key={post.id}>
      <Link to={`/post/${post.id}`}>{post.title}</Link>
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
