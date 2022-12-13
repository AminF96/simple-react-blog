import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectAuthorById } from "../../../../AuthorsPage/authorsSlice";
import { selectCommentsIdsByPost } from "../../../../PostPage/components/PostComments/commentsSlice";
import { selectPostById } from "../../../postsSlice";
import PostCardBody from "./PostCardBody";
import PostCardFooter from "./PostCardFooter";
import "./style.scss";

export default function PostCard({ postId }) {
  const post = useSelector((state) => selectPostById(state, postId));
  const author = useSelector((state) => selectAuthorById(state, post.author));
  const comments = useSelector((state) =>
    selectCommentsIdsByPost(state, postId)
  );

  return (
    <div className="col-12 col-md-6 col-lg-4">
      <div className="card border-0 shadow card-custom mb-4">
        <Link to={`/posts/${postId}`}>
          <img
            src={post.img || "/blogPost.jpg"}
            className="card-img-top rounded-0 align-self-center"
            alt="img"
          />
          <PostCardBody author={author} post={post} />
        </Link>
        <PostCardFooter
          commentsCount={comments.length}
          postReactions={post.reactions}
          postId={postId}
        />
      </div>
    </div>
  );
}
