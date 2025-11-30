import React from "react";
import { Alert, AlertTitle } from "@mui/material";

const ErrorAlert = ({ message, title = "Error" }) => {
  return (
    <Alert severity="error">
      <AlertTitle>{title}</AlertTitle>
      {message}
    </Alert>
  );
};

export default ErrorAlert;
