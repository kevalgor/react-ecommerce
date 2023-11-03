import CustomTextField from "../customTextField";
import { IconButton, InputAdornment } from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";

const CustomSearch = ({ onChange }: any) => {
  return (
    <CustomTextField
      label={"Product"}
      name={"product"}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <IconButton>
              <SearchIcon />
            </IconButton>
          </InputAdornment>
        ),
      }}
      onChange={onChange}
    />
  );
};

export default CustomSearch;
