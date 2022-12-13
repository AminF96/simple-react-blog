import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { selectAuthorById } from "../AuthorsPage/authorsSlice";
import { selectPostsByAuthor } from "../PostsPage/postsSlice";
import "./style.scss";

export default function Author({ authorId }) {
  const author = useSelector((state) => selectAuthorById(state, authorId));
  const authorPosts = useSelector((state) =>
    selectPostsByAuthor(state, authorId)
  );

  return (
    <NavLink to={`${authorId}`} className="autor-wrapper">
      <div className="mb-5">
        <img
          src={author.img}
          alt="author"
          className="author-img img-fluid mx-auto rounded-circle"
        />
        <div className="author-name mt-2">{`${author.firstName} ${author.lastName}`}</div>
        <div className="author-posts-count">{`${authorPosts.length} Posts`}</div>
      </div>
    </NavLink>
  );
}
