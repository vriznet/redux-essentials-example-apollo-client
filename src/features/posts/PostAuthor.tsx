interface IPostAuthorProps {
  userId: string;
}

const PostAuthor = (props: IPostAuthorProps) => {
  const author = {
    name: 'Tiago',
  }; // useSelector((state) => selectUserById(state, props.userId))

  return <span>by {author ? author.name : 'Unknown author'}</span>;
};

export default PostAuthor;
