export default function CommentsHeader({ commentsCount }) {
  return (
    <div className="comments-header">
      <h6>{`${commentsCount} Comments`}</h6>
    </div>
  );
}
