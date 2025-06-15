import axios from "axios";
const url = import.meta.env.VITE_BACKEND_URL;
console.log(url);
const api = axios.create({
    baseURL: url || "http://localhost:5001/api/v1",
    withCredentials: true,
});

export default api;
