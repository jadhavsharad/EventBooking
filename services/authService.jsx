'use client'
import axios from 'axios'
const APIURL = "http://localhost:8000/api/auth/";

class authService {
    login = async (credentials) => {
        try {
            return axios
                .post(APIURL + "signin", credentials)
                .then(response => {
                    if (response.data.accessToken) {
                        localStorage.setItem("user", JSON.stringify(response.data));
                        return response.data
                    }
                    return null
                });
        } catch (error) {
            console.log(error)
        }

    }

    signup = async (userData) => {
        try {
            return axios
                .post(APIURL + "signup", userData)
                .then(response => {
                    const data = {
                        message: response.data.message,
                        statusCode: response.status
                    }
                    return data
                })
                .catch(err => {
                    const data = {
                        message: err.response.data.message,
                        statusCode: err.response.status
                    }
                    return data
                })
        }
        catch (error) {
            return error
        }
    }

    logout = () => {
        localStorage.removeItem("user");
    }

    getCurrentUser = () => {
        if (typeof window !== 'undefined'){
            return JSON.parse(localStorage.getItem('user'));
        }
    }

}

export default authService