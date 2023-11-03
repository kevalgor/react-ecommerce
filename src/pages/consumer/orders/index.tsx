import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box } from "@mui/material";
import { toast } from "react-toastify";
import CustomTitle from "../../../components/customTitle";
import { fetchOrders } from "../../../redux/actions";
import { getConsumerAccessToken } from "../../../utils/session";
import CustomTable from "../../../components/customTable";
import { apiCall } from "../../../utils/api";

const Orders = () => {
  const dispatch = useDispatch();
  const userAccessToken = getConsumerAccessToken() || "";

  const getOrdersList = useCallback(async () => {
    try {
      const result = await apiCall({
        reqMethod: "GET",
        endPoint: "/consumer/order",
        userAccessToken,
      });
      dispatch(fetchOrders(result?.data));
    } catch (error: any) {
      toast.error(error.message);
    }
  }, [dispatch, userAccessToken]);

  useEffect(() => {
    getOrdersList();
  }, [getOrdersList]);

  const orders = useSelector((state: any) => {
    return state.orderReducer.orders;
  });

  return (
    <Box sx={{ margin: "90px 0" }}>
      <CustomTitle title="Orders" />
      <CustomTable orders={orders} />
    </Box>
  );
};

export default Orders;
