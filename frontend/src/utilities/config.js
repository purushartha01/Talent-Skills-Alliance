import axios from "axios";
import { toast } from "sonner";


const serverAxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL || "http://localhost:3000/api/v1",
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
    timeout: 10000,
    withCredentials: true,
});

serverAxiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        console.error("Error in response interceptor:", error);
        if (error.response) {
            if (error.response.status === 401) {
                if (error.response.data.error === "Token expired!") {
                    toast.error("Session expired, please login again..", {
                        description: error.response.data.message || "An unexpected error occurred.",
                        duration: 3000,
                    });
                    localStorage.removeItem("TSAUser")
                    window.location.href = "/login";
                }

            }
        }
        return Promise.reject(error);
    }
);

export { serverAxiosInstance };