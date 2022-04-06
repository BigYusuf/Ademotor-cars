import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "https://car-shop-ademoto.herokuapp.com/"
});