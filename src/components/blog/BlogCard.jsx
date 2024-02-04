import * as React from "react";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import CardActions from "@mui/joy/CardActions";
import Typography from "@mui/joy/Typography";
import Stack from "@mui/joy/Stack";
import CardMedia from "@mui/material/CardMedia";
import { useDispatch, useSelector } from "react-redux";
import Container from "@mui/material/Container";
import globalStyles from "../../styles/globalStyles";
import { Alert, Box, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import Pagination from "@mui/material/Pagination";
import useBlogCalls from "../../hooks/useBlogCalls";
import { indigo } from "@mui/material/colors";
import { useEffect, useState } from "react";
import Loading from "../../helper/Loading";
import LatestPost from "../../pages/LatestPost";
import BlogCategory from "./BlogCategory";

const months = [
  "Jan",
  "Feb",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "Sept",
  "Octb",
  "Novm",
  "Dec",
];

export default function BlogCard() {
  const { EllipsisText } = globalStyles();
  const { blogs, loading, pagination } = useSelector((state) => state.blog);

  const { token } = useSelector((state) => state.auth.user);
  const navigate = useNavigate();

  const { likeBlogs, getBlogs } = useBlogCalls();

  useEffect(() => {
    getBlogs(`blogs/?page=${pagination?.page}&limit=${pagination?.limit}`);
  }, []);

  const handlePageChange = (event, newPage) => {
    getBlogs(`blogs/?page=${newPage}&limit=${pagination?.limit}`);
  };

  const handleLike = async (blogId) => {
    await likeBlogs(blogId);
  };

  return (
    <Stack
      sx={{
        display: "flex",
        margin: "30px auto",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Grid container sx={{ position: "relative" }}>
        <Grid item xs={12} sm={4} md={4} lg={3} xl={3}>
          <Box
            sx={{
              marginLeft: "40px",
              "@media (min-width: 900px)": {
                height: "100vh",
                position: "sticky",
                top: 0,
                overflow: "scroll",
              },
            }}
          >
            <BlogCategory />
            <Box
              sx={{
                "@media (max-width: 700px)": {
                  display: "none",
                },
              }}
            >
              <LatestPost />
            </Box>
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          sm={3}
          md={4}
          lg={5}
          xl={8}
          sx={{
            alignItems: "start",
            justifyContent: "start",
            display: "flex",
          }}
        >
          {loading ? (
            <Loading />
          ) : blogs && blogs.length > 0 ? (
            <Stack alignItems="start" display="flex">
              <Container>
                {blogs.map((item) => (
                  <Card
                    key={item?._id}
                    orientation="horizontal"
                    variant="outlined"
                    sx={{
                      border: "none",
                      alignItem: "start",
                      padding: "20px",
                      justifyContent: "start",
                      "@media (max-width: 700px)": {
                        display: "flex",
                        flexDirection: "column",
                        margin: "10px auto",
                      },
                    }}
                  >
                    <Box
                      sx={{
                        width: "250px",
                        height: "250px",
                        marginTop: "20px",
                        position: "relative",
                        overflow: "hidden",
                        "&:hover .card-media": {
                          opacity: 0,
                          transform: "translateY(0)",
                        },
                        "&:hover .date-info": {
                          opacity: 1,
                          transform: "translate(-50%, -50%)",
                        },
                        "@media (max-width: 700px)": {
                          width: "100%",
                        },
                      }}
                    >
                      <CardMedia
                        className="card-media"
                        component="img"
                        image={item?.image}
                        alt="Resim"
                        sx={{
                          width: "100%",
                          height: "100%",
                          borderRadius: "10px",
                          opacity: 1,
                          transition:
                            "opacity 0.5s ease-in-out, transform 0.5s ease-in-out",
                          transform: "translateY(0)",
                          position: "absolute",
                          top: 0,
                          left: 0,
                        }}
                      />

                      <Typography
                        className="date-info"
                        sx={{
                          position: "absolute",
                          top: "50%",
                          left: "50%",
                          transform: "translate(-50%, -50%)",
                          color: "black",
                          padding: "10px",
                          borderRadius: "10px",
                          zIndex: 2,
                          opacity: "0",
                          textAlign: "center",
                          transition: "opacity 0.5s ease-in-out",
                          fontSize: "40px",
                          fontWeight: "bold",
                        }}
                      >
                        {(() => {
                          const dateStr = new Date(
                            item?.createdAt
                          ).toLocaleDateString("tr");
                          const parts = dateStr.split(".");
                          const monthIndex = parseInt(parts[1], 10) - 1;
                          const monthName = months[monthIndex];
                          return (
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                              }}
                            >
                              <span
                                style={{
                                  fontSize: "50px",
                                  fontWeight: "bold",
                                }}
                              >
                                {parts[0]}
                              </span>
                              <span style={{ fontSize: "20px" }}>
                                {monthName}
                              </span>
                            </div>
                          );
                        })()}
                      </Typography>
                    </Box>

                    <CardContent sx={{ marginTop: "30px" }}>
                      <Typography
                        level="title-lg"
                        component="div"
                        sx={{
                          fontFamily: "'Fira Sans', sans-serif",
                          fontWeight: "700",
                          fontSize: "21px",
                        }}
                      >
                        {item?.title}
                      </Typography>
                      <EllipsisText
                        text={item?.content}
                        maxLines={4}
                      ></EllipsisText>
                      <CardActions buttonFlex="none">
                        <Button
                          disabled={!token}
                          variant="outled"
                          sx={{
                            color:
                              item.likes?.length > 0 ? indigo[400] : "grey",
                          }}
                          size="sm"
                        >
                          <ThumbUpOffAltIcon
                            onClick={() => handleLike(item?._id)}
                          />
                          {item?.likes.length || 0}
                        </Button>
                        <Button variant="outled" disabled={!token}>
                          <ChatBubbleOutlineIcon />
                          {item?.comments?.length || 0}
                        </Button>
                        <Button
                          variant="outlined"
                          color="neutral"
                          size="sm"
                          onClick={() => navigate(`/blogs/${item?._id}`)}
                        >
                          See details
                        </Button>
                        <Button variant="outled">
                          <RemoveRedEyeIcon />
                          {item?.countOfVisitors}
                        </Button>
                      </CardActions>
                      <Typography fontSize="12px" variant="subtitle2">
                        Published:
                        {new Date(item.createdAt).toLocaleString("tr")}
                      </Typography>
                    </CardContent>
                  </Card>
                ))}
              </Container>
              <Stack
                spacing={2}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  margin: "auto",
                }}
              >
                <Pagination
                  count={Math.ceil(
                    pagination?.totalRecords / pagination?.limit
                  )}
                  page={pagination?.pages ? pagination?.pages?.current : 1}
                  onChange={handlePageChange}
                  size="large"
                />
              </Stack>
            </Stack>
          ) : (
            <Alert severity="warning" sx={{ width: "100%", marginTop: "30px" }}>
              No blogs found.
            </Alert>
          )}
        </Grid>
      </Grid>
    </Stack>
  );
}
