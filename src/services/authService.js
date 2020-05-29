import httpService from "./httpService";
import { apiUrl } from "../config.json";
import JwtDecode from 'jwt-decode';

const apiEndpoint = apiUrl + "/auth";
const tokenKey = "token";

httpService.setJwt(getJwt());


export async function login(email, password) {
    const { data: jwt } = await httpService.post(apiEndpoint, {email, password});
    localStorage.setItem(tokenKey, jwt);
}

export function loginWithJwt(jwt) {
    localStorage.setItem(tokenKey, jwt);
}

export function logout() {
    localStorage.removeItem(tokenKey);
}

export function getCurrentUser() {
    try {
        const jwt = localStorage.getItem(tokenKey);
        return JwtDecode(jwt);
    } catch (error) {
        return null;
    }
}

export function getJwt() {
    return localStorage.getItem(tokenKey);
}

export default {
    login,
    logout,
    loginWithJwt,
    getCurrentUser,
    getJwt
};