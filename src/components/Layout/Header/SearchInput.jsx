import { useLayoutEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSearchParams, useNavigate } from "react-router-dom";
import { searchTitleChanged } from "../../../pages/PostsPage/postsSlice";
import blogSearchParams from "../../../router/blogSearchParams";
import paths from "../../../router/paths";

export default function SearchInput() {
  const { setSearchTitle, searchInput, searchInputChangeHandler } =
    useSearchTitleHandler();
  const navigate = useNavigate();

  const searchHandler = () => {
    setSearchTitle(searchInput);
    navigate(paths.HomePage);
  };

  return (
    <div className="input-group input-group-custom">
      <input
        type="text"
        className="form-control"
        placeholder="search post title"
        aria-label="Input group example"
        aria-describedby="btnGroupAddon"
        value={searchInput || ""}
        onChange={(e) => searchInputChangeHandler(e.target.value)}
      />
      <button className="input-group-text" onClick={searchHandler}>
        <i className="fa fa-search"></i>
      </button>
    </div>
  );
}

function useSearchTitleHandler() {
  const [searchInput, setSearchInput] = useState("");
  let [searchParams] = useSearchParams();
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    const searchQuery = searchParams.get(blogSearchParams.PostTitle);
    setSearchInput(searchQuery);
    dispatch(searchTitleChanged(searchQuery));
  }, [dispatch, searchParams]);

  const searchInputChangeHandler = (value) => setSearchInput(value);

  const setSearchTitle = (value) => {
    dispatch(searchTitleChanged(value));
  };

  return { setSearchTitle, searchInput, searchInputChangeHandler };
}
