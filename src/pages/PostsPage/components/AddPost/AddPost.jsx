import AddPostBtn from "./AddPostBtn";
import AddPostForm from "./AddPostForm";
import "./style.css";

export default function AddPost() {
  return (
    <div className="d-flex justify-content-center mb-5">
      <AddPostBtn />
      <div
        className="modal fade"
        id="addPostModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content custom-modal-content">
            <div className="modal-body">
              <h4 className="mb-5 text-center">Add New Post</h4>
              <AddPostForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
