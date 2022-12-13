import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { DataStatusTypes } from "../PostsPage/postsSlice";
import { selectPostById } from "../PostsPage/postsSlice";
import { selectAuthorById } from "../AuthorsPage/authorsSlice";
import Layout from "../../components/Layout";
import Loader from "../../components/Loader";
import PostHeader from "./components/PostHeader";
import PostReaction from "../PostsPage/components/PostReaction";
import PostBody from "./components/PostBody";
import PostAuthorCard from "./components/PostAuthorCard";
import PostComments from "./components/PostComments";
import Error from "../../components/Error";
import "./style.scss";

export default function PostPage({ dataStatus }) {
  const [reaction, setReaction] = useState(null);
  const { postId } = useParams();

  const post = useSelector((state) => selectPostById(state, postId));
  const authorId = post ? post.author : null;
  const postAuthor = useSelector((state) => selectAuthorById(state, authorId));

  let result;

  switch (dataStatus) {
    case DataStatusTypes.Error:
      result = <Error />;
      console.log("error");
      break;
    case DataStatusTypes.Success:
      result = (
        <div className="row pt-1">
          <div className="col-12">
            <article>
              <PostHeader postTitle={post.title} postDate={post.date} />
              <img
                src={post.img}
                className="post-img mx-auto d-block mt-3"
                alt="postImg"
              />
              <div className="post-width mx-auto mt-2 post-reactions">
                <span className="me-1">{post.reactions.like}</span>
                <PostReaction
                  reactionType="like"
                  postId={postId}
                  isActive={reaction === "like"}
                  clickHandler={() => setReaction("like")}
                />
                <span className="ms-3 me-1">{post.reactions.dislike}</span>
                <PostReaction
                  reactionType="dislike"
                  postId={postId}
                  isActive={reaction === "dislike"}
                  clickHandler={() => setReaction("dislike")}
                />
              </div>
              <PostBody postContet={post.body} />
              <PostAuthorCard author={postAuthor} />
              <PostComments postId={postId} />
            </article>
          </div>
        </div>
      );
      break;
    case DataStatusTypes.Pending:
      result = <Loader />;
      break;
    default:
      result = null;
      break;
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return <Layout>{result}</Layout>;
}
