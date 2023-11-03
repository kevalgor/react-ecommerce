import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Typography } from "@mui/material";
import { toast } from "react-toastify";
import CustomCard from "../../../components/customCard";
import CustomTitle from "../../../components/customTitle";
import { fetchCart } from "../../../redux/actions";
import { getConsumerAccessToken } from "../../../utils/session";
import { apiCall } from "../../../utils/api";

const Cart = () => {
  const dispatch = useDispatch();
  const userAccessToken = getConsumerAccessToken() || "";

  const getCartList = useCallback(async () => {
    try {
      const result = await apiCall({
        reqMethod: "GET",
        endPoint: "/consumer/cart",
        userAccessToken,
      });
      dispatch(fetchCart(result?.data));
    } catch (error: any) {
      toast.error(error.message);
    }
  }, [dispatch, userAccessToken]);

  useEffect(() => {
    getCartList();
  }, [getCartList]);

  const cart = useSelector((state: any) => {
    return state.cartReducer.cart;
  });

  return (
    <Box sx={{ margin: "90px auto", maxWidth: 1560 }}>
      <CustomTitle title="Cart" />
      {cart && cart.length ? (
        <Box className="grid xl:grid-cols-5 lg:grid-cols-3 md:grid-cols-2 place-items-center">
          {cart.map((product: any) => {
            return (
              <Box key={product?._id}>
                <CustomCard productListType={1} product={product} />
              </Box>
            );
          })}
        </Box>
      ) : (
        <Typography className="text-center" variant="body1">
          No records
        </Typography>
      )}
    </Box>
  );
};

export default Cart;
