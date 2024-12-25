import { Link, Typography } from "@mui/material";
import React from "react";

const Copyright = () => {
  return (
    <Typography variant="body2" align="center" sx={{ color: "text.secondary" }}>
      {"Copyright © "}
      <Link color="inherit" href="www.syntigic.com/">
        Syntigic
      </Link>{" "}
      {new Date().getFullYear()}.
    </Typography>
  );
};

export default Copyright;
