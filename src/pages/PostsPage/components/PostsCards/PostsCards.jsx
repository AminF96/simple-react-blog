import { shallowEqual, useSelector } from "react-redux";
import { selectPostsIdsByTitle } from "../../postsSlice";
import PostCard from "./PostCard/PostCard";
import SearchNotFound from "./SearchNotFound";

export default function PostsCards({ searchTitle }) {
  const postsIds = useSelector(
    (state) => selectPostsIdsByTitle(state, searchTitle),
    shallowEqual
  );

  const cardsEl = postsIds.map((postId) => (
    <PostCard key={postId} postId={postId} />
  ));

  return (
    <div className="row py-3">
      {searchTitle && (
        <div
          className="mb-4"
          style={{ color: "#f1f1f1", fontSize: "22px" }}
        >
          {`Search Results For "${searchTitle}" :`}
        </div>
      )}
      {postsIds.length > 0 ? (
        cardsEl
      ) : (
        <SearchNotFound searchTitle={searchTitle} />
      )}
    </div>
  );
}
