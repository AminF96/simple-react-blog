import { useState, useLayoutEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import blogSearchParams from "../../../router/blogSearchParams";
import paths from "../../../router/paths";

export default function SearchInput() {
  let [searchParams] = useSearchParams();
  const [searchTitle, setSearchTitle] = useState("");
  const navigate = useNavigate();

  const searchHandler = () => {
    navigate(paths.HomePage, { state: { title: searchTitle } });
  };

  useLayoutEffect(() => {
    setSearchTitle(searchParams.get(blogSearchParams.PostTitle));
  }, [searchParams]);

  return (
    <div className="input-group input-group-custom">
      <input
        type="text"
        className="form-control"
        placeholder="search post title"
        aria-label="Input group example"
        aria-describedby="btnGroupAddon"
        value={searchTitle || ""}
        onChange={(e) => setSearchTitle(e.target.value)}
      />
      <button className="input-group-text" onClick={searchHandler}>
        <i className="fa fa-search"></i>
      </button>
    </div>
  );
}
