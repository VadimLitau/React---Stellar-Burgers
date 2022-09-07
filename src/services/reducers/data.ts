import { combineReducers } from "redux";
//import { routeReducer } from "./route";
//import { wsReducer } from "./wsReducer";
import {
  OPEN_ORDER_MODAL,
  DELETE_ITEM,
  GET_API_ITEMS_SUCCESS,
  CLOSE_ORDER_MODAL,
  ADD_ITEM,
  GET_SERV_ORDER_REQUEST,
  GET_SERV_ORDER_SUCCESS,
  GET_SERV_ORDER_FAILED,
  CHANGE_ITEM,
} from "../constants/index";
import { IIngr, IAddElem } from "../types/data";
import { TIndexActions } from "../actions/index";

type TIndexInitialState = {
  burgerData: ReadonlyArray<IIngr>;
  burgerConstructorItems: ReadonlyArray<IAddElem>;
  bun: any;
  servOrder: null | number;
  isLoading: boolean;
  hasError: boolean;
  current: string;
  isOrder: boolean;
  setOrder: boolean;
  overlay: boolean;
  servOrderRequest: boolean;
  servOrderFailed: boolean;
};

export const initialState: TIndexInitialState = {
  burgerData: [],
  burgerConstructorItems: [],
  bun: {},
  servOrder: null,
  isLoading: false,
  hasError: false,
  current: "bun",
  isOrder: false,
  setOrder: false,
  overlay: false,
  servOrderRequest: false,
  servOrderFailed: false,
};

export const itemReducer = (
  state = initialState,
  action: TIndexActions
): TIndexInitialState => {
  switch (action.type) {
    case ADD_ITEM: {
      if (action.item.payload.type === "bun") {
        if (action.item.payload.count < 1) {
          return {
            ...state,
            bun: action.item.payload,
            burgerData: [...state.burgerData].map((item) => {
              if (item.type === "bun" && item._id === action.item.payload.id) {
                return { ...item, count: ++item.count + 1 };
              } else if (item.type === "bun") {
                return { ...item, count: 0 };
              } else {
                return { ...item };
              }
            }),
          };
        } else if (action.item.payload.count >= 1) {
          return { ...state };
        }
      } else if (action.item.payload.type != "bun") {
        console.log(action.item.payload.type);
        return {
          ...state,
          burgerConstructorItems: [
            ...state.burgerConstructorItems,
            action.item.payload,
          ],
          burgerData: [...state.burgerData].map((item) => {
            //console.log(action.item)
            if (item.type != "bun" && item._id === action.item.payload.id) {
              return { ...item, count: ++item.count };
            } else {
              return { ...item };
            }
          }),
        };
      } else {
        return { ...state, bun: action.item };
      }
      return {
        ...state,
        burgerConstructorItems: [
          ...state.burgerConstructorItems,
          action.item.payload,
        ],
      };
    }
    case OPEN_ORDER_MODAL: {
      return {
        ...state,
        overlay: true,
      };
    }
    case CLOSE_ORDER_MODAL: {
      return {
        ...state,
        overlay: false,
      };
    }

    case DELETE_ITEM: {
      const deletetElement = state.burgerConstructorItems.find(
        (item) => item.index === action.item.index
      );

      return {
        ...state,
        burgerData: [...state.burgerData].map((item) =>
          item._id === action.item.id ? { ...item, count: --item.count } : item
        ),
        burgerConstructorItems: state.burgerConstructorItems.filter(
          (item) => item != deletetElement
        ),
      };
    }
    case GET_API_ITEMS_SUCCESS: {
      return {
        ...state,
        burgerData: action.burgerData.map((item: any) => {
          return { ...item, count: 0 };
        }),
      };
    }
    case GET_SERV_ORDER_REQUEST: {
      return {
        ...state,
        servOrderRequest: true,
      };
    }
    case GET_SERV_ORDER_SUCCESS: {
      return {
        ...state,
        servOrderFailed: false,
        servOrder: action.servOrder,
        servOrderRequest: false,
        burgerConstructorItems: [],
        bun: {},
        burgerData: [...state.burgerData].map((item) => {
          return { ...item, count: 0 };
        }),
      };
    }
    case GET_SERV_ORDER_FAILED: {
      return { ...state, servOrderFailed: true, servOrderRequest: false };
    }
    case CHANGE_ITEM: {
      const newArray = [...state.burgerConstructorItems];
      newArray.splice(action.dragIndex, 1);
      newArray.splice(action.hoverIndex, 0, action.dragItem);
      return { ...state, burgerConstructorItems: newArray };
    }
    default: {
      return state;
    }
  }
};
