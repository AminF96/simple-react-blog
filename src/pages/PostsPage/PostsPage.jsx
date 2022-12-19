import { useLayoutEffect, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  DataStatusTypes,
  searchTitleChanged,
  postsSearchTitleSelector,
} from "./postsSlice";
import blogSearchParams from "../../router/blogSearchParams";
import Loader from "../../components/Loader";
import AddPost from "./components/AddPost";
import PostsCards from "./components/PostsCards/PostsCards";
import Error from "../../components/Error";

export default function PostsPage({ dataStatus }) {
  const searchTitle = useSearchTitle();

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
    <>
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
    </>
  );
}

function useSearchTitle() {
  let [searchParams, setSearchParams] = useSearchParams();
  const searchTitle = useSelector(postsSearchTitleSelector);
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    const searchQuery = searchParams.get(blogSearchParams.PostTitle);
    if (searchQuery) {
      dispatch(searchTitleChanged(searchQuery));
    }
  }, [dispatch, searchParams]);

  useEffect(() => {
    searchTitle &&
      setSearchParams({ [blogSearchParams.PostTitle]: searchTitle });
  }, [searchTitle, setSearchParams]);

  return searchTitle;
}
