const initialOrdersState = {
    orders: [],
  };
  
  export const orderReducer = (state = initialOrdersState, action: any) => {
    switch (action.type) {
      case "FETCH_ORDERS":
        return {
          ...state,
          orders: [...action.payload],
        };
      default:
        return state;
    }
  };
  