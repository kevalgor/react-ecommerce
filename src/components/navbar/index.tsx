import { useState, MouseEvent } from "react";
import { useNavigate } from "react-router-dom";
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
import {
  getConsumerAccessToken,
  getConsumerDetails,
  consumerLogout,
} from "../../utils/session";

const pages = [
  {
    routeName: "Products",
    routePath: "consumer/products",
  },
  {
    routeName: "Cart",
    routePath: "consumer/cart",
  },
];
const settings = [
  {
    routeName: "Profile",
    routePath: "consumer/profile",
  },
  {
    routeName: "My Wishlist",
    routePath: "consumer/wishlist",
  },
  {
    routeName: "My Orders",
    routePath: "consumer/orders",
  },
  {
    routeName: "Logout",
    routePath: "logout",
  },
];

const Navbar = () => {
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const userAccessToken = getConsumerAccessToken();
  let userDetails: any = getConsumerDetails();
  if (userDetails) {
    userDetails = JSON.parse(userDetails);
  }

  const changeRoute = (routePath: any) => {
    if (routePath === "logout") {
      consumerLogout();
      navigate("/");
    } else {
      navigate(routePath);
    }
    setAnchorElNav(null);
    setAnchorElUser(null);
  };

  return (
    <AppBar position="fixed" sx={{ backgroundColor: "#2b2b2b" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".15rem",
              fontSize: "2.5em",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            E-Commerce
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
                <MenuItem
                  key={page.routeName}
                  onClick={() => changeRoute(`/${page.routePath}`)}
                >
                  <Typography textAlign="center">{page.routeName}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".1rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            E-Commerce
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page.routeName}
                onClick={() => changeRoute(page.routePath)}
                sx={{
                  my: 2,
                  color: "white",
                  display: "block",
                  fontWeight: 600,
                }}
              >
                {page.routeName}
              </Button>
            ))}
          </Box>
          {!userAccessToken ? (
            <Box>
              <Typography
                variant="h6"
                noWrap
                component="a"
                sx={{
                  p: 0.8,
                  fontFamily: "monospace",
                  fontWeight: 500,
                  letterSpacing: ".01rem",
                  color: "inherit",
                  textDecoration: "none",
                  cursor: "pointer",
                  "&:hover": {
                    background: "rgba(25, 118, 210, 0.04)",
                  },
                  "&:active": {
                    background: "rgba(25, 118, 210, 0.04)",
                  },
                }}
                onClick={() => changeRoute("consumer/login")}
              >
                Login
              </Typography>
            </Box>
          ) : (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt={userDetails?.name} src="/path" />
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
                  <MenuItem
                    key={setting.routeName}
                    onClick={() => changeRoute(setting.routePath)}
                  >
                    <Typography textAlign="center">
                      {setting.routeName}
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
