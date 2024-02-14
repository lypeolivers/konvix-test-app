import axios from "axios";

const api = axios.create({
  //baseURL: process.env.URL_API + "/",
  baseURL: "http://localhost:3001/",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export default api;
