import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import { HttpCilent } from "../../api/HttpClient";
import { DataStatusTypes } from "../PostsPage/postsSlice";

// Initializing ----------------------------------------------------------------------------------
const client = new HttpCilent();

const authorsAdapter = createEntityAdapter();

const initialState = authorsAdapter.getInitialState({
  status: DataStatusTypes.Idle,
});

// Thunk Functions --------------------------------------------------------------------------------
export const fetchAuthors = createAsyncThunk(
  "authors/fetchAuthors",
  async () => {
    return await client.get("authors");
  }
);

// Slice ------------------------------------------------------------------------------------------
const authorsSlice = createSlice({
  name: "authors",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchAuthors.fulfilled]: (state, action) => {
      state.status = DataStatusTypes.Success;
      authorsAdapter.upsertMany(state, action.payload);
    },
    [fetchAuthors.pending]: (state) => {
      state.status = DataStatusTypes.Pending;
    },
    [fetchAuthors.rejected]: (state) => {
      state.status = DataStatusTypes.Error;
    },
  },
});

export default authorsSlice.reducer;

// Selectors
export const authorsStatusSelector = (state) => state.authors.status;

export const {
  selectById: selectAuthorById,
  selectAll: selectAuthorsArray,
  selectIds: selectAuthorsIds,
} = authorsAdapter.getSelectors((state) => state.authors);
