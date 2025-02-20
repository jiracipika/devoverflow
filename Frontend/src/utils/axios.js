import axios from "axios"
const BASE_URL = "https://58ea-72-138-28-18.ngrok-free.app/api/"

export default axios.create({
    baseURL: BASE_URL
})
export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: {"Content-Type": "Application/json"},
    withCredentials: true
})