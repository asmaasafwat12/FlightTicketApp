import React from "react";
import { useLocation, NavLink } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Button,
  Drawer,
  useMediaQuery,
  Stack,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { logout } from "../redux/authSlice";
import { useTheme } from "@mui/system";
import { grey } from "@mui/material/colors";

type NavItem = {
  to: string;
  text: string;
  onClick?: () => void;
};

const Header = () => {
  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleItemClick = () => {
    setDrawerOpen(false);
  };

  const NavButton = ({ to, text, onClick }: NavItem) => (
    <NavLink
      to={to}
      style={{
        textDecoration: "none",
        color: location.pathname === to ? "red" : "inherit",
      }}
    >
      <Button onClick={onClick} color="inherit">
        {text}
      </Button>
    </NavLink>
  );

  const renderNavItems = () => (
    <>
      {isAuthenticated && (
        <>
          <NavButton to="/" text="Flight List" onClick={handleItemClick} />
          <NavButton
            to="/flight-form"
            text="Flight Form"
            onClick={handleItemClick}
          />
        </>
      )}

      <NavButton
        to="/login"
        text={isAuthenticated ? "LogOut" : "Login"}
        onClick={() => {
          if (isAuthenticated) dispatch(logout());
          handleItemClick();
        }}
      />

      {!isAuthenticated && (
        <NavButton to="/register" text="Register" onClick={handleItemClick} />
      )}
    </>
  );

  return (
    <AppBar position="static" color="transparent">
      <Toolbar>
        {/* Logo */}
        <Typography fontStyle="strong" color={grey[600]}>
          Flight Tickets |
        </Typography>
        {isMobile ? (
          <>
            <Button onClick={toggleDrawer} color="inherit">
              Menu
            </Button>
            <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer}>
              <Stack style={{ flexDirection: "column" }} spacing={2} p={4}>
                {renderNavItems()}
              </Stack>
            </Drawer>
          </>
        ) : (
          renderNavItems()
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
