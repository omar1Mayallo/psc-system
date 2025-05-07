import MenuIcon from "@mui/icons-material/Menu";
import {
  AppBar,
  Box,
  Drawer as DrawerMUI,
  IconButton,
  Stack,
  Theme,
  Toolbar,
  useMediaQuery,
  Container,
} from "@mui/material";
import {useState} from "react";
import {Link} from "react-router-dom";
import DarkLightButton from "./components/DarkLightButton";
import Drawer from "./components/Drawer";
import LogoutButton from "./components/Logout";

export default function Header() {
  const isLargeScreen: boolean = useMediaQuery<Theme>((theme) =>
    theme.breakpoints.up("md")
  );

  // DRAWER_NAV_STATE
  const [mobileOpen, setMobileOpen] = useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  return (
    <Box component={"header"} sx={{flexGrow: 1}}>
      {/* TOP_NAV */}
      <AppBar component={"nav"} position="static" color="transparent">
        <Container maxWidth="xl">
          <Toolbar>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent={"space-between"}
              width={"100%"}
              spacing={2}
            >
              <Box sx={{display: "flex", alignItems: "center"}}>
                {/* MENU_ICON */}
                <>
                  {isLargeScreen || (
                    <IconButton
                      size="large"
                      edge="start"
                      color="inherit"
                      aria-label="menu"
                      sx={{mr: 2}}
                      onClick={handleDrawerToggle}
                    >
                      <MenuIcon />
                    </IconButton>
                  )}
                </>

                {/* LOGO */}
                <Link
                  to={"/"}
                  style={{
                    display: "flex",
                    justifyItems: "center",
                    margin: "3px 0",
                  }}
                >
                  <Box
                    component={"img"}
                    src="/gamepad-icon.svg"
                    alt="logo"
                    width={55}
                    height={55}
                  />
                </Link>
              </Box>

              <Box sx={{display: "flex", alignItems: "center"}}>
                {/* DARK/LIGHT_BUTTON */}
                <DarkLightButton />
                {/* LOGIN || USER_PROFILE */}
                <LogoutButton />
              </Box>
            </Stack>
          </Toolbar>
        </Container>
      </AppBar>
      {/* DRAWER_NAV */}
      <Box component="nav">
        <DrawerMUI
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: {xs: "block", lg: "none"},
            "& .MuiDrawer-paper": {boxSizing: "border-box", width: 240},
          }}
        >
          <Drawer handleDrawerToggle={handleDrawerToggle} />
        </DrawerMUI>
      </Box>
    </Box>
  );
}
