import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, Container, Grid, Stack } from "@mui/material";
import Loading from "../helper/Loading";
import { useSelector } from "react-redux";
import globalStyles from "../styles/globalStyles";
import { useNavigate } from "react-router-dom";

const LatestPost = () => {
  const { blogs } = useSelector((state) => state.blog);
  const [latestpost, setLatestPost] = useState(blogs || []);

  const { loading } = useSelector((state) => state.blog);

  useEffect(() => {
    if (Array.isArray(blogs)) {
      const sortedBlogs = [...blogs].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setLatestPost(sortedBlogs.slice(0, 3));
    }
  }, [blogs]);

  const navigate = useNavigate();
  const { EllipsisText } = globalStyles();
  return (
    <Stack>
      {loading ? (
        <Loading />
      ) : (
        <Stack>
          <Container
            sx={{
              marginTop: "30px",
            }}
          >
            <Grid
              container
              gap={3}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "start",
              }}
            >
              <Typography className="font ">Leatest Blogs</Typography>
              {latestpost.map((item) => (
                <Card
                  sx={{ width: 345 }}
                  onClick={() => navigate(`/blogs/${item?._id}`)}
                >
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      height="250"
                      alt="green iguana"
                      image={item?.image}
                    />
                    <CardContent>
                      <Typography fontSize="1rem" variant="h6" component="div">
                        {item.title}
                      </Typography>
                      <EllipsisText
                        text={item?.content}
                        maxLines={4}
                      ></EllipsisText>
                      <Typography>
                        {new Date(item.createdAt).toLocaleString()}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              ))}
            </Grid>
          </Container>
        </Stack>
      )}
    </Stack>
  );
};

export default LatestPost;
