import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectPosts } from '../redux/module/postsSlice';
import { selectUserById } from '../redux/module/usersSlice';
import { RootState } from '../redux/module';

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
  const posts = useSelector(selectPosts);

  const selectPostsForUser = posts.filter((post) => post.userId === userId);

  const postTitles = selectPostsForUser.map((post) => (
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
