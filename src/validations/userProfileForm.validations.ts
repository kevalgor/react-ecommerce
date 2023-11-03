import * as Yup from "yup";

export const userProfileSchema = Yup.object().shape({
  name: Yup.string().trim().required("Name is required"),
  email: Yup.string().email().trim().required("Email is required"),
  mobile: Yup.string()
    .trim()
    .matches(/^[0-9]*$/, "Only numbers are allowed")
    .length(10, "Number must be of 10 digit")
    .required("Mobile is required"),
  address: Yup.string().trim().required("Address is required"),
  deliveryAddress: Yup.string().trim().required("Delivery address is required"),
});
