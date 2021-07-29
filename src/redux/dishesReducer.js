import * as actionTypes from "./actionTypes";

export const Dishes = (
  state = {
    isLoading: true,
    err: null,
    dishes: [],
  },
  action
) => {
  switch (action.type) {
    case actionTypes.DISHES_LOADING:
      return {
        ...state,
        isLoading: true,
        err: null,
        dishes: [],
      };

    case actionTypes.DISHES_FAILED:
      return { ...state, isLoading: false, err: action.payload, dishes: [] };

    case actionTypes.ADD_DISHES:
      return {
        ...state,
        isLoading: false,
        err: null,
        dishes: action.payload,
      };

    default:
      return state;
  }
};
