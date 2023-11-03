import { TextField } from "@mui/material";

const CustomTextField = ({
  fullWidth,
  label,
  name,
  isDisabled,
  type,
  multiline,
  maxRows = 4,
  InputProps,
  onChange,
  onBlur,
  value,
}: any) => {
  const attributes = {
    ...(fullWidth && { fullWidth }),
    label,
    name,
    variant: "standard",
    ...(isDisabled && { disabled: isDisabled }),
    ...(type && { type }),
    ...(multiline && { multiline, maxRows }),
    ...(InputProps && { InputProps }),
    ...(onChange && { onChange }),
    ...(onBlur && { onBlur }),
    value,
  };
  return <TextField {...attributes} sx={{ margin: "4px 0" }} />;
};

export default CustomTextField;
