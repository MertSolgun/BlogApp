import React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useBlogCalls from "../../hooks/useBlogCalls";
import { toastErrorNotify, toastSuccessNotify } from "../../helper/ToastNotify";
import { useEffect, useState } from "react";

const NewBlogForm = ({ blogDetails, handleClose }) => {
  const { category } = useSelector((state) => state.blog);

  const navigate = useNavigate();

  const { editBlogs, newPostBlogs } = useBlogCalls();

  const [NewBlog, setNewBlog] = useState({
    title: "",
    content: "",
    image: "",
    categoryId: "",
    isPublish: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewBlog({ ...NewBlog, [name]: value });
  };

  const isFormValid = () => {
    if (
      !NewBlog.title ||
      !NewBlog.content ||
      !NewBlog.image ||
      !NewBlog.categoryId
    ) {
      toastErrorNotify("Please fill in all required fields.");
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isFormValid()) {
      return;
    }

    if (NewBlog._id) {
      editBlogs(NewBlog);
      handleClose();
    } else {
      newPostBlogs(NewBlog);
      navigate("/");
    }
    toastSuccessNotify(`${NewBlog._id ? "Edit successful" : "Post Publish"}`);
  };

  useEffect(() => {
    //!
    if (blogDetails) {
      setNewBlog(blogDetails);
    }
  }, [blogDetails]);

  return (
    <>
      <Box component="form" onSubmit={handleSubmit} noValidate>
        <TextField
          margin="normal"
          required
          fullWidth
          id="title"
          label="Title"
          value={NewBlog.title}
          onChange={handleChange}
          name="title"
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="image"
          value={NewBlog.image}
          label="İmage Url"
          onChange={handleChange}
          type="url"
          id="image"
        />
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel id="demo-simple-select-label">Category</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="categoryId"
            label="Category"
            required
            value={NewBlog.categoryId?._id || NewBlog?.categoryId}
            name="categoryId"
            onChange={handleChange}
          >
            {category.map((item) => (
              <MenuItem value={item._id}>{item.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Status</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Status"
            name="isPublish"
            required
            value={NewBlog.isPublish}
            onChange={handleChange}
          >
            <MenuItem value={false}>Draft</MenuItem>
            <MenuItem value={true}>Published</MenuItem>
          </Select>
        </FormControl>
        <TextField
          margin="normal"
          required
          fullWidth
          name="content"
          onChange={handleChange}
          label="Content"
          value={NewBlog.content}
          type="text"
          id="content"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Submit
        </Button>
      </Box>
    </>
  );
};

export default NewBlogForm;
