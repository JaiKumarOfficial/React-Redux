import { createStore, combineReducers } from "redux";
import { Dishes } from "./dishesReducer";
import { Promotions } from "./promotionsReducer";
import { Comments } from "./commentsReducer";
import { Leaders } from "./leadersReducer";

export const ConfigureStore = () => {
  const store = createStore(
    combineReducers({
      dishes: Dishes,
      comments: Comments,
      promotions: Promotions,
      leaders: Leaders,
    })
  );
  return store;
};
