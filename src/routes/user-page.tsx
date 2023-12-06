import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUsers } from '../redux/module/usersSlice';
import { selectPosts } from '../redux/module/postsSlice';

const UserPage = () => {
  const { userId } = useParams<{ userId: string }>();

  const users = useSelector(selectUsers);
  const posts = useSelector(selectPosts);

  const user = users.find((user) => user.id === userId);

  const selectPostsForUser = posts.filter((post) => post.userId === userId);

  const postTitles = selectPostsForUser.map((post) => (
    <li key={post.id}>
      <Link to={`/post/${post.id}`}>{post.title}</Link>
    </li>
  ));

  if (!user) {
    return (
      <div id="error-page">
        <h1>Oops!</h1>
        <p>Sorry, an error has occured.</p>
        <p>
          <i>Error: User not found.</i>
        </p>
      </div>
    );
  }

  return (
    <section>
      <h2>{user.name}</h2>
      <ul>{postTitles}</ul>
    </section>
  );
};

export default UserPage;
