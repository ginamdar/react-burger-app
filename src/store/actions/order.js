import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const purchaseBurgerSuccess = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData
    };
};

export const purchaseBurgerFail = (error) => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAIL,
        error
    };
};

export const purchaseBurgerStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START
    };
};

export const purchaseBurger = (orderData, token) => {
    return dispatch => {
        dispatch(purchaseBurgerStart());
        axios.post(`/orders.json?auth=${token}`, orderData)
            .then((resp) => {
                // console.log(resp.data);
                dispatch(purchaseBurgerSuccess(resp.data.name, orderData));
            })
            .catch((err) => {
                console.log(err);
                dispatch(purchaseBurgerFail(err));
            });
    }
};

export const purchaseInit = () => {
    return{
        type: actionTypes.PURCHASE_INIT
    };
};

export const fetchOrdersSuccess = (orders) => {
    // console.log(`fetchOrdersSuccess orders: ${JSON.stringify(orders)}`);
    return{
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders
    };
};

export const fetchOrdersFailed = (error) => {
    return {
        type: actionTypes.FETCH_ORDERS_FAILED,
        error
    }
};

export const fetchOrdersStart = () => {
    return {
        type: actionTypes.FETCH_ORDERS_START,
    }
};

export const fetchOrders = (token, userId) => {
    return dispatch => {
        dispatch(fetchOrdersStart());
        const queryParams = `?auth=${token}&orderBy="userId"&equalTo="${userId}"`;
        axios.get(`/orders.json${queryParams}`)
            .then((resp) => {
                const fetchOrders = [];
                for (let key in resp.data) {
                    fetchOrders.push({
                        ...resp.data[key],
                        id: key
                    })
                }
                // console.log('fetchOrders', fetchOrders);
                dispatch(fetchOrdersSuccess(fetchOrders));
            }).catch((error) => {
                dispatch(fetchOrdersFailed(error));
            })
    }
};
