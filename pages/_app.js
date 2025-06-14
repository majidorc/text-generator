import "../styles/globals.css";
import { CssBaseline, Drawer, AppBar, Toolbar, Typography, List, ListItem, ListItemText, IconButton, Box } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#2d2746",
      paper: "#2d2746",
    },
    text: {
      primary: "#fff",
    },
  },
});

const drawerWidth = 220;

function Layout({ children, pageTitle }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const router = useRouter();
  const menu = [
    { text: "Forms", href: "/forms" },
  ];
  return (
    <Box sx={{ display: "flex" }}>
      <AppBar position="fixed" sx={{ zIndex: 1201, bgcolor: "#231f3a" }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={() => setMobileOpen(!mobileOpen)}
            sx={{ mr: 2, display: { md: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            {pageTitle}
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
            bgcolor: "#231f3a",
            color: "#fff",
          },
          display: { xs: "none", md: "block" },
        }}
        open
      >
        <Toolbar />
        <List>
          {menu.map((item) => (
            <Link href={item.href} key={item.text} passHref legacyBehavior>
              <ListItem button selected={router.pathname === item.href} component="a">
                <ListItemText primary={item.text} />
              </ListItem>
            </Link>
          ))}
        </List>
      </Drawer>
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", md: "none" },
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
            bgcolor: "#231f3a",
            color: "#fff",
          },
        }}
      >
        <Toolbar />
        <List>
          {menu.map((item) => (
            <Link href={item.href} key={item.text} passHref legacyBehavior>
              <ListItem button selected={router.pathname === item.href} component="a" onClick={() => setMobileOpen(false)}>
                <ListItemText primary={item.text} />
              </ListItem>
            </Link>
          ))}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: { xs: 2, md: 4 }, width: { md: `calc(100% - ${drawerWidth}px)` } }}>
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}

export default function App({ Component, pageProps }) {
  // Each page should export a pageTitle
  const pageTitle = Component.pageTitle || "Operator Form";
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Layout pageTitle={pageTitle}>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
} 