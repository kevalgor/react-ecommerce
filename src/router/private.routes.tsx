import { Navigate } from "react-router-dom";
import {
  getConsumerAccessToken,
  getConsumerDetails,
} from "../utils/session";

export const ConsumerPrivateRoute = ({ routeName }: any) => {
  const consumerAccessToken = getConsumerAccessToken();
  let consumerDetails: any = getConsumerDetails();
  if (consumerDetails) {
    consumerDetails = JSON.parse(consumerDetails);
  }
  return consumerAccessToken &&
    consumerDetails &&
    consumerDetails?.role === "consumer" ? (
    routeName
  ) : (
    <Navigate to={"/consumer/login"} />
  );
};
