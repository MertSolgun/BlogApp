import React, { useEffect } from "react";
import useBlogCalls from "../hooks/useBlogCalls";
import { useSelector } from "react-redux";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import globalStyles from "../styles/globalStyles";

const MyBlog = () => {
  const { EllipsisText } = globalStyles();
  const { Myblogs } = useBlogCalls();
  const navigate = useNavigate();

  const { Myblog } = useSelector((state) => state.blog);

  useEffect(() => {
    Myblogs();
  }, []);

  return (
    <>
      <Typography
        className="font text-center"
        style={{
          fontSize: "2rem",
          display: "flex",
          justifyContent: "center",
          margin: "20px auto",
        }}
      >
        My Blogs
      </Typography>
      <Container
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
          margin: "80px auto",
          justifyContent: "center",
        }}
      >
        {Myblog.map((item) => (
          <Card sx={{ width: 340 }}>
            <CardMedia
              sx={{ height: 340 }}
              image={item.image}
              title="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {item.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <EllipsisText text={item.content} maxLines={4}>
                  Content:
                </EllipsisText>
                <Typography>
                  {new Date(item.createdAt).toLocaleString("tr")}
                </Typography>
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                size="small"
                onClick={() => navigate(`/blogs/${item._id}`)}
              >
                Edit
              </Button>
            </CardActions>
          </Card>
        ))}
      </Container>
    </>
  );
};

export default MyBlog;

// userid
