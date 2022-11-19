import PostTimeAgo from "./PostTimeAgo";

export default function PostCardBody({ author, post }) {
  return (
    <div className="card-body post-card-body">
      <span className="badge card-author-badge mb-2">{`${author.firstName} ${author.lastName}`}</span>
      <PostTimeAgo postDate={post.date} />
      <h5 className="card-title card-post-title mt-1">{post.title}</h5>
      <p className="card-text card-post-summery">
        {`${post.body.slice(0, 80)} ...`}
      </p>
    </div>
  );
}
