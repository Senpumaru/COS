import { Box, CssBaseline, Paper, Typography } from "@material-ui/core";
import { ThemeProvider } from "@emotion/react";
import React from "react";
import theme from "../Theme/Theme";
import { ScopedCssBaseline } from "@mui/material";

function Home() {
  return (
    <Box>
      <Typography>Test</Typography>
      <a href="http://localhost/api/account/Menu/">Список приложений</a>
    </Box>
  );
}

export default Home;
