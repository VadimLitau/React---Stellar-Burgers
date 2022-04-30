import { combineReducers } from 'redux';
import { OPEN_ORDER_MODAL, DELETE_ITEM, GET_API_ITEMS_SUCCESS, CLOSE_ORDER_MODAL, ADD_ITEM, ORDER_FAIL } from '../actions/index.js'
import { burgerData } from '../../utils/Api.js';
import { baseUrl, checkResponse } from '../../utils/constants.js';

export const initialState = {
    burgerData: [],
    isLoading: false,
    hasError: false,
    count: 0,
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
                return {...state }
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
                console.log(state.testDelete);
            }
        case GET_API_ITEMS_SUCCESS:
            {
                return {
                    ...state,
                    burgerData: action.burgerData.map((item) => {
                        return {...item, count: 0 }
                    }),
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