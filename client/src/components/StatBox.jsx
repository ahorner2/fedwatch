import React from "react";
import { Box, Typography, useTheme } from "@mui/material";
import FlexBetween from "./FlexBetween";

const StatBox = ({ title, value, increase, icon, description }) => {
  const theme = useTheme();
  let color;

  // if string check for -, else if > 0
  if (typeof value === "string") {
    color = value.includes("-")
      ? theme.palette.error[500]
      : theme.palette.success[500];
  } else if (typeof value === "number") {
    color = value > 0 ? theme.palette.success[500] : theme.palette.error[500];
    value = value.toLocaleString("en-US", { 
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
      notation: "compact"
    })
  }

  return (
    <Box
      gridColumn="span 2"
      gridRow="span 1"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      p="1.25rem 1rem"
      flex="1 1 100%"
      backgroundColor={theme.palette.background.alt}
      borderRadius="0.55rem">
      <FlexBetween>
        <Typography variant="h6" sx={{ color: theme.palette.secondary[100] }}>
          {title}
        </Typography>
        {icon}
      </FlexBetween>

      <Typography
        variant="h2"
        fontWeight="600"
        sx={{ 
          color: color,
          // value && value > 0 ? theme.palette.error[500] : theme.palette.success[500] 
          }}>
        {value}
      </Typography>
      <FlexBetween gap="1rem">
        <Typography
          variant="h5"
          fontStyle="italic"
          sx={{ color: theme.palette.secondary.light }}>
          {increase}
        </Typography>
        <Typography>{description}</Typography>
      </FlexBetween>
    </Box>
  );
};

export default StatBox;
