const initialCartState = {
  cart: [],
};

export const cartReducer = (state = initialCartState, action: any) => {
  switch (action.type) {
    case "FETCH_CART":
      return {
        ...state,
        cart: [...action.payload],
      };
    default:
      return state;
  }
};
