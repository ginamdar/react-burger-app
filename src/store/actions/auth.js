import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (idToken, localId, emailId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: idToken,
        userId: localId,
        emailId: emailId,
        error: null,
        loading: false
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAILED,
        error,
        loading: false
    };
};

export const logout = () => {
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('emailId');
    return {
        type: actionTypes.AUTH_LOGOUT
    }
};

export const checkAuthTimeout = (expirationDate) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationDate * 1000)
    }
};

export const auth = (email, password, isSignup) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email,
            password,
            returnSecureToken: true
        };
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB7-SI37U6Us_Oy65Csd3urn1JINVnTDJc';
        if (!isSignup) {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB7-SI37U6Us_Oy65Csd3urn1JINVnTDJc';
        }
        axios.post(url, authData)
            .then(resp =>{
                const expirationDate = new Date(new Date().getTime() + resp.data.expiresIn * 1000);
                localStorage.setItem('token', resp.data.idToken);
                localStorage.setItem('userId', resp.data.localId);
                localStorage.setItem('emailId', resp.data.email);
                localStorage.setItem('expirationDate', expirationDate);
                dispatch(authSuccess(resp.data.idToken, resp.data.localId));
                dispatch(checkAuthTimeout(resp.data.expiresIn))
            })
            .catch((err) => {
                // console.log(`Error: ${JSON.stringify(err.response)}`);
                dispatch(authFail(err.response.data.error.message));
            });
    };
};

export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path
    }
};

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(logout());
        }else {
            const expDate = new Date(localStorage.getItem('expirationDate'));
            if (expDate > new Date()) {
                const localId = localStorage.getItem('userId');
                const email = localStorage.getItem('emailId');
                dispatch(authSuccess(token, localId, email));
                dispatch(checkAuthTimeout((expDate.getTime() - new Date().getTime())/ 1000));
            }else {
                dispatch(logout());
            }
        }
    }
};
