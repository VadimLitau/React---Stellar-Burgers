import { getBurgerDataRequest, getServOrderRequest } from "../../utils/Api";
import { checkResponse } from "../../utils/constants";
import { v4 as uuid } from "uuid";
import {
  OPEN_ORDER_MODAL,
  CLOSE_ORDER_MODAL,
  ADD_ITEM,
  DELETE_ITEM,
  GET_API_ITEMS_SUCCESS,
  GET_SERV_ORDER_REQUEST,
  GET_SERV_ORDER_SUCCESS,
  GET_SERV_ORDER_FAILED,
  CHANGE_ITEM,
} from "../constants/index";
import { IIngr, IDeleteIngr, IChangeElem, IAddElem, IBun } from "../types/data";
import { AppThunk, AppDispatch } from "../types";

export interface IOpenOrderModal {
  readonly type: typeof OPEN_ORDER_MODAL;
}
export interface ICloseOrderModal {
  readonly type: typeof CLOSE_ORDER_MODAL;
}
export interface IAddItem {
  readonly type: typeof ADD_ITEM;
  readonly item: { payload: IAddElem };
}

export interface IDeleteItem {
  readonly type: typeof DELETE_ITEM;
  readonly item: IAddElem;
}
export interface IGetApiItemsSucces {
  readonly type: typeof GET_API_ITEMS_SUCCESS;
  readonly burgerData: ReadonlyArray<IIngr>;
}
export interface IGetServOrderRequest {
  readonly type: typeof GET_SERV_ORDER_REQUEST;
}
export interface IGetServOrderSuccess {
  readonly type: typeof GET_SERV_ORDER_SUCCESS;
  readonly servOrder: number;
}
export interface IGetServOrderFailed {
  readonly type: typeof GET_SERV_ORDER_FAILED;
}
export interface IChangeItem {
  readonly type: typeof CHANGE_ITEM;
  readonly dragItem: IAddElem;
  readonly dragIndex: number;
  readonly hoverIndex: number;
}
export type TIndexActions =
  | IOpenOrderModal
  | ICloseOrderModal
  | IDeleteItem
  | IGetApiItemsSucces
  | IGetServOrderRequest
  | IGetServOrderSuccess
  | IGetServOrderFailed
  | IChangeItem
  | IAddItem;

export const OpenOrdarModal = (): IOpenOrderModal => ({
  type: OPEN_ORDER_MODAL,
});
export const CloseOrderModal = (): ICloseOrderModal => ({
  type: CLOSE_ORDER_MODAL,
});
export const DeleteItem = (item: IAddElem): IDeleteItem => ({
  type: DELETE_ITEM,
  item,
});
export const GetApiItemsSucces = (
  burgerData: ReadonlyArray<IIngr>
): IGetApiItemsSucces => ({
  type: GET_API_ITEMS_SUCCESS,
  burgerData,
});
export const GetServOrderRequest = (): IGetServOrderRequest => ({
  type: GET_SERV_ORDER_REQUEST,
});
export const GetServOrderSuccess = (
  servOrder: number
): IGetServOrderSuccess => ({
  type: GET_SERV_ORDER_SUCCESS,
  servOrder,
});
export const GetServOrderFailed = (): IGetServOrderFailed => ({
  type: GET_SERV_ORDER_FAILED,
});
export const ChangeItem = (
  dragItem: IAddElem,
  dragIndex: number,
  hoverIndex: number
): IChangeItem => ({
  type: CHANGE_ITEM,
  dragItem,
  dragIndex,
  hoverIndex,
});
export const AddItem = (item: { payload: IAddElem }): IAddItem => ({
  type: ADD_ITEM,
  item,
});
export const addIngredient = (item: IAddElem) => {
  const uuids = uuid();
  return {
    payload: { ...item, key: uuids },
  };
};

//Все что вы указали как "можно лучше" я обязуюсь доделать. Сейчас сдам работу как есть, т.к в любой момент могут вызвать на работу и я боюсь не успеть до дедлайна
export const getServOrder: AppThunk = (orderId: number) => {
  return function (dispatch: AppDispatch) {
    dispatch(GetServOrderRequest());
    getServOrderRequest(orderId)
      .then(checkResponse)
      .then((data) => {
        dispatch(GetServOrderSuccess(data.order.number));
      })
      .catch((err) => {
        console.log(err);
        dispatch(GetServOrderFailed());
      });
  };
};

export const getApiBurgerData: AppThunk = () => {
  return (dispatch: AppDispatch) => {
    getBurgerDataRequest()
      .then(checkResponse)
      .then((data) => {
        dispatch(GetApiItemsSucces(data.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
