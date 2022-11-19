import Comment from "./Comment";

export default function CommentsBody({ commentsIds }) {
  const commentsEl = commentsIds.map((commentId) => (
    <Comment key={commentId} commentId={commentId} />
  ));

  return <div className="comments mt-5">{commentsEl}</div>;
}
