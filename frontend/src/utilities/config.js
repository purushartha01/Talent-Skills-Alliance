import axios from "axios";

export const serverAxiosInstance = axios.create({
    baseURL: "http://localhost:3000/api/v1",
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
    timeout: 10000,
    withCredentials: true,
});