import { combineReducers } from "redux";
import { itemReducer } from "./data";
import { routeReducer } from "./route";
import { wsReducer } from "./wsReducer";

export const rootReducer = combineReducers({
  item: itemReducer,
  route: routeReducer,
  ws: wsReducer,
});
