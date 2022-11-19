import { useState, useLayoutEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Routes, Route, Navigate } from "react-router-dom";
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
import PostsPage from "./pages/PostsPage";
import AuthorsPage from "./pages/AuthorsPage";
import PostPage from "./pages/PostPage";
import AuthorPage from "./pages/AuthorPage";
import NotFoundPage from "./pages/NotFoundPage";

export default function App() {
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

  return (
    <Routes>
      <Route
        path={paths.HomePage}
        element={<PostsPage dataStatus={status} />}
      />
      <Route path={paths.PostPage} element={<PostPage dataStatus={status} />} />
      <Route
        path={paths.AuthorsPage}
        element={<AuthorsPage dataStatus={status} />}
      />
      <Route
        path={paths.AuthorPage}
        element={<AuthorPage dataStatus={status} />}
      />
      <Route path={paths.NotFoundPage} element={<NotFoundPage />} />
      <Route path="*" element={<Navigate to={paths.NotFoundPage} replace />} />
    </Routes>
  );
}
