import { useState, useLayoutEffect, lazy, Suspense } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import paths from "./router/paths";
import { DataStatusTypes } from "./pages/PostsPage/postsSlice";
import { postsStatusSelector, fetchPosts } from "./pages/PostsPage/postsSlice";
import {
  authorsStatusSelector,
  fetchAuthors,
} from "./pages/AuthorsPage/authorsSlice";
import {
  commentsStatusSelector,
  fetchComments,
} from "./pages/PostPage/components/PostComments/commentsSlice";
import Layout from "./components/Layout";
import Loader from "./components/Loader";

const PostsPage = lazy(() => import("./pages/PostsPage"));
const AuthorsPage = lazy(() => import("./pages/AuthorsPage"));
const PostPage = lazy(() => import("./pages/PostPage"));
const AuthorPage = lazy(() => import("./pages/AuthorPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));

export default function App() {
  const status = useHanleDataStatus();

  return (
    <>
      <Routes>
        <Route path="/" element={<LayoutWrapper />}>
          <Route
            path={paths.HomePage}
            element={<PostsPage dataStatus={status} />}
          />
          <Route
            path={paths.PostPage}
            element={<PostPage dataStatus={status} />}
          />
          <Route
            path={paths.AuthorsPage}
            element={<AuthorsPage dataStatus={status} />}
          />
          <Route
            path={paths.AuthorPage}
            element={<AuthorPage dataStatus={status} />}
          />
          <Route path={paths.NotFoundPage} element={<NotFoundPage />} />
          <Route
            path="*"
            element={<Navigate to={paths.NotFoundPage} replace />}
          />
        </Route>
      </Routes>
    </>
  );
}

function LayoutWrapper() {
  return (
    <Layout>
      <Suspense fallback={<Loader />}>
        <Outlet />
      </Suspense>
    </Layout>
  );
}

function useHanleDataStatus() {
  const [status, setStatus] = useState(DataStatusTypes.Pending);

  const dispatch = useDispatch();
  const postsStatus = useSelector(postsStatusSelector);
  const authorsStatus = useSelector(authorsStatusSelector);
  const commentsStatus = useSelector(commentsStatusSelector);

  useLayoutEffect(() => {
    if (
      postsStatus === DataStatusTypes.Idle ||
      authorsStatus === DataStatusTypes.Idle ||
      commentsStatus === DataStatusTypes.Idle
    ) {
      authorsStatus === DataStatusTypes.Idle && dispatch(fetchAuthors());
      postsStatus === DataStatusTypes.Idle && dispatch(fetchPosts());
      commentsStatus === DataStatusTypes.Idle && dispatch(fetchComments());
    } else if (
      postsStatus === DataStatusTypes.Error ||
      authorsStatus === DataStatusTypes.Error ||
      commentsStatus === DataStatusTypes.Error
    ) {
      setStatus(DataStatusTypes.Error);
    } else if (
      postsStatus === DataStatusTypes.Pending ||
      authorsStatus === DataStatusTypes.Pending ||
      commentsStatus === DataStatusTypes.Pending
    ) {
      setStatus(DataStatusTypes.Pending);
    } else if (
      postsStatus === DataStatusTypes.Success &&
      authorsStatus === DataStatusTypes.Success &&
      commentsStatus === DataStatusTypes.Success
    ) {
      setStatus(DataStatusTypes.Success);
    }
  }, [authorsStatus, commentsStatus, dispatch, postsStatus]);

  return status;
}
