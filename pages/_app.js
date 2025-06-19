import "../styles/globals.css";
import { CssBaseline, Box } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useEffect, useMemo, useState, createContext } from "react";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { CacheProvider } from '@emotion/react';
import createEmotionCache from '../createEmotionCache';
import { DateProvider } from '../contexts/DateContext';

export const ThemeModeContext = createContext({ mode: "dark", handleToggle: () => {} });

const getDesignTokens = (mode) => ({
  palette: {
    mode,
    ...(mode === "dark"
      ? {
          background: {
            default: "#2d2746",
            paper: "#2d2746",
          },
          text: { primary: "#fff" },
        }
      : {
          background: {
            default: "#f5f5f5",
            paper: "#fff",
          },
          text: { primary: "#231f3a" },
        }),
  },
});

const clientSideEmotionCache = createEmotionCache();

export default function App({ Component, pageProps, emotionCache = clientSideEmotionCache }) {
  const [mode, setMode] = useState("dark");

  useEffect(() => {
    const saved = typeof window !== "undefined" && localStorage.getItem("mui-mode");
    if (saved === "light" || saved === "dark") setMode(saved);
  }, []);

  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  const handleToggle = () => {
    setMode((prev) => {
      const next = prev === "dark" ? "light" : "dark";
      if (typeof window !== "undefined") localStorage.setItem("mui-mode", next);
      return next;
    });
  };

  return (
    <DateProvider>
      <CacheProvider value={emotionCache}>
        <ThemeModeContext.Provider value={{ mode, handleToggle }}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
              <Box sx={{ flex: 1 }}>
                <Component {...pageProps} />
              </Box>
              <footer style={{ textAlign: 'center', padding: '16px 0', background: theme.palette.background.paper, color: theme.palette.text.primary, fontSize: 16 }}>
                <span role="img" aria-label="love" style={{ fontSize: 18, verticalAlign: 'middle', marginRight: 4 }}>❤️</span>
                <a href="https://tours.co.th" target="_blank" rel="noopener noreferrer" style={{ color: '#7ecbff', textDecoration: 'none', fontWeight: 500 }}>Tours.co.th</a>
              </footer>
            </Box>
            <SpeedInsights />
          </ThemeProvider>
        </ThemeModeContext.Provider>
      </CacheProvider>
    </DateProvider>
  );
} 