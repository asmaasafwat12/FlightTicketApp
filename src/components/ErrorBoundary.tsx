import { Box, Button, Typography } from "@mui/material";
import React, { useMemo } from "react";
import {
  isRouteErrorResponse,
  useNavigate,
  useRouteError,
} from "react-router-dom";

const ErrorBoundary = () => {
  const error = useRouteError();
  const navigate = useNavigate();

  const errorMessage = useMemo(() => {
    if (isRouteErrorResponse(error)) {
      return `${error.status} ${error.statusText}`;
    } else if (error instanceof Error) {
      return error.message;
    } else if (typeof error === "string") {
      return error;
    } else {
      console.error(error);
      return "Unknown error";
    }
  }, [error]);

  return (
    <Box p={2}>
      <Typography variant="h4">Sorry.. there was an error</Typography>
      <Typography color="error">{errorMessage}</Typography>
      <Button
        variant="contained"
        onClick={() => navigate("/", { replace: true })}
        sx={{ mt: 2 }}
      >
        Back
      </Button>
    </Box>
  );
};

export default ErrorBoundary;
