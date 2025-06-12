"use client";

import { KeyboardArrowLeft, Person2Outlined, ShoppingCart } from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu";
import { Badge, Slide, useScrollTrigger } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "./container";
import Nav from "./ui/nav";
import Searchbox from "./ui/searchbox";
import { useSelector } from "react-redux";
import { getTotalCartQuantity } from "@/app/cart/cartSlice";
import Link from "next/link";
import { Suspense, useEffect, useState } from "react";

interface Props {
  /**
   * Optional window reference for the scroll trigger.
   */
  window?: () => Window;
  children?: React.ReactElement<unknown>;
}

/**
 * The width of the mobile drawer.
 */
const drawerWidth = 240;

/**
 * HideOnScroll component hides its children when the user scrolls down.
 *
 * @param props - Contains children and an optional window reference.
 * @returns A Slide component that shows or hides its children based on scroll.
 */
function HideOnScroll(props: Props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    target: typeof window !== "undefined" ? window() : undefined,
  });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children ?? <div />}
    </Slide>
  );
}

/**
 * Header is the main header component which includes the navigation, search box,
 * and a responsive drawer for mobile devices.
 *
 * @param props - Component properties including an optional window reference.
 * @returns The AppBar component with responsive navigation.
 */
function Header(props: Props) {
  const [clientRendered, setClientRendered] = useState(false);
  const totalCartQuantity = useSelector(getTotalCartQuantity) || 0
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const displayQuantity = clientRendered ? totalCartQuantity : 0;


  useEffect(() => {
    setClientRendered(true);
  }, []);
  // Toggle the mobile drawer open state.
  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  // Content of the mobile drawer.
  const drawer = (
    <div onClick={handleDrawerToggle} className="text-center">
      <Typography variant="h6" sx={{ my: 2 }}>
        LOGO
      </Typography>
      <Divider />
      <Nav type="vertical" />
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex", marginBottom: { xs: 10, sm: 15 } }}>
      <CssBaseline />
      <HideOnScroll {...props}>
        <AppBar component="header">
          <Container>
            <Toolbar
              sx={{
                display: "flex",
                gap: 2,
                justifyContent: "space-between",
                alignItems: "center",
                p: { xs: 0 },
              }}
            >
              <Typography
                variant="h6"
                sx={{ display: { xs: "none", sm: "block" } }}
              >
                LOGO
              </Typography>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ display: { sm: "none" } }}
              >
                <MenuIcon />
              </IconButton>
              <Box
                sx={{
                  display: { xs: "none", sm: "block" },
                  maxWidth: "60%",
                  width: "50%",
                }}
              >
                <Suspense fallback={<div>صبر کنید...</div>}>
                  <Searchbox />
                </Suspense>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Link href={"/cart"}>
                  <IconButton color="inherit">
                    <Badge badgeContent={displayQuantity} color="success">
                      <ShoppingCart />
                    </Badge>
                  </IconButton>
                </Link>
                <Button
                  variant="outlined"
                  color="inherit"
                  startIcon={<Person2Outlined />}
                  endIcon={
                    <Box sx={{ display: { xs: "none", md: "flex" } }}>
                      <KeyboardArrowLeft />
                    </Box>
                  }
                  size="medium"
                  sx={{ display: { xs: "none", sm: "flex" }, gap: 2 }}
                >
                  وارد شوید
                </Button>
                {/* <Typography
                  variant="h6"
                  sx={{ display: { xs: "block", sm: "none" } }}
                >
                  LOGO
                </Typography> */}
              </Box>
            </Toolbar>

            <Box>
              <Box sx={{ display: { xs: "none", sm: "block" } }}>
                <Nav />
              </Box>
              <Button
                variant="outlined"
                color="inherit"
                startIcon={<Person2Outlined />}
                endIcon={<KeyboardArrowLeft />}
                size="medium"
                sx={{
                  display: { xs: "flex", sm: "none" },
                  marginBottom: 1,
                  width: "100%",
                  gap: 1,
                }}
              >
                وارد شوید
              </Button>
            </Box>
          </Container>
        </AppBar>
      </HideOnScroll>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          anchor="right"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better mobile performance.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </Box >
  );
}

export default Header;
