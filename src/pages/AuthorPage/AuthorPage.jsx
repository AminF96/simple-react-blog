import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { DataStatusTypes } from "../PostsPage/postsSlice";
import { selectPostsByAuthor } from "../PostsPage/postsSlice";
import Loader from "../../components/Loader";
import Author from "./Author";
import PostCard from "../PostsPage/components/PostsCards/PostCard";
import Error from "../../components/Error";

export default function AuthorPage({ dataStatus }) {
  const { authorId } = useParams();
  const authorPosts = useSelector((state) =>
    selectPostsByAuthor(state, authorId)
  );

  const postsCardsEl = authorPosts.map((post) => (
    <PostCard key={post.id} postId={post.id} />
  ));

  let result;

  switch (dataStatus) {
    case DataStatusTypes.Error:
      result = <Error />;
      console.log("error");
      break;
    case DataStatusTypes.Success:
      result = (
        <>
          <div className="row py-3">
            <div className="col-12 text-center">
              <Author authorId={authorId} />
            </div>
          </div>
          <div className="row py-2">{postsCardsEl}</div>
        </>
      );
      break;
    case DataStatusTypes.Pending:
      result = <Loader />;
      break;
    default:
      result = null;
      break;
  }
  return result;
}
