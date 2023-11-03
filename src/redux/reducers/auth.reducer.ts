const initialAuthState = {
  user: {},
};

export const authReducer = (state = initialAuthState, action: any) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: { ...state.user, ...action.payload },
      };
    default:
      return state;
  }
};
