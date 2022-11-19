import moment from "moment";

export default function PostHeader({ postTitle, postDate }) {
  return (
    <div className="post-header text-center">
      <h2 className="h2">{postTitle}</h2>
      <span>{moment(postDate).toLocaleString().substring(4, 16)}</span>
    </div>
  );
}
