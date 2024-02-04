import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";

export default function Profile() {
  const { bio, firstName, image, lastName, username } = useSelector(
    (state) => state.auth.user
  );
  return (
    <Card
      sx={{
        maxWidth: 500,
        height: "auto",
        display: "flex",
        padding: "20px",
        position: "absolute",
        top: "40%",
        left: "50%",
        transform: "translate(-50%,-50%)",
        justifyContent: "center",
        flexDirection: "row",
        boxShadow: "2px 1px 1px black",
        alignItems: "center",
        margin: "auto",
      }}
    >
      <CardMedia
        sx={{ height: 150, width: 150, borderRadius: "50%" }}
        image={image}
        title={image}
      />

      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Name:{firstName} {lastName}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Bio:{bio}
        </Typography>
      </CardContent>
    </Card>
  );
}

// solgunmert22@gmail.com
