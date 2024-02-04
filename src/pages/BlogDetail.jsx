import React, { useEffect } from "react";
import useBlogCalls from "../hooks/useBlogCalls";
import { useSelector } from "react-redux";
import Button from "@mui/joy/Button";
import {
  Avatar,
  Box,
  Card,
  CardActions,
  Container,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import ButtonBase from "@mui/material/ButtonBase";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { deepOrange, indigo, red } from "@mui/material/colors";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import UpdateModal from "../components/blog/UpdateModal";
import { confirmDelete } from "../components/blog/DeleteModal";

const BlogDetail = () => {
  const { getBlogDetail, Myblogs, likeBlogs, getBlogs } = useBlogCalls();
  const navigate = useNavigate();

  const [showComment, setshowComment] = useState(false);

  const { blogDetails } = useSelector((state) => state.blog);

  const { userId } = blogDetails;
  const { token } = useSelector((state) => state.auth.user);

  const { comments } = blogDetails;

  const { _id } = useSelector((state) => state.auth);
  const { id } = useParams();

  const [comment, setComment] = useState({
    blogId: id,
    comment: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setComment({ ...comment, [name]: value });
  };

  const { commentPost, deleteBlogs } = useBlogCalls();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await commentPost(comment);
    setComment({ ...comment, comment: "" });
    getBlogDetail();
  };

  useEffect(() => {
    getBlogDetail();
    Myblogs();
  }, []);

  const Img = styled("img")({
    margin: "auto",
    display: "block",
    width: "100%",
    height: "100%",
    objectFit: "cover",
  });

  const handleDeleteBlog = () => {
    deleteBlogs();
    navigate("/myblog");
  };

  const handleLike = async (blogId) => {
    await likeBlogs(blogId);
  };

  return (
    <div>
      <Container
        sx={{
          display: "flex",
          gap: "30px",
          mt: "120px",
          alignItems: "center",
        }}
      >
        <Grid container spacing={4}>
          <Grid
            item
            xs={12}
            md={6}
            style={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <ButtonBase
              sx={{
                width: 500,
                height: 700,
                display: "flex",
                justifyContent: "flex-start",
              }}
            >
              <Img
                alt="complex"
                src={blogDetails.image}
                sx={{ borderRadius: "10px" }}
              />
            </ButtonBase>
          </Grid>
          <Grid item xs={12} md={6} container direction="column" spacing={2}>
            <Grid item xs sx={{ marginTop: "50px" }}>
              <Typography
                gutterBottom
                variant="h5"
                component="h2"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  fontFamily: "'Fira Sans', sans-serif",
                  fontWeight: "700",
                  fontSize: "30px",
                }}
              >
                {blogDetails.title}
              </Typography>
              <Typography
                variant="caption"
                color="textSecondary"
                sx={{
                  fontFamily: "'Fira Sans', sans-serif",
                  fontWeight: "400",
                }}
              >
                {blogDetails.content}
              </Typography>
            </Grid>
            <Grid
              item
              sx={{
                display: "flex",
                marginBottom: "20px",
                "@media (max-width: 900px)": {
                  display: "flex",
                  flexDirection: "column",
                },
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <Avatar sx={{ bgcolor: deepOrange[500] }}></Avatar>
                <Typography variant="subtitle2">
                  {new Date(blogDetails.createdAt).toLocaleString("tr")}
                </Typography>
              </Box>
              <CardActions
                buttonFlex="none"
                sx={{
                  "@media (max-width: 900px)": {
                    display: "flex",
                    flexWrap: "wrap",
                  },
                }}
              >
                <Button
                  variant="outled"
                  disabled={!token}
                  sx={{
                    color: blogDetails.likes?.length > 0 ? indigo[500] : "grey",
                  }}
                  size="sm"
                >
                  <ThumbUpOffAltIcon
                    onClick={() => handleLike(blogDetails._id)}
                  />
                  {blogDetails?.likes?.length || 0}
                </Button>
                <Button
                  variant="outled"
                  onClick={() => setshowComment(!showComment)}
                  disabled={!token}
                >
                  <ChatBubbleOutlineIcon />
                  {blogDetails?.comments?.length || 0}
                </Button>
                <Button variant="outled">
                  {blogDetails?.countOfVisitors}
                  <RemoveRedEyeIcon />
                </Button>
                {/* blogu yazan id ile giris yapan id ayni ise */}
                {userId?._id === _id && (
                  <CardActions>
                    <UpdateModal blogDetails={blogDetails} />
                    <Button
                      variant="outlined"
                      onClick={() => confirmDelete(handleDeleteBlog)}
                    >
                      Delete
                    </Button>
                  </CardActions>
                )}
              </CardActions>
            </Grid>
          </Grid>
        </Grid>
      </Container>
      <Container>
        {showComment && (
          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              id="outlined-multiline-static"
              label="Comment"
              multiline
              rows={4}
              name="comment"
              value={comment.comment}
              fullWidth
              sx={{ width: "100%", marginTop: "15px" }}
              onChange={handleChange}
            />
            <Button type="submit" sx={{ margin: "5px" }}>
              Add Comment
            </Button>
          </Box>
        )}
        {showComment &&
          comments?.map((item) => (
            <Box sx={{ margin: "10px", width: "100%" }}>
              <Card variant="outlined" sx={{ width: "100%", padding: "20px" }}>
                <Stack
                  spacing={5}
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  <Avatar
                    sx={{
                      bgcolor: "gray",
                      width: "50px",
                      height: "50px",
                    }}
                  >
                    <Typography
                      sx={{ fontSize: "13px", textTransform: "uppercase" }}
                    >
                      {item?.userId.firstName}
                    </Typography>
                  </Avatar>
                  <Typography>
                    {new Date(item.createdAt).toLocaleString("tr")}
                  </Typography>
                </Stack>
                <Typography sx={{ marginTop: "10px" }}>
                  {item.comment}
                </Typography>
              </Card>
            </Box>
          ))}
      </Container>
    </div>
  );
};

export default BlogDetail;
