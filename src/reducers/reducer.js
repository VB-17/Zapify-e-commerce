export const initialState = {
  user: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_USER":
      console.log(action);
      return {
        ...state,
        user: action.user,
      };

    case "REMOVE_USER":
      return {
        ...state,
        user: null,
      };

    case "ADD_TO_CART":
      return { ...state };

    default:
      return state;
  }
};

export default reducer;
