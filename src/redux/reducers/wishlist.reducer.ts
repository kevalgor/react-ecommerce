const initialWishlistState = {
    wishlist: [],
  };
  
  export const wishlistReducer = (state = initialWishlistState, action: any) => {
    switch (action.type) {
      case "FETCH_WISHLIST":
        return {
          ...state,
          wishlist: [...action.payload],
        };
      default:
        return state;
    }
  };
  