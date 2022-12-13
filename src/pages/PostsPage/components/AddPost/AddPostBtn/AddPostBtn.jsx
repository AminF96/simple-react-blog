import "./style.scss";

export default function AddPostBtn() {
  return (
    <button
      className="icon-btn add-btn"
      data-bs-toggle="modal"
      data-bs-target="#addPostModal"
    >
      <div className="add-icon"></div>
      <div className="btn-txt">Add Post</div>
    </button>
  );
}
