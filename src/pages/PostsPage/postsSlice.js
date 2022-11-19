import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
} from "@reduxjs/toolkit";
import { HttpCilent } from "../../api/HttpClient";

// Initializing ----------------------------------------------------------------------------------
export const DataStatusTypes = {
  Idle: "idle",
  Success: "success",
  Pending: "pending",
  Error: "error",
};

const client = new HttpCilent();

const postsAdapter = createEntityAdapter({
  sortComparer: (a, b) => b.date - a.date,
});

const initialState = postsAdapter.getInitialState({
  status: DataStatusTypes.Idle,
});

// Thunk Functions --------------------------------------------------------------------------------
export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  return await client.get("posts");
});

export const increasePostReaction = createAsyncThunk(
  "posts/increaseReaction",
  async ({ postId, reactionType }) => {
    const result = await client.post(
      `/posts/${postId}/reaction/${reactionType}`
    );

    return { result, postId, reactionType };
  }
);

export const saveNewPost = createAsyncThunk(
  "posts/saveNewPost",
  async (postData) => {
    return await client.post("posts", postData);
  }
);

// Slice ------------------------------------------------------------------------------------------
const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchPosts.fulfilled]: (state, action) => {
      state.status = DataStatusTypes.Success;
      postsAdapter.upsertMany(state, action.payload);
    },
    [fetchPosts.pending]: (state) => {
      state.status = DataStatusTypes.Pending;
    },
    [fetchPosts.rejected]: (state) => {
      state.status = DataStatusTypes.Error;
    },
    [increasePostReaction.fulfilled]: (state, action) => {
      const { result, postId, reactionType } = action.payload;
      if (result.success) {
        state.entities[postId].reactions[reactionType] += 1;
      }
    },
    [saveNewPost.fulfilled]: postsAdapter.addOne,
  },
});

export default postsSlice.reducer;

// Selectors
export const postsStatusSelector = (state) => state.posts.status;

export const {
  selectIds: selectPostsIds,
  selectById: selectPostById,
  selectAll: selectPostsArray,
} = postsAdapter.getSelectors((state) => state.posts);

export const selectPostsByAuthor = createSelector(
  selectPostsArray,
  (state, authorId) => authorId,
  (posts, authorId) => posts.filter((post) => post.author === authorId)
);

export const selectPostsIdsByTitle = createSelector(
  selectPostsArray,
  (state, postTitle) => postTitle,
  (posts, postTitle) => {
    const result = postTitle
      ? posts.filter((post) => post.title.includes(postTitle))
      : posts;
    return result.map((post) => post.id);
  }
);
