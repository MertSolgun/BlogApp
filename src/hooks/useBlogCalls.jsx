import useAxios from "./useAxios";
import { useDispatch, useSelector } from "react-redux";
import {
  CategoryAction,
  MyBlogsAction,
  blogDetailsAction,
  fetchFail,
  fetchStart,
  getBlogSuccessfully,
  postCommentAction,
  setLoadingFalse,
} from "../features/blogSlice";
import { useParams } from "react-router-dom";
import { toastErrorNotify, toastSuccessNotify } from "../helper/ToastNotify";

const useBlogCalls = () => {
  const { _id } = useSelector((state) => state.auth);

  const { axiosPublic, axiosWithToken } = useAxios();

  const dispatch = useDispatch();

  const getBlogs = async (url) => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosPublic.get(url);
      const blogData = data.data;
      const pagination = data.details;
      dispatch(getBlogSuccessfully({ blogData, pagination }));
    } catch (error) {
      dispatch(fetchFail());
      console.log(error);
    }
  };

  const { id } = useParams();

  const getBlogDetail = async (blogId) => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosPublic(`/blogs/${id || blogId}`);
      dispatch(blogDetailsAction(data.data));
    } catch (error) {
      dispatch(fetchFail());
      console.log(error);
    }
  };

  const getCategory = async () => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosPublic("categories");
      dispatch(CategoryAction(data.data));
    } catch (error) {
      dispatch(fetchFail());
    }
  };

  const newPostBlogs = async (newblog) => {
    try {
      await axiosWithToken.post("blogs/", newblog);
      getBlogs("blogs");
    } catch (error) {
      console.log(error);
    }
  };

  const commentPost = async (comment) => {
    try {
      const { data } = await axiosWithToken.post("comments/", comment);
      dispatch(postCommentAction(data));
      toastSuccessNotify("Comment sent.");
    } catch (error) {
      console.log(error);
      toastErrorNotify("Comment Failed");
    }
  };

  const Myblogs = async () => {
    try {
      const { data } = await axiosWithToken.get(`blogs?author=${_id}`);
      dispatch(MyBlogsAction(data.data));
    } catch (error) {
      console.log(error);
    }
  };

  const editBlogs = async (editData) => {
    try {
      await axiosWithToken.put(`blogs/${id}`, editData);
      getBlogDetail();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteBlogs = async () => {
    try {
      await axiosWithToken.delete(`blogs/${id}`);
      Myblogs();
    } catch (error) {
      console.log(error);
    }
  };

  const likeBlogs = async (blogId) => {
    try {
      await axiosWithToken.post(`blogs/${blogId}/postLike`);
      await getBlogs("blogs");
      await getBlogDetail(blogId);
    } catch (error) {
      console.log(error);
    }
  };

  return {
    likeBlogs,
    deleteBlogs,
    editBlogs,
    Myblogs,
    getBlogs,
    getBlogDetail,
    getCategory,
    newPostBlogs,
    commentPost,
  };
};

export default useBlogCalls;
