import {
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE,
} from "../constants/wsActions";

import { TWsActions } from "../actions/wsActions";

type TWsInitialState = {
  wsConnected: boolean;
  wsError: undefined | string;
  messages: any;
};

const initialState: TWsInitialState = {
  wsConnected: false,
  wsError: undefined,
  messages: [],
};

export const wsReducer = (
  state = initialState,
  action: TWsActions
): TWsInitialState => {
  switch (action.type) {
    case WS_CONNECTION_SUCCESS:
      return {
        ...state,
        wsConnected: true,
        wsError: undefined,
      };

    case WS_CONNECTION_ERROR:
      return {
        ...state,
        wsError: action.payload,
        wsConnected: false,
      };

    case WS_CONNECTION_CLOSED:
      return {
        ...state,
        wsError: undefined,
        wsConnected: false,
      };

    case WS_GET_MESSAGE:
      return {
        ...state,
        messages: state.messages.length
          ? [
              ...state.messages,
              { ...action.payload, timestamp: new Date().getTime() / 1000 },
            ]
          : [{ ...action.payload, timestamp: new Date().getTime() / 1000 }],
      };

    default:
      return state;
  }
};
