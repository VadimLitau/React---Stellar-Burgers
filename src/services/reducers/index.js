import { combineReducers } from 'redux';
import { ADD_ITEM, DELETE_ITEM, GET_API_ITEMS_SUCCESS } from '../actions/index.js'
import { burgerData } from '../../utils/Api.js';
import { baseUrl, checkResponse } from '../../utils/constants.js';

export const initialState = {
    burgerData: [],
    isLoading: false,
    hasError: false,
    testAdd: 'textAdd',
    testDelete: ' testDelete',
    count: 0,
    current: 'bun',

}


export const itemReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_ITEM:
            {
                console.log(state.testAdd);
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