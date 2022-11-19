import { useState } from "react";
import { useDispatch } from "react-redux";
import { saveNewComment } from "./commentsSlice";

export default function AddComment({ postId }) {
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();

  const addCommentHandler = async (e) => {
    e.preventDefault();

    const { type } = await dispatch(
      saveNewComment({ body: comment, post: postId })
    );

    type === "comments/saveNewComment/fulfilled" && setComment("");
  };

  return (
    <form onSubmit={addCommentHandler}>
      <textarea
        id="comment-input"
        placeholder="Add a comment..."
        className="add-comment-input border-0 mt-3"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      ></textarea>
      <div className="text-end pt-2">
        <button type="submit" className="add-comment-btn" disabled={!comment}>
          COMMENT
        </button>
      </div>
    </form>
  );
}
