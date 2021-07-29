import * as actionTypes from "./actionTypes";

export const Leaders = (
  state = {
    isLoading: true,
    errMsg: null,
    leaders: [],
  },
  action
) => {
  switch (action.type) {
    case actionTypes.LEADERS_LOADING:
      return {
        ...state,
        isLoading: true,
        errMsg: null,
        leaders: [],
      };

    case actionTypes.RENDER_LEADERS:
      return {
        ...state,
        isLoading: false,
        errMsg: null,
        leaders: action.payload,
      };

    case actionTypes.FETCH_LEADERS_FAILED:
      return {
        ...state,
        isLoading: false,
        errMsg: action.payload,
        leaders: [],
      };

    default:
      return state;
  }
};
