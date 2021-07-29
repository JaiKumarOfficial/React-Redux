import * as actionTypes from "./actionTypes";

const BASE_URL = "http://localhost:3001/";

// action creator return action object
export const addComment = (dishId, rating, author, comment) => {
  return {
    type: actionTypes.ADD_COMMENT,
    payload: {
      dishId,
      rating,
      author,
      comment,
    },
  };
};

// dishes actions
export const dishesLoading = () => {
  return {
    type: actionTypes.DISHES_LOADING,
  };
};

export const dishesFailed = (err) => {
  return {
    type: actionTypes.DISHES_FAILED,
    payload: err,
  };
};

export const addDishes = (dishes) => {
  return {
    type: actionTypes.ADD_DISHES,
    payload: dishes,
  };
};

// COmment actions
export const renderComments = (comments) => {
  return {
    type: actionTypes.RENDER_COMMENTS,
    payload: comments,
  };
};

export const fetchCommentsFailed = (errMsg) => {
  return {
    type: actionTypes.FETCH_COMMENTS_FAILED,
    payload: errMsg,
  };
};

// Leaders actions
export const renderLeaders = (leaders) => {
  return {
    type: actionTypes.RENDER_LEADERS,
    payload: leaders,
  };
};

export const leadersLoading = () => {
  return {
    type: actionTypes.LEADERS_LOADING,
  };
};

export const fetchLeadersFailed = (errMsg) => {
  return {
    type: actionTypes.FETCH_LEADERS_FAILED,
    payload: errMsg,
  };
};

// Promotions actions
export const renderPromotions = (promotions) => {
  return {
    type: actionTypes.RENDER_PROMOTIONS,
    payload: promotions,
  };
};

export const promotionsLoading = () => {
  return {
    type: actionTypes.PROMOTIONS_LOADING,
  };
};

export const fetchPromotionsFailed = (errMsg) => {
  return {
    type: actionTypes.FETCH_PROMOTIONS_FAILED,
    payload: errMsg,
  };
};

// thunks - returning a function instead of action object
export const fetchDishes = () => async (dispatch) => {
  dispatch(dishesLoading(true));
  try {
    const response = await fetch(BASE_URL + "dishes");
    if (response.ok) {
      const data = await response.json();
      dispatch(addDishes(data));
    } else {
      throw new Error(response.status + response.statusText);
    }
  } catch (err) {
    dispatch(dishesFailed(err.message));
  }
};

export const fetchComments = () => async (dispatch) => {
  dispatch(dishesLoading(true));
  try {
    const response = await fetch(BASE_URL + "comments");
    if (response.ok) {
      const data = await response.json();
      dispatch(renderComments(data));
    } else {
      throw new Error(response.status + response.statusText);
    }
  } catch (err) {
    dispatch(fetchCommentsFailed(err.message));
  }
};

export const fetchPromotions = () => async (dispatch) => {
  dispatch(promotionsLoading(true));
  try {
    const response = await fetch(BASE_URL + "promotions");
    if (response.ok) {
      const data = await response.json();
      dispatch(renderPromotions(data));
    } else {
      throw new Error(response.status + response.statusText);
    }
  } catch (err) {
    dispatch(fetchPromotionsFailed(err.message));
  }
};

export const fetchLeaders = () => async (dispatch) => {
  dispatch(leadersLoading());
  try {
    const response = await fetch(BASE_URL + "leaders");
    if (response.ok) {
      const data = await response.json();
      dispatch(renderLeaders(data));
    } else {
      throw new Error(response.status + response.statusText);
    }
  } catch (err) {
    dispatch(fetchLeadersFailed(err.message));
  }
};
