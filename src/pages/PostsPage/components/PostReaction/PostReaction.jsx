import { useDispatch } from "react-redux";
import { increasePostReaction } from "../../postsSlice";
import "./style.scss";

export default function PostReaction({
  reactionType,
  postId,
  isActive,
  clickHandler,
}) {
  const activeClass = reactionType + "-post";
  const dispatch = useDispatch();

  const postReactionHandler = async () => {
    await dispatch(increasePostReaction({ postId, reactionType }));
    clickHandler();
  };

  return (
    <i
      onClick={() => {
        postReactionHandler("like");
      }}
      className={`fa ${reactionType === "like" && "fa-thumbs-up"} ${
        reactionType === "dislike" && "fa-thumbs-down"
      } post-reaction ${isActive && activeClass}`}
    ></i>
  );
}
