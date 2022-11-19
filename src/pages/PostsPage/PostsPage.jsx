import { useState, useLayoutEffect, useEffect } from "react";
import { useSearchParams, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { DataStatusTypes } from "./postsSlice";
import blogSearchParams from "../../router/blogSearchParams";
import Layout from "../../components/Layout";
import Loader from "../../components/Loader";
import AddPost from "./components/AddPost";
import PostsCards from "./components/PostsCards/PostsCards";
import Error from "../../components/Error";

export default function PostsPage({ dataStatus }) {
  const [searchTitle, setSearchTitle] = useState(null);
  let [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();

  useLayoutEffect(() => {
    if (location.state) {
      setSearchTitle(location.state.title);
    } else {
      setSearchTitle(searchParams.get(blogSearchParams.PostTitle));
    }
  }, [location.state, searchParams]);

  useEffect(() => {
    searchTitle &&
      setSearchParams({ [blogSearchParams.PostTitle]: searchTitle });
  }, [searchTitle, setSearchParams]);

  let result;

  switch (dataStatus) {
    case DataStatusTypes.Error:
      result = <Error />;
      console.log("error");
      break;
    case DataStatusTypes.Success:
      result = (
        <>
          <AddPost />
          <PostsCards searchTitle={searchTitle} />
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

  return (
    <Layout>
      {result}
      <ToastContainer
        position="bottom-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover={false}
        theme="dark"
      />
    </Layout>
  );
}
