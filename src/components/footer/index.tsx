import { Box } from "@mui/material";

const Footer = () => {
  return (
    <Box
      className="fixed bottom-0 w-full py-4 flex justify-center items-center text-white font-bold"
      sx={{ backgroundColor: "#2b2b2b" }}
    >
      All rights are reserved by Keval Patel
    </Box>
  );
};

export default Footer;
