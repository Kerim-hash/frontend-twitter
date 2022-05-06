import axios from 'axios'

const get_token = () => {
    return window.localStorage.getItem('token')
}

export const instance = axios.create({
    // baseURL: `https://backend-twitter.vercel.app`,
    // baseURL: `http://localhost:5000`,
    baseURL: `https://server-twitter-2020.herokuapp.com`,
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json; charset=UTF-8",
        token: `${get_token()}`,
    },
});
