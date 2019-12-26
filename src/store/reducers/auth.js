import * as actionTypes from '../actions/actionTypes'
import {updateObject} from '../utility';

const initialState = {
    token: null,
    userId: null,
    error: null,
    emailId: null,
    loading: false,
    authRedirectPath: '/'
};

const authLogout = (state, action) => {
    return updateObject(state, {token: null, userId: null, emailId: null})
};

const setAuthRedirectPath = (state, action) => {
    return updateObject(state, {authRedirectPath: action.path});
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START:
            return updateObject(state, {error: null, loading: true});
        case actionTypes.AUTH_SUCCESS:
            return updateObject(state, {token: action.token, userId: action.userId, emailId: action.emailId, loading: false, error: null});
        case actionTypes.AUTH_FAILED:
            return updateObject(state, {loading: false, error: action.error});
        case actionTypes.AUTH_LOGOUT:
            return authLogout(state, action);
        case actionTypes.SET_AUTH_REDIRECT_PATH:
            return setAuthRedirectPath(state, action);
        default:
            return state
    }
};

export default authReducer;
