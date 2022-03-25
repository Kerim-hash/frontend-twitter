import axios from 'axios'

const get_token = () => {
    return window.localStorage.getItem('token')
}

export const istance = axios.create({
    // baseURL: `https://twitter-2022.herokuapp.com`,
    baseURL: `http://localhost:5000`,
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json; charset=UTF-8",
        token: `${get_token()}`,
    },
});
