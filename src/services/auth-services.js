import axios from "axios"
import localforage from "localforage"
import { API_URL } from "../config/main.config"
import authHeader from "./auth-header"

const currentUser = async (currAccToken) => {
    const currUser = await axios(API_URL + '/user', authHeader(currAccToken))
        .then((res) => {
            return res.data.data;
        })
        .catch((err) => {
            return err.response.data
        })
    return currUser
}

const login = async (data) => {
    const userAuth = await axios.post(API_URL + '/login', data)
        .then((res) => {
            localforage.setItem('userAuth', res.data.data)
            return res.data
        })
        .catch((err) => {
            data = (err && err.response && err.response.data)
            return data
        })
    return userAuth
}

const register = async (data) => {
    const newUser = await axios.post(API_URL + '/register', data)
        .then((res) => {
            localforage.setItem('userAuth', res.data.data)
            return res.data
        })
        .catch((err) => {
            data = (err && err.response && err.response.data)
            return data
        })
    return newUser
}


const logout = async (currAccToken) => {
    const userLogout = await axios.post(API_URL + '/logout', 
    [], authHeader(currAccToken))
        .then((res) => {
            return res.data.data;
        })
        .catch((err) => {
            return err.response.data
        })
    return userLogout
}


export const authService = {
    login,
    register,
    logout,
    currentUser
}