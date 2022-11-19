import { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import useFormInputs from "../../../../hooks/useFormInputs";
import { selectAuthorsArray } from "../../../AuthorsPage/authorsSlice";
import { saveNewPost } from "../../postsSlice";

export default function AddPostForm() {
  const imgRef = useRef();
  const { inputs, changeHandler, setAllInputsEmpty } = useFormInputs({
    postTitle: "",
    postAuthor: "",
    postBody: "",
    postImage: "",
  });

  const dispatch = useDispatch();
  const authors = useSelector(selectAuthorsArray);

  const authorsOptions = authors.map((author) => (
    <option
      key={author.id}
      value={author.id}
    >{`${author.firstName} ${author.lastName}`}</option>
  ));

  const imgFileHandler = (event) => {
    event.preventDefault();
    const e = {
      target: {
        id: "postImage",
        value: URL.createObjectURL(event.target.files[0]),
      },
    };
    changeHandler(e);
  };

  const isAddPostBtnEnable = () =>
    [
      inputs.postTitle,
      inputs.postAuthor,
      inputs.postBody,
      inputs.postImage,
    ].every(Boolean);

  const addPostHandler = async (e) => {
    e.preventDefault();
    const { postTitle, postBody, postAuthor, postImage } = inputs;
    const { type } = await dispatch(
      saveNewPost({
        title: postTitle,
        body: postBody,
        author: postAuthor,
        img: postImage,
      })
    );

    type === "posts/saveNewPost/rejected" &&
      toast.error(
        "we could'nt add your post! please check your connection and try again later."
      );

    if (type === "posts/saveNewPost/fulfilled") {
      toast.success("Your Post added successfully.");
      setAllInputsEmpty();
      imgRef.current.value = "";
    }
  };

  return (
    <form onSubmit={addPostHandler}>
      <div className="mb-4">
        <label htmlFor="postTitle" className="form-label">
          Post Title
        </label>
        <input
          type="text"
          className="form-control form-control-sm rounded-0"
          id="postTitle"
          value={inputs.postTitle}
          onChange={changeHandler}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="postAuthor" className="form-label">
          Post Author
        </label>
        <select
          id="postAuthor"
          className="form-select form-select-sm rounded-0"
          aria-label=".form-select-sm example"
          value={inputs.postAuthor}
          onChange={changeHandler}
        >
          <option defaultValue>Select an author</option>
          {authorsOptions}
        </select>
      </div>
      <div className="mb-4">
        <label htmlFor="postBody" className="form-label">
          Post Body
        </label>
        <textarea
          className="form-control rounded-0"
          id="postBody"
          rows="3"
          value={inputs.postBody}
          onChange={changeHandler}
        ></textarea>
      </div>
      <div className="mb-4">
        <label htmlFor="postImage" className="select-post-img form-label">
          <i className="fa fa-picture-o"></i> Select Post Image
        </label>
        <input
          type="file"
          accept="image/*"
          id="postImage"
          onChange={imgFileHandler}
          ref={imgRef}
        />
      </div>
      <div className="text-center">
        <button
          type="submit"
          className="btn add-post-btn d-block w-100"
          disabled={!isAddPostBtnEnable()}
          data-bs-dismiss="modal"
          aria-label="Close"
        >
          Add Post
        </button>
      </div>
    </form>
  );
}
