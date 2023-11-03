import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Typography } from "@mui/material";
import { toast } from "react-toastify";
import CustomCard from "../../../components/customCard";
import CustomTitle from "../../../components/customTitle";
import { getConsumerAccessToken } from "../../../utils/session";
import { fetchWishlist } from "../../../redux/actions";
import { apiCall } from "../../../utils/api";

const Wishlist = () => {
  const dispatch = useDispatch();
  const userAccessToken = getConsumerAccessToken() || "";

  const getWishlist = useCallback(async () => {
    try {
      const result = await apiCall({
        reqMethod: "GET",
        endPoint: "/consumer/wishlist",
        userAccessToken,
      });
      dispatch(fetchWishlist(result?.data));
    } catch (error: any) {
      toast.error(error.message);
    }
  }, [dispatch, userAccessToken]);

  useEffect(() => {
    getWishlist();
  }, [getWishlist]);

  const wishlist = useSelector((state: any) => {
    return state.wishlistReducer.wishlist;
  });
  return (
    <Box sx={{ margin: "90px auto", maxWidth: 1560 }}>
      <CustomTitle title="Wishlist" />
      {wishlist && wishlist.length ? (
        <Box className="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 place-items-center">
          {wishlist.map((product: any) => {
            return (
              <Box key={product?._id}>
                <CustomCard productListType={2} product={product} />
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

export default Wishlist;
