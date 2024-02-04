import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  blogs: [],
  blogDetails: [],
  category: [],
  comments: [],
  Myblog: [],
  pagination: [],
  loading: false,
};

export const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    fetchStart: (state) => {
      state.loading = true;
    },
    fetchFail: (state) => {
      state.loading = false;
    },
    getBlogSuccessfully: (state, { payload }) => {
      state.blogs = payload.blogData;
      state.loading = false;
      state.pagination = payload.pagination;
    },
    blogDetailsAction: (state, { payload }) => {
      state.blogDetails = payload;
      state.loading = false;
    },
    CategoryAction: (state, { payload }) => {
      state.category = payload;
      state.loading = false;
    },
    postCommentAction: (state, { payload }) => {
      state.comments = payload;
      state.loading = false;
    },
    MyBlogsAction: (state, { payload }) => {
      state.Myblog = payload;
      state.loading = false;
    },
  },
});

export const {
  getBlogSuccessfully,
  fetchFail,
  MyBlogsAction,
  fetchStart,
  postCommentAction,
  blogDetailsAction,
  CategoryAction,
} = blogSlice.actions;

export default blogSlice.reducer;
