import React from "react";
import Header from "./components/Header";
import { Outlet } from "react-router-dom";
import { Box, Container } from "@mui/material";

const App = () => {
  return (
    <Container sx={{ paddingTop: 3 }}>
      <Box sx={{ paddingY: 2 }}>
        <Header />
      </Box>
      <Outlet />
    </Container>
  );
};

export default App;
