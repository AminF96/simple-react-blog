import { shallowEqual, useSelector } from "react-redux";
import { DataStatusTypes } from "../PostsPage/postsSlice";
import { selectAuthorsIds } from "./authorsSlice";
import Layout from "../../components/Layout";
import Loader from "../../components/Loader";
import Author from "../AuthorPage/Author";
import Error from "../../components/Error";

export default function AuthorsPage({ dataStatus }) {
  const authorsIds = useSelector(selectAuthorsIds, shallowEqual);

  const authorsEl = authorsIds.map((authorId) => (
    <div className="col-12 col-md-6 col-lg-4 text-center" key={authorId}>
      <Author authorId={authorId} />
    </div>
  ));

  let result;

  switch (dataStatus) {
    case DataStatusTypes.Error:
      result = <Error />;
      console.log("error");
      break;
    case DataStatusTypes.Success:
      result = <div className="row py-3">{authorsEl}</div>;
      break;
    case DataStatusTypes.Pending:
      result = <Loader />;
      break;
    default:
      result = null;
      break;
  }
  return <Layout>{result}</Layout>;
}
