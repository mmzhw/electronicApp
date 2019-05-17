import axios from 'axios';

let request = axios.create({
    method: 'post',
    baseURL: 'http://39.107.99.43:88',
    withCredentials: true,
    transformRequest: [(data) => {
        return JSON.stringify(data);
    }],
    headers: {
        'Access-Control-Allow-Origin': window.location.host,
        'Content-Type': 'application/json',
    }
});

request.interceptors.response.use((response) => {
    return response.data;
}, (error) => {
    console.log(error);
    return { msg: error.message };
});

export default request;
