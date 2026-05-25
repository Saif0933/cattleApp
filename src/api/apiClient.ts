import axios from "axios";

const apiClient = axios.create({
    baseURL: "http://192.168.1.6:4000/api/v1",
    headers: {
        "Content-Type": "application/json",
    },
})

export default apiClient