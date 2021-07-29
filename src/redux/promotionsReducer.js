import * as actionTypes from "./actionTypes";

export const Promotions = (
  state = {
    isLoading: true,
    errMsg: null,
    promotions: [],
  },
  action
) => {
  switch (action.type) {
    case actionTypes.PROMOTIONS_LOADING:
      return {
        ...state,
        isLoading: true,
        errMsg: null,
        promotions: [],
      };

    case actionTypes.RENDER_PROMOTIONS:
      return {
        ...state,
        isLoading: false,
        errMsg: null,
        promotions: action.payload,
      };

    case actionTypes.FETCH_PROMOTIONS_FAILED:
      return {
        ...state,
        isLoading: false,
        errMsg: action.payload,
        promotions: [],
      };

    default:
      return state;
  }
};
