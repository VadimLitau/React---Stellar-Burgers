import { getBurgerDataRequest } from "../../utils/Api";
export const ADD_ITEM = 'ADD_ITEM';
export const DELETE_ITEM = 'DELETE_ITEM';

export const GET_API_ITEMS_SUCCESS = 'GET_API_ITEMS_SUCCES';
export const GET_API_ITEMS_REQUEST = 'GET_API_ITEMS_REQUEST';
export const GET_API_ITEMS_FAILED = 'GET_API_ITEMS_FAILED';

export function getApiBurgerData() {
    return function(dispatch) {
        dispatch({
            type: GET_API_ITEMS_REQUEST
        });
        getBurgerDataRequest().then((res) => {
                if (res.ok) {
                    return res.json()
                }
                return Promise.reject(res.status)
            })
            .then((data) => {
                dispatch({
                    type: GET_API_ITEMS_SUCCESS,
                    burgerData: data.data
                });
            })
            .catch((err) => {
                dispatch({
                    type: GET_API_ITEMS_FAILED
                });
            })
    };
}