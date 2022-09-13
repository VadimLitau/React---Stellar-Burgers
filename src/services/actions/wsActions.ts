import {
  WS_CONNECTION_FINISH,
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE,
  WS_CONNECTION_START,
} from "../constants/wsActions";
interface IFeedItem {
  createAt: string;
  ingredients: string[];
  name: string;
  number: number;
  status: string;
  updateAt: string;
  _id: string;
  find: Function;
}
export interface IWsConnectionSucces {
  readonly type: typeof WS_CONNECTION_SUCCESS;
}
export interface IWsConnectionError {
  readonly type: typeof WS_CONNECTION_ERROR;
  readonly payload: any;
}
export interface IWsConnectionClosed {
  readonly type: typeof WS_CONNECTION_CLOSED;
}
export interface IWsGetMessage {
  readonly type: typeof WS_GET_MESSAGE;
  readonly payload: IFeedItem;
}
export interface IWsActions {
  wsInit: typeof WS_CONNECTION_START;
  wsFinish: typeof WS_CONNECTION_FINISH;
  onOpen: typeof wsConnectionSuccess;
  onClose: typeof wsConnectionClosed;
  onError: typeof wsConnectionError;
  onMessage: typeof wsGetMessage;
}
export type TWsActions =
  | IWsConnectionSucces
  | IWsConnectionError
  | IWsConnectionClosed
  | IWsGetMessage;

export const WsConnectionSucces = (): IWsConnectionSucces => ({
  type: WS_CONNECTION_SUCCESS,
});
export const WsConnectionError = (error: any): IWsConnectionError => ({
  type: WS_CONNECTION_ERROR,
  payload: error,
});
export const WsConnectionClosed = (): IWsConnectionClosed => ({
  type: WS_CONNECTION_CLOSED,
});
export const WsGetMessage = (message: any): IWsGetMessage => ({
  type: WS_GET_MESSAGE,
  payload: message,
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

export const wsGetMessage = (message: IFeedItem) => {
  return {
    type: WS_GET_MESSAGE,
    payload: message,
  };
};
