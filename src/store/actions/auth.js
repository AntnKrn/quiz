import axios from 'axios';
import { AUTH_SUCCESS, AUTH_LOGOUT } from './actionTypes';

export function auth(email, password, isLoggin) {
    return async dispatch => {
        const authData = {
            email,
            password,
            returnsecuretaken: true
        };      

        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCLzHvU2Fg3lpv7Zh3r0mzllKYTKRAZdVU'

        if(isLoggin ){
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCLzHvU2Fg3lpv7Zh3r0mzllKYTKRAZdVU'
        }
        const response = await axios.post(url, authData);
        const data = response.data;
        console.log(data)

        const expirationDate = new Date(new Date().getTime() + 86400 * 1000);

        localStorage.setItem('token', data.idToken)
        localStorage.setItem('userID', data.localId)
        localStorage.setItem('expirationDate', expirationDate)

        dispatch(authSuccess(data.idToken))
        dispatch(autoLogout(86400))

    }

}

export function autoLogout(time) {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout())
        }, time * 1000)
    }
}

export function logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('userID')
    localStorage.removeItem('expirationDate')
    return {
        type: AUTH_LOGOUT,
    }
}

export function authSuccess(token){
    return {
        type: AUTH_SUCCESS,
        token
    }
}