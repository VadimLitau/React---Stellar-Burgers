import {
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE,
} from "../constants/wsActions";
export interface IWsConnectionSucces {
  readonly type: typeof WS_CONNECTION_SUCCESS;
}
export interface IWsConnectionError {
  readonly type: typeof WS_CONNECTION_ERROR;
}
export interface IWsConnectionClosed {
  readonly type: typeof WS_CONNECTION_CLOSED;
}
export interface IWsGetMessage {
  readonly type: typeof WS_GET_MESSAGE;
  readonly message: string;
}
export type TWsActions =
  | IWsConnectionSucces
  | IWsConnectionError
  | IWsConnectionClosed
  | IWsGetMessage;

export const WsConnectionSucces = (): IWsConnectionSucces => ({
  type: WS_CONNECTION_SUCCESS,
});
export const WsConnectionError = (): IWsConnectionError => ({
  type: WS_CONNECTION_ERROR,
});
export const WsConnectionClosed = (): IWsConnectionClosed => ({
  type: WS_CONNECTION_CLOSED,
});
export const WsGetMessage = (message: string): IWsGetMessage => ({
  type: WS_GET_MESSAGE,
  message,
});

export const wsConnectionSuccess = () => {
  return {
    type: WS_CONNECTION_SUCCESS,
  };
};

export const wsConnectionError = () => {
  return {
    type: WS_CONNECTION_ERROR,
  };
};

export const wsConnectionClosed = () => {
  return {
    type: WS_CONNECTION_CLOSED,
  };
};

export const wsGetMessage = (message: any) => {
  return {
    type: WS_GET_MESSAGE,
    payload: message,
  };
};
