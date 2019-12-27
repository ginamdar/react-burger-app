import reducer from './auth';
import * as actionTypes from '../actions/actionTypes';

describe('auth reducer', function () {
    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual({
            token: null,
            userId: null,
            error: null,
            emailId: null,
            loading: false,
            authRedirectPath: '/'
        });
    });

    it('should store the token upon login', () => {
        expect(reducer({
                token: null, userId: null, error: null, emailId: null, loading: false, authRedirectPath: '/'},
            {
                type: actionTypes.AUTH_SUCCESS,
                token: 'some-token',
                userId: 'some-userId',
                emailId: 'some-emailId'
            })).toEqual({
            token: 'some-token',
            userId: 'some-userId',
            emailId: 'some-emailId',
            error: null,
            loading: false,
            authRedirectPath: '/'
        })
    });
});
