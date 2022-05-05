import { combineReducers } from 'redux';
import { OPEN_ORDER_MODAL, DELETE_ITEM, GET_API_ITEMS_SUCCESS, CLOSE_ORDER_MODAL, ADD_ITEM, ORDER_FAIL } from '../actions/index.js'
import { burgerData } from '../../utils/Api.js';
import { baseUrl, checkResponse } from '../../utils/constants.js';

export const initialState = {
    burgerData: [],
    burgerConstructorItems: [],
    bun: {},
    isLoading: false,
    hasError: false,
    current: 'bun',
    isOrder: false,
    setOrder: false,
    overlay: false,
    isLoading: false,
    hasError: false,
    orderPrice: [],
    orderId: []
}


export const itemReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_ITEM:
            {
                if (action.item.type === 'bun') {
                    if (action.item.count < 1) {
                        return {...state,
                            bun: action.item,
                            burgerData: [...state.burgerData].map((item) => {
                                if (item.type === 'bun' && item._id === action.item.id) {
                                    return {...item, count: ++item.count }
                                } else if (item.type === 'bun') {
                                    return {...item, count: 0 }
                                } else {
                                    return {...item }
                                }
                            })
                        }
                    }
                } else if (action.item.type != 'bun') {
                    return {
                        ...state,
                        burgerConstructorItems: [...state.burgerConstructorItems, action.item],
                        burgerData: [...state.burgerData].map((item) => {
                            if (item.type != 'bun' && item._id === action.item.id) {
                                return {...item, count: ++item.count }
                            } else {
                                return {...item }
                            }
                        })
                    }
                } else {
                    return {...state, bun: action.item }
                }
                return {
                    ...state,
                    burgerConstructorItems: [...state.burgerConstructorItems, action.item],
                }
            }
        case OPEN_ORDER_MODAL:
            {
                return {
                    ...state,
                    overlay: true
                }
            }
        case CLOSE_ORDER_MODAL:
            {
                return {
                    ...state,
                    overlay: false
                }
            }
        case ORDER_FAIL:
            {
                return {
                    ...state,
                    hasError: true,
                    isLoading: false
                }
            }
        case DELETE_ITEM:
            {
                const deletetElement = state.burgerConstructorItems.find(item =>
                    item.index === action.item.index
                )
                console.log(action.item.index);
                return {

                    ...state,
                    burgerData: [...state.burgerData].map(item => item._id === action.item.id ? {...item, count: --item.count } : item),
                    burgerConstructorItems: state.burgerConstructorItems.filter(item => item != deletetElement)
                }
            }
        case GET_API_ITEMS_SUCCESS:
            {
                return {
                    ...state,
                    burgerData: action.burgerData.map((item) => {
                        return {...item, count: 0 }
                    })
                }
            }
        default:
            {
                return state;
            }
    }
};




export const rootReducer = combineReducers({
    item: itemReducer,
})