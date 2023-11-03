import { useState, useEffect } from "react";
import { Box, Card, CardMedia, CardContent, Typography } from "@mui/material";
import "./style.css";

import ProductModal from "../productModal";
import { ProductListType } from "../../utils/enum";

const CustomCard = ({ productListType, product }: any) => {
  const [visibleProductModal, setVisibleProductModal] = useState(false);
  const openProductModal = () => setVisibleProductModal(true);
  const closeProductModal = () => setVisibleProductModal(false);
  // useEffect(()=>{
  // console.log(product?._id);
  // },[product?._id])
  // console.log(product._id);
  return (
    <Box>
      <ProductModal
        visibleProductModal={visibleProductModal}
        closeProductModal={closeProductModal}
        product={product}
        productListType={productListType}
      />
      <Card
        key={product?._id}
        className="custom-card"
        onClick={openProductModal}
      >
        <CardMedia
          sx={{ height: 240, width: 240 }}
          image={
            productListType === ProductListType.Product
              ? product?.image
              : product?.product?.image
          }
        />
        <CardContent className="card-content">
          <Typography
            className="card-title text-center"
            variant="body1"
            sx={{ fontWeight: 600 }}
          >
            {productListType === ProductListType.Product
              ? product?.title
              : product?.product?.title}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default CustomCard;
