import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    orders: [],
    purchased: false,
    loading: false
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.PURCHASE_BURGER_START:
            return updateObject(state, {loading: true});
        case actionTypes.PURCHASE_BURGER_SUCCESS:
            const newOrders = updateObject(action.orderData, {
                id: action.orderId,
                purchased: true
            });
            return updateObject(state,{
                orders: state.orders.concat(newOrders),
                purchased: true,
                loading: false
            });
        case actionTypes.PURCHASE_BURGER_FAIL:
            return updateObject(state, { loading: false});
        case actionTypes.PURCHASE_INIT:
            return updateObject(state, { purchased: false});
        case actionTypes.FETCH_ORDERS_START:
            return updateObject(state, { loading: true});
        case actionTypes.FETCH_ORDERS_SUCCESS:
            return updateObject(state, { orders: action.orders, loading: false});
        case actionTypes.FETCH_ORDERS_FAILED:
            return updateObject(state, { loading: false});
        default:
            return state;
    }
};

export default reducer;
