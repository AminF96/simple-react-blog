import { useSelector } from "react-redux";
import moment from "moment";
import { selectCommentById } from "./commentsSlice";

export default function Comment({ commentId }) {
  const comment = useSelector((state) => selectCommentById(state, commentId));
  const commentMoment = moment(comment.date);

  return (
    <div className="comment mb-3">
      <div className="head mb-2">
        <span className="comment-ago" title={commentMoment.date()}>
          {commentMoment.fromNow()}
        </span>
      </div>
      <p>{comment.body}</p>
    </div>
  );
}
