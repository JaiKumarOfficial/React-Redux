// import { COMMENTS } from "../shared/comments";
import * as actionTypes from "../redux/actionTypes";

export const Comments = (
  state = {
    isLoading: true,
    errMsg: null,
    comments: [],
  },
  action
) => {
  switch (action.type) {
    case actionTypes.ADD_COMMENT:
      let comment = action.payload;
      comment.id = state.comments.length;
      comment.date = new Date().toISOString();
      return { ...state, comments: state.comments.concat(comment) };

    case actionTypes.RENDER_COMMENTS:
      return {
        ...state,
        isLoading: false,
        errMsg: null,
        comments: action.payload,
      };

    case actionTypes.COMMENTS_LOADING:
      return {
        ...state,
        isLoading: true,
        errMsg: null,
        comments: [],
      };

    case actionTypes.FETCH_COMMENTS_FAILED:
      return {
        ...state,
        isLoading: false,
        errMsg: action.payload,
        comments: [],
      };

    default:
      return state;
  }
};
