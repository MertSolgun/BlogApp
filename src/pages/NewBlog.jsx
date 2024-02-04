import * as React from "react";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import useBlogCalls from "../hooks/useBlogCalls";
import { useEffect } from "react";
import { toastSuccessNotify } from "../helper/ToastNotify";
import { Outlet, useNavigate } from "react-router-dom";
import NewBlogForm from "../components/blog/NewBlogForm";

export default function NewBlog() {
  const { getCategory, editBlogs, newPostBlogs } = useBlogCalls();

  useEffect(() => {
    getCategory();
  }, []);

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 19,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <AssignmentOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          New Blog
        </Typography>
        <NewBlogForm blogDetails={false} />
      </Box>
    </Container>
  );
}

// slgnahmet@gmail.com
// Odunbalta001@
