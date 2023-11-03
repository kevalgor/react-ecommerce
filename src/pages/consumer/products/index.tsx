import { useEffect, ChangeEvent, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Typography } from "@mui/material";
import { toast } from "react-toastify";
import CustomCard from "../../../components/customCard";
import CustomTitle from "../../../components/customTitle";
import { fetchProducts } from "../../../redux/actions";
import CustomDropdown from "../../../components/customDropdown";
import CustomSearch from "../../../components/customSearch";
import { apiCall } from "../../../utils/api";

const Products = () => {
  const dispatch = useDispatch();
  const products = useSelector((state: any) => state.productReducer.products);
  const [searchedProducts, setSearchedProducts] = useState([]);

  const getProductList = useCallback(async () => {
    try {
      const result = await apiCall({
        reqMethod: "GET",
        endPoint: "/consumer/product",
      });
      dispatch(fetchProducts(result?.data));
    } catch (error: any) {
      toast.error(error.message);
    }
  }, [dispatch]);

  useEffect(() => {
    getProductList();
  }, [getProductList]);

  useEffect(() => {
    setSearchedProducts(products);
    console.log("second");
  }, [products]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const searchValue = event.target.value;
    const searchProducts = products.filter((product: any) => {
      return product?.title.includes(searchValue) === true;
    });
    setSearchedProducts(searchValue ? searchProducts : products);
  };

  return (
    <Box sx={{ margin: "90px auto", maxWidth: 1560 }}>
      <CustomTitle title="Products" />
      <div className="flex justify-between mx-10 flex-wrap">
        <CustomSearch onChange={handleChange} />
        <CustomDropdown />
      </div>
      {searchedProducts && searchedProducts.length ? (
        <Box className="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 place-items-center">
          {searchedProducts.map((product: any) => {
            return (
              <Box key={product?._id}>
                <CustomCard productListType={0} product={product} />
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

export default Products;
