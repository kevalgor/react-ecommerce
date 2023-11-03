import { Box, Typography } from "@mui/material";
import "./style.css";

const CustomTitle = ({ title }: { title: string }) => {
  return (
    <Box className="custom-title">
      <Typography variant="h5">{title}</Typography>
      <Box className="title-underline"></Box>
    </Box>
  );
};

export default CustomTitle;
