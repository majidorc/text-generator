import "../styles/globals.css";
import { CssBaseline } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";

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

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <div style={{ flex: 1 }}>
          <Component {...pageProps} />
        </div>
        <footer style={{ textAlign: 'center', padding: '16px 0', background: '#231f3a', color: '#fff', fontSize: 16 }}>
          &lt;3 <a href="https://tours.co.th" target="_blank" rel="noopener noreferrer" style={{ color: '#7ecbff', textDecoration: 'none', fontWeight: 500 }}>Tours.co.th</a>
        </footer>
      </div>
    </ThemeProvider>
  );
} 