import { useParams } from 'react-router-dom';
import { posts } from '../data/posts';
import { Link } from 'react-router-dom';
import { users } from '../data/users';

const UserPage = () => {
  const { userId } = useParams<{ userId: string }>();

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
