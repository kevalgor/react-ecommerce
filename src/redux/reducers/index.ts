import { combineReducers } from "@reduxjs/toolkit";
import { authReducer } from "./auth.reducer";
import { productReducer } from "./product.reducer";
import { cartReducer } from "./cart.reducer";
import { wishlistReducer } from "./wishlist.reducer";
import { orderReducer } from "./order.reducer";

export const rootReducer = combineReducers({
  authReducer,
  productReducer,
  cartReducer,
  wishlistReducer,
  orderReducer,
});
