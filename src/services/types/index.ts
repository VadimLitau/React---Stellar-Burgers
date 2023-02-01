import { store } from "../store";
import { ThunkAction } from "redux-thunk";
import { Action, ActionCreator } from "redux";
import { TIndexActions } from "../actions/index";
import { TRouteActions } from "../actions/route";
import { TWsActions } from "../actions/wsActions";

type TApplicationActions = TIndexActions | TRouteActions | TWsActions;
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ActionCreator<
  ThunkAction<ReturnType, Action, RootState, TApplicationActions>
>;
