import { AppBar, Avatar, Box, Divider, IconButton, Menu, MenuItem, Stack, Toolbar, Typography, useScrollTrigger } from "@mui/material";
import { useState } from "react";
import { useDispatch} from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { handleChangeUserFilters } from "../features/user/userSlice";
import useAuth from "../hooks/useAuth";
import useResponsive from "../hooks/useResponsive";
import {
  Link,
  Link as RouterLink,
} from "react-router-dom";
import Iconify from "../components/Iconify/Iconify";
import Logo from "../components/logo/Logo";
import SearchHeader from "../components/searchHeader/SearchHeader";
import LockOpenIcon from "@mui/icons-material/LockOpen";


const styledAppbar = (isScroll, isDashboard) => ({
  left: {
    lg: isDashboard ? 280 : 0,
  },
  width: {
    lg: isDashboard ? "calc(100% - 280px)" : "100%",
  },
  backgroundImage: "none",
  backgroundColor: !isDashboard || isScroll ? "primary.light" : "primary.main",
  boxShadow: {
    sx: 5,
    md: isScroll ? 3 : "none",
  },
});

function HeaderDashboard({ onOpenSidebar }) {
  const dispatch = useDispatch();
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const mdDown = useResponsive("down", "md");
  const mdUp = useResponsive("up", "md");

  const { pathname } = useLocation();

  const isDashboard = pathname.includes("dashboard");

  const [anchorEl, setAnchorEl] = useState(null);

  const isMenuOpen = Boolean(anchorEl);

  const handleDispatch = (searchQuery) =>
    dispatch(handleChangeUserFilters({ title: searchQuery }));

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };


  const handleLogout = async () => {
    try {
      handleMenuClose();
      await logout(() => {
        navigate("/login");
      });
    } catch (error) {
      console.error(error);
    }
  };

  const menuId = "primary-search-account-menu";

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <Box sx={{ my: 1.5, px: 2.5 }}>
        <Typography variant="subtitle2" noWrap>
          {user?.name}
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }} noWrap>
          {user?.email}
        </Typography>
      </Box>

      <Divider sx={{ borderStyle: "dashed" }} />

      <Box>
        <MenuItem
          onClick={handleMenuClose}
          to="/account"
          component={RouterLink}
          sx={{ mx: 1 }}
        >
          My Profile
        </MenuItem>
      </Box>

      <Divider sx={{ borderStyle: "dashed" }} />

      <MenuItem onClick={handleLogout} sx={{ m: 1 }}>
        Logout
      </MenuItem>
    </Menu>
  );

  const isScroll = useScrollTrigger({
    disableHysteresis: true,
    threshold: 10,
  });

  return (
    <Box>
      <AppBar
        position="fixed"
        color="inherit"
     
        sx={(theme) => styledAppbar(isScroll, isDashboard, theme)}
      >
        <Box maxWidth="lg" sx={{ px: 0, mx: "auto", width: 1 }}>
          <Toolbar>
            <Stack
              alignItems="center"
              justifyContent="space-between"
              direction="row"
              sx={{ flexGrow: 1 }}
            >
              {isDashboard ? (
                <IconButton
                  onClick={onOpenSidebar}
                  sx={{ mr: 1, color: "text.primary", display: { lg: "none" } }}
                >
                  <Iconify icon="ri:menu-2-fill" />
                </IconButton>
              ) : (
                <>
                  {mdDown && (
                    <IconButton
                      size="large"
                      edge="start"
                      color="inherit"
                      aria-label="open drawer"
                      sx={{ mr: 2 }}
                    >
                      <Logo />
                    </IconButton>
                  )}
                  {mdUp && (
                    <Box sx={{ width: 280, m: 0, p: 0, height: "100%" }}>
                      <Link to="/">
                        <img
                          src="../components/logo/logo.png"
                          alt="logo"
                          width="100%"
                          height="100%"
                        />
                      </Link>
                    </Box>
                  )}
                </>
              )}

              {isScroll && !isDashboard && mdUp && (
                <SearchHeader handleDispatch={handleDispatch} />
              )}

              <Stack
                direction="row"
                spacing={3}
                justifyContent="flex-end"
                sx={{ width: 280, flexGrow: isDashboard && 1 }}
              >
                {!isAuthenticated ? (
                  <Avatar
                    onClick={() => navigate("/login")}
                    alt="Cart"
                    sx={{
                      width: 32,
                      height: 32,
                      cursor: "pointer",
                      "&:hover": { backgroundColor: "primary.main" },
                    }}
                  >
                    <LockOpenIcon />
                  </Avatar>
                ) : (
                  <>
                   
                    <Avatar
                      onClick={handleProfileMenuOpen}
                      src={user?.avatarUrl}
                      alt={user?.name}
                      sx={{ width: 32, height: 32, cursor: "pointer" }}
                    />
                  </>
                )}
              </Stack>
            </Stack>
          </Toolbar>
        </Box>
      </AppBar>
      {renderMenu}
    </Box>
  );
}

export default HeaderDashboard;