import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Box, Modal, Typography, Card } from "@mui/material";
import { Add as AddIcon, Remove as RemoveIcon } from "@mui/icons-material";
import { toast } from "react-toastify";
import CustomButton from "../customButton";
import { ProductListType } from "../../utils/enum";
import { getConsumerAccessToken, getConsumerDetails } from "../../utils/session";
import { fetchCart, fetchOrders, fetchWishlist } from "../../redux/actions";
import { apiCall } from "../../utils/api";
import "./style.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxWidth: 1200,
  bgcolor: "background.paper",
  border: "none",
  outline: "none",
  boxShadow: "#F6AD55 0px 1px 6px 0px",
};

const ProductModal = ({
  visibleProductModal,
  closeProductModal,
  product,
  productListType,
}: any) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isEdit, setEdit] = useState(false);
  const [quantity, setQuantity] = useState(
    productListType === ProductListType.Cart ? Number(product?.quantity) : 1
  );
  useEffect(() => {
    if (!visibleProductModal) {
      setQuantity(
        productListType === ProductListType.Cart ? Number(product?.quantity) : 1
      );
      setEdit(false);
    }
  }, [product?.quantity, productListType, visibleProductModal]);
  const userAccessToken = getConsumerAccessToken() || "";
  let userDetails: any = getConsumerDetails();
  if (userDetails) {
    userDetails = JSON.parse(userDetails);
  }

  const getCartList = async () => {
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
  };

  const getWishlist = async () => {
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
  };

  const getOrdersList = async () => {
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
  };

  const addProductToCart = async () => {
    try {
      await apiCall({
        reqMethod: "POST",
        endPoint: "/consumer/cart",
        userAccessToken,
        body: {
          product:
            productListType === ProductListType.Product
              ? product?._id
              : product?.product?._id,
          user: userDetails?._id,
          quantity,
        },
      });
      closeProductModal();
      toast.success("Added to cart");
      navigate("/consumer/cart");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const updateCartProduct = async (cartId: string) => {
    try {
      await apiCall({
        reqMethod: "PUT",
        endPoint: `/consumer/cart/${cartId}`,
        userAccessToken,
        body: {
          quantity,
        },
      });
      closeProductModal();
      toast.success("Updated to cart");
      setEdit(false);
      navigate("/consumer/cart");
      getCartList();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const deleteCartProduct = async (cartId: string) => {
    try {
      await apiCall({
        reqMethod: "DELETE",
        endPoint: `/consumer/cart/${cartId}`,
        userAccessToken,
      });
      closeProductModal();
      toast.success("Removed from cart");
      getCartList();
      navigate("/consumer/cart");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const addProductToWishlist = async () => {
    try {
      await apiCall({
        reqMethod: "POST",
        endPoint: "/consumer/wishlist",
        userAccessToken,
        body: {
          product: product?._id,
          user: userDetails?._id,
        },
      });
      closeProductModal();
      toast.success("Added to wishlist");
      navigate("/consumer/wishlist");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const deleteWishlistProduct = async (wishlistId: string) => {
    try {
      await apiCall({
        reqMethod: "DELETE",
        endPoint: `/consumer/wishlist/${wishlistId}`,
        userAccessToken,
      });
      closeProductModal();
      toast.success("Removed from wishlist");
      getWishlist();
      navigate("/consumer/wishlist");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const orderNow = async () => {
    try {
      await apiCall({
        reqMethod: "POST",
        endPoint: "/consumer/order",
        userAccessToken,
        body: {
          product:
            productListType === ProductListType.Product
              ? product?._id
              : product?.product?._id,
          user: userDetails?._id || "",
          quantity,
          deliveryAddress: userDetails?.deliveryAddress || "",
          orderAmount:
            productListType === ProductListType.Product
              ? product?.price * quantity
              : product?.product?.price * quantity,
          discount: 0,
          paidAmount:
            productListType === ProductListType.Product
              ? product?.price * quantity
              : product?.product?.price * quantity,
        },
      });
      closeProductModal();
      toast.success("Order booked");
      getOrdersList();
      navigate("/consumer/orders");
    } catch (error: any) {
      toast.error(error.message);
    }
  };
  const activeEditMode = () => {
    setEdit(true);
  };
  const removeEditMode = () => {
    setEdit(false);
    setQuantity(
      productListType === ProductListType.Cart ? Number(product?.quantity) : 1
    );
  };
  const addQuantity = () => {
    if (quantity < 10) {
      setQuantity((quantity) => quantity + 1);
    }
  };
  const removeQuantity = () => {
    if (quantity > 1) {
      setQuantity((quantity) => quantity - 1);
    }
  };
  return (
    <Box>
      <Modal
        open={visibleProductModal}
        onClose={closeProductModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Card className="product-card">
            <Box className="product-card-image">
              <img
                src={
                  productListType === ProductListType.Product
                    ? product?.image
                    : product?.product?.image
                }
                alt="product"
              ></img>
            </Box>
            <Box className="product-card-content">
              <Typography gutterBottom variant="h5" component="div">
                {productListType === ProductListType.Product
                  ? product?.title
                  : product?.product?.title}
              </Typography>
              <Typography
                gutterBottom
                variant="body2"
                color="text.secondary"
                sx={{ textAlign: "justify" }}
              >
                {productListType === ProductListType.Product
                  ? product?.description
                  : product?.product?.description}
              </Typography>
              <Typography
                variant="body1"
                color="text.secondary"
                fontWeight={"700"}
                sx={{ textAlign: "justify" }}
              >
                {productListType === ProductListType.Product
                  ? product?.price
                  : product?.product?.price}{" "}
                ₹
              </Typography>
              {productListType === ProductListType.Cart ? (
                isEdit ? (
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      margin: "20px 0",
                    }}
                  >
                    <RemoveIcon onClick={removeQuantity} />
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ width: "30px", textAlign: "center" }}
                    >
                      {quantity}
                    </Typography>
                    <AddIcon onClick={addQuantity} />
                  </Box>
                ) : (
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ margin: "20px 0", fontWeight: "600" }}
                  >
                    Quantity: {quantity}
                  </Typography>
                )
              ) : (
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    margin: "20px 0",
                  }}
                >
                  <RemoveIcon onClick={removeQuantity} />
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ width: "30px", textAlign: "center" }}
                  >
                    {quantity}
                  </Typography>
                  <AddIcon onClick={addQuantity} />
                </Box>
              )}
              {productListType === ProductListType.Cart ? (
                isEdit ? (
                  <Box
                    sx={{
                      display: "flex",
                      flexWrap: "wrap",
                      justifyContent: {
                        xl: "flex-start",
                        md: "center",
                        sm: "center",
                        xs: "center",
                      },
                    }}
                  >
                    <CustomButton
                      type={"submit"}
                      name={"Save"}
                      backgroundColor={"#1976D0"}
                      hoverColor={"#1962E2"}
                      color={"#FFFFFF"}
                      margin={"5px 5px"}
                      onClick={() => updateCartProduct(product?._id)}
                    />
                    <CustomButton
                      type={"submit"}
                      name={"Cancel"}
                      backgroundColor={"#FF5555"}
                      hoverColor={"#FF3333"}
                      color={"#FFFFFF"}
                      margin={"5px 5px"}
                      onClick={removeEditMode}
                    />
                  </Box>
                ) : (
                  <Box
                    sx={{
                      display: "flex",
                      flexWrap: "wrap",
                      justifyContent: {
                        xl: "flex-start",
                        md: "center",
                        sm: "center",
                        xs: "center",
                      },
                    }}
                  >
                    <CustomButton
                      type={"submit"}
                      name={"Edit"}
                      backgroundColor={"#1976D0"}
                      hoverColor={"#1962E2"}
                      color={"#FFFFFF"}
                      margin={"5px 5px"}
                      onClick={activeEditMode}
                    />
                    <CustomButton
                      type={"submit"}
                      name={"Delete"}
                      backgroundColor={"#FF5555"}
                      hoverColor={"#FF3333"}
                      color={"#FFFFFF"}
                      margin={"5px 5px"}
                      onClick={() => deleteCartProduct(product?._id)}
                    />
                    <CustomButton
                      type={"submit"}
                      name={"Order now"}
                      backgroundColor={"#33C433"}
                      hoverColor={"#00B500"}
                      color={"#FFFFFF"}
                      margin={"5px 5px"}
                      onClick={orderNow}
                    />
                  </Box>
                )
              ) : productListType === ProductListType.Wishlist ? (
                <Box
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: {
                      xl: "flex-start",
                      md: "center",
                      sm: "center",
                      xs: "center",
                    },
                  }}
                >
                  <CustomButton
                    type={"submit"}
                    name={"Add to cart"}
                    backgroundColor={"#1976D0"}
                    hoverColor={"#1962E2"}
                    color={"#FFFFFF"}
                    margin={"5px 5px"}
                    onClick={addProductToCart}
                  />
                  <CustomButton
                    type={"submit"}
                    name={"Delete"}
                    backgroundColor={"#FF5555"}
                    hoverColor={"#FF3333"}
                    color={"#FFFFFF"}
                    margin={"5px 5px"}
                    onClick={() => deleteWishlistProduct(product?._id)}
                  />
                  <CustomButton
                    type={"submit"}
                    name={"Order now"}
                    backgroundColor={"#33C433"}
                    hoverColor={"#00B500"}
                    color={"#FFFFFF"}
                    margin={"5px 5px"}
                    onClick={orderNow}
                  />
                </Box>
              ) : (
                <Box
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: {
                      xl: "flex-start",
                      md: "center",
                      sm: "center",
                      xs: "center",
                    },
                  }}
                >
                  <CustomButton
                    type={"submit"}
                    name={"Add to cart"}
                    backgroundColor={"#1976D0"}
                    hoverColor={"#1962E2"}
                    color={"#FFFFFF"}
                    margin={"5px 5px"}
                    onClick={addProductToCart}
                  />
                  <CustomButton
                    type={"submit"}
                    name={"Add to wishlist"}
                    backgroundColor={"#FF7700"}
                    hoverColor={"#FF6600"}
                    color={"#FFFFFF"}
                    margin={"5px 5px"}
                    onClick={addProductToWishlist}
                  />
                  <CustomButton
                    type={"submit"}
                    name={"Order now"}
                    backgroundColor={"#33C433"}
                    hoverColor={"#00B500"}
                    color={"#FFFFFF"}
                    margin={"5px 5px"}
                    onClick={orderNow}
                  />
                </Box>
              )}
            </Box>
          </Card>
        </Box>
      </Modal>
    </Box>
  );
};

export default ProductModal;
