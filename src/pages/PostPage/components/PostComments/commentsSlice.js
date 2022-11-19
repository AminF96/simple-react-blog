import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
} from "@reduxjs/toolkit";
import { HttpCilent } from "../../../../api/HttpClient";
import { DataStatusTypes } from "../../../PostsPage/postsSlice";

// Initializing ----------------------------------------------------------------------------------
const client = new HttpCilent();

const commentsAdapter = createEntityAdapter({
  sortComparer: (a, b) => b.date - a.date,
});

const initialState = commentsAdapter.getInitialState({
  status: DataStatusTypes.Idle,
});

// Thunk Functions --------------------------------------------------------------------------------
export const fetchComments = createAsyncThunk(
  "comments/fetchComments",
  async () => {
    return await client.get("comments");
  }
);

export const saveNewComment = createAsyncThunk(
  "comments/saveNewComment",
  async (commentData) => {
    return await client.post("comments", commentData);
  }
);

// Slice ------------------------------------------------------------------------------------------
const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchComments.fulfilled]: (state, action) => {
      state.status = DataStatusTypes.Success;
      commentsAdapter.upsertMany(state, action.payload);
    },
    [fetchComments.pending]: (state) => {
      state.status = DataStatusTypes.Pending;
    },
    [fetchComments.rejected]: (state) => {
      state.status = DataStatusTypes.Error;
    },
    [saveNewComment.fulfilled]: commentsAdapter.addOne,
  },
});

export default commentsSlice.reducer;

// Selectors
export const commentsStatusSelector = (state) => state.comments.status;

export const { selectAll: selectCommentsArray, selectById: selectCommentById } =
  commentsAdapter.getSelectors((state) => state.comments);

export const selectCommentsIdsByPost = createSelector(
  selectCommentsArray,
  (state, postId) => postId,
  (commentsArr, postId) =>
    commentsArr
      .filter((comment) => comment.post === postId)
      .map((comment) => comment.id)
);
