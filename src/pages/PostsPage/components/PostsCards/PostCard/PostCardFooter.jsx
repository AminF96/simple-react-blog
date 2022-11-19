import { useState } from "react";
import PostReaction from "../../PostReaction";

export default function PostCardFooter({
  commentsCount,
  postReactions,
  postId,
}) {
  const [reaction, setReaction] = useState(null);

  return (
    <div className="post-card-footer">
      <ul>
        <li className="post-card-data">
          <span className="pe-2">{postReactions.like}</span>
          <PostReaction
            reactionType="like"
            postId={postId}
            isActive={reaction === "like"}
            clickHandler={() => setReaction("like")}
          />
        </li>
        <li className="post-card-data">
          <span className="pe-2">{commentsCount}</span>
          <i className="fa fa-comments-o"></i>
        </li>
        <li className="post-card-data">
          <span className="pe-2">{postReactions.dislike}</span>
          <PostReaction
            reactionType="dislike"
            postId={postId}
            isActive={reaction === "dislike"}
            clickHandler={() => setReaction("dislike")}
          />
        </li>
      </ul>
    </div>
  );
}
