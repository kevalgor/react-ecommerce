import { Button } from "@mui/material";

const CustomButton = ({
  type,
  name,
  size = "medium",
  backgroundColor,
  hoverColor,
  color,
  margin,
  onClick,
}: any) => {
  const attributes = {
    ...(type && { type }),
    variant: "contained",
    size,
    ...(onClick && { onClick }),
  };
  const style = {
    ...(backgroundColor && { backgroundColor }),
    ...(color && { color }),
    ...(hoverColor && {
      "&:hover": {
        background: hoverColor,
      },
    }),
    ...(margin && { margin }),
  };
  return (
    <Button {...attributes} sx={style}>
      {name}
    </Button>
  );
};

export default CustomButton;
