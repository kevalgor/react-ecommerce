export const login = (payload: any) => {
  return {
    type: "LOGIN",
    payload,
  }
}

export const fetchProducts = (payload: any) => {
  return {
    type: "FETCH_PRODUCTS",
    payload,
  };
};

export const fetchCart = (payload: any) => {
  return {
    type: "FETCH_CART",
    payload,
  };
};

export const fetchWishlist = (payload: any) => {
  return {
    type: "FETCH_WISHLIST",
    payload,
  };
};

export const fetchOrders = (payload: any) => {
  return {
    type: "FETCH_ORDERS",
    payload,
  };
};

