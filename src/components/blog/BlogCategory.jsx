import { Box, Stack, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import useBlogCalls from "../../hooks/useBlogCalls";

const BlogCategory = () => {
  const { category, pagination } = useSelector((state) => state.blog);

  const { getBlogs, getCategory } = useBlogCalls();

  useEffect(() => {
    getCategory();
  }, []);

  return (
    <>
      <Typography
        onClick={() => getBlogs("blogs")}
        component="span"
        variant="body1"
        fontSize="2rem"
        sx={{
          textDecoration: "underline",
          "&:hover": {
            cursor: "pointer",
          },
        }}
      >
        All Category
      </Typography>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          justifyContent: "space-evenly",
          "@media (max-width: 900px)": {
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            justifyContent: "center",
            alignItems: "start",
          },
        }}
      >
        {category.map((item) => (
          <Stack
            sx={{
              marginLeft: "20px",
            }}
          >
            <NavLink
              onClick={() => {
                getBlogs(
                  `blogs?page=${pagination?.page}&limit=${pagination?.limit}&filter[categoryId]=${item._id}`
                );
              }}
              style={{
                alignItems: "center",
                justifyContent: "center",
                color: "black",
                fontWeight: "bold",
                marginTop: "20px",
              }}
            >
              {item?.name}
            </NavLink>
          </Stack>
        ))}
      </Box>
    </>
  );
};

export default BlogCategory;
