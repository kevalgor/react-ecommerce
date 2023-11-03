const initialProductState = {
  products: [],
};

// NOTE:
// It is important to pass an initial state as default to
// the state parameter to handle the case of calling
// the reducers for the first time when the
// state might be undefined

export const productReducer = (state = initialProductState, action: any) => {
  switch (action.type) {
    case "FETCH_PRODUCTS":
      return {
        ...state,
        products: [...action.payload],
      };
    default:
      return state;
  } // Important to handle the default behavior
};
