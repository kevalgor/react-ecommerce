import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  Box,
  IconButton,
  InputAdornment,
  Typography,
  Link,
} from "@mui/material";
import { Email as EmailIcon } from "@mui/icons-material";
import {
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
} from "@mui/icons-material";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import "./style.css";
import {
  setConsumerAccessToken,
  setConsumerDetails,
  getConsumerAccessToken,
  getConsumerDetails,
} from "../../../utils/session";
import CustomTextField from "../../../components/customTextField";
import CustomTitle from "../../../components/customTitle";
import CustomButton from "../../../components/customButton";
import { loginSchema } from "../../../validations/loginForm.validations";
import { apiCall } from "../../../utils/api";
import { login } from "../../../redux/actions";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const consumerAccessToken = getConsumerAccessToken();
  const consumerDetails = getConsumerDetails();
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const result: any = await apiCall({
          reqMethod: "POST",
          endPoint: "/consumer/auth/login",
          body: { email: values.email, password: values.password },
        });
        setConsumerAccessToken(result?.data.token);
        setConsumerDetails(result?.data);
        dispatch(login(result?.data));
        navigate("/consumer/cart");
      } catch (error: any) {
        toast.error(error.message);
      }
      resetForm();
    },
  });

  useEffect(() => {
    if (consumerAccessToken && consumerDetails) {
      navigate("/consumer/cart");
    }
  }, [navigate, consumerAccessToken, consumerDetails]);

  const changeRoute = (routePath: any) => {
    navigate(routePath);
  };

  if (!consumerAccessToken && !consumerDetails) {
    return (
      <Box
        className="login-form absolute"
        component="form"
        sx={{
          boxShadow: "#49ABDB 0px 2px 5px -1px, #49ABDB 0px 1px 3px -1px",
          "& > :not(style)": {
            my: 4,
            mx: 2,
            width: { xs: 250, sm: 300, md: 350, lg: 400 },
          },
        }}
        // noValidate
        autoComplete="off"
        onSubmit={formik.handleSubmit}
      >
        <CustomTitle title="Login" />
        <Box className="flex flex-col">
          <CustomTextField
            fullWidth
            label={"E-mail"}
            name={"email"}
            InputProps={{
              // autoComplete: "new-password",
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton>
                    <EmailIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.email && formik.touched.email ? (
            <Typography className="text-red-600" variant={"body2"}>
              {formik.errors.email}
            </Typography>
          ) : null}
          <CustomTextField
            fullWidth
            label={"Password"}
            name={"password"}
            type={showPassword ? "text" : "password"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleClickShowPassword}>
                    {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.password && formik.touched.password ? (
            <Typography className="text-red-600" variant={"body2"}>
              {formik.errors.password}
            </Typography>
          ) : null}
          <CustomButton type={"submit"} name={"Login"} margin={"30px 0 0 0"} />
        </Box>
        <Box>
          <Box className="text-center">
            <Typography
              className="text-sky-500"
              sx={{ padding: "2px" }}
              variant={"caption"}
            >
              don't have an account?
            </Typography>
            <Link
              sx={{
                fontSize: 14,
                color: "rgb(245 158 11);",
                textDecorationColor: "rgb(245 158 11);",
                padding: "2px",
                cursor: "pointer"
              }}
              onClick={() => changeRoute("/consumer/register")}
              tabIndex={0}
            >
              register
            </Link>
          </Box>
          <Box className="text-center">
            <Typography
              className="text-sky-500"
              sx={{ padding: "2px" }}
              variant={"caption"}
            >
              are you vendor?
            </Typography>
            <Link
              sx={{
                fontSize: 14,
                color: "rgb(245 158 11);",
                textDecorationColor: "rgb(245 158 11);",
                padding: "2px",
                cursor: "pointer"
              }}
              onClick={() => changeRoute("/vendor/login")}
              tabIndex={0}
            >
              login
            </Link>
          </Box>
        </Box>
      </Box>
    );
  }
  return <></>;
};

export default Login;
