import * as Yup from "yup";

export const loginSchema = Yup.object().shape({
  email: Yup.string().email().trim().required("Email is required"),
  password: Yup.string()
    .trim()
    .required("Password is required")
    .min(6, "Password is too short - should be 6 chars minimum"),
});
