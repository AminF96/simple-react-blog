import { shallowEqual, useSelector } from "react-redux";
import { selectCommentsIdsByPost } from "./commentsSlice";
import CommentsHeader from "./CommentsHeader";
import AddComment from "./AddComment";
import CommentsBody from "./CommentsBody";
import "./style.css";

export default function PostComments({ postId }) {
  const postCommentsIds = useSelector(
    (state) => selectCommentsIdsByPost(state, postId),
    shallowEqual
  );

  return (
    <div className="post-comments py-4 mt-5 mx-auto post-width">
      <CommentsHeader commentsCount={postCommentsIds.length} />
      <AddComment postId={postId} />
      <CommentsBody commentsIds={postCommentsIds} />
    </div>
  );
}
