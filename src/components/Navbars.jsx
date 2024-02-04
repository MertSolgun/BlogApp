import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";
import { CssBaseline, List, ListItem, Stack } from "@mui/material";
import { useSelector } from "react-redux";
import useAuthCalls from "../hooks/useAuthCalls";
import blogar from "./blogar2.png";

const getSettings = (token) => {
  if (token) {
    return [
      { id: 1, title: "My Blogs", path: "/myblog/" },
      { id: 2, title: "Profile", path: "/profile/" },
      { id: 4, title: "Logout", path: "/" },
    ];
  } else {
    return [
      { id: 3, title: "Login", path: "/login/" },
      { id: 5, title: "Register", path: "/register/" },
    ];
  }
};

function Navbar() {
  const { token } = useSelector((state) => state.auth.user);
  const settings = getSettings(token);

  const pages = [
    {
      id: 1,
      title: "DASHBOARD",
      path: "/",
    },
    {
      id: 2,
      title: "NEW BLOG",
      path: "/newblog/",
    },
  ];

  const { logout } = useAuthCalls();

  const navigate = useNavigate();

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar sx={{ backgroundColor: "#273136" }} className="navbar">
      <CssBaseline />
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            onClick={() => navigate("/")}
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              cursor: "pointer",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
              justifyContent: "center",
            }}
          >
            <img src={blogar} width="100px" alt="" />
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <ListItem key={page?.id} onClick={() => navigate(page.path)}>
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Typography textAlign="center" className="font">
                      {page?.title}
                    </Typography>
                  </MenuItem>
                </ListItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="a"
            onClick={() => navigate("/")}
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
              justifyContent: "start",
              textAlign: "start",
            }}
          >
            <img src={blogar} width="100px" alt="" />
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <List key={page?.id}>
                <ListItem onClick={() => navigate(page.path)}>
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Typography textAlign="center" className="font">
                      {page?.title}
                    </Typography>
                  </MenuItem>
                </ListItem>
              </List>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <ListItem key={setting?.id}>
                  <MenuItem
                    key={setting?.id}
                    onClick={() => {
                      if (setting.title === "Logout") {
                        logout();
                      } else {
                        handleCloseUserMenu();
                      }
                    }}
                  >
                    <Typography
                      textAlign="center"
                      onClick={() => navigate(setting.path)}
                    >
                      {setting.title}
                    </Typography>
                  </MenuItem>
                </ListItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;
