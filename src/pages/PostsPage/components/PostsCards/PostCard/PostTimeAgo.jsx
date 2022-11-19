import moment from "moment";

export default function PostTimeAgo({ postDate }) {
  return (
    <span
      className="card-time-ago ms-1"
      title={moment(postDate).toLocaleString()}
    >
      {moment(postDate).fromNow()}
    </span>
  );
}
