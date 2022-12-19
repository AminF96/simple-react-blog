import SearchInput from "./SearchInput";
import { useDispatch } from "react-redux";
import { NavLink, useSearchParams } from "react-router-dom";
import { searchTitleChanged } from "../../../pages/PostsPage/postsSlice";
import blogSearchParams from "../../../router/blogSearchParams";
import paths from "../../../router/paths";
import "./style.scss";

export default function Header() {
  const linkClass = "nav-link nav-link-custom text-light ms-1";
  const activeLinkClass = linkClass + " active-link";
  const dispatch = useDispatch();
  let [searchParams] = useSearchParams();

  const showAllPosts = () => {
    searchParams.delete(blogSearchParams.PostTitle);
    dispatch(searchTitleChanged(null));
  };

  return (
    <header>
      <nav className="navbar navbar-custom navbar-expand-md navbar-dark">
        <div className="container">
          <NavLink
            className="navbar-brand navbar-brand-custom h2"
            to={paths.HomePage}
            onClick={showAllPosts}
          >
            Blog
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav ms-md-5 ps-md-3">
              <NavLink
                className={({ isActive }) =>
                  isActive ? activeLinkClass : linkClass
                }
                to={paths.HomePage}
                end
                onClick={showAllPosts}
              >
                Posts
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  isActive ? activeLinkClass : linkClass
                }
                to={paths.AuthorsPage}
              >
                Authors
              </NavLink>
            </div>
            <SearchInput />
          </div>
        </div>
      </nav>
    </header>
  );
}
