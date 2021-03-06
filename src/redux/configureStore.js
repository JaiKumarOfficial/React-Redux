import { createStore, combineReducers, applyMiddleware } from "redux";
import { Dishes } from "./dishesReducer";
import { Promotions } from "./promotionsReducer";
import { Comments } from "./commentsReducer";
import { Leaders } from "./leadersReducer";
import thunk from "redux-thunk";
import logger from "redux-logger";
import { createForms } from "react-redux-form";
import { InitialFeedback } from "./forms";

export const ConfigureStore = () => {
  const store = createStore(
    combineReducers({
      dishes: Dishes,
      comments: Comments,
      promotions: Promotions,
      leaders: Leaders,
      ...createForms({
        feedback: InitialFeedback,
      }),
    }),
    applyMiddleware(thunk, logger)
  );
  return store;
};
