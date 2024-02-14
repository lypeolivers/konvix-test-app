import axios from "axios";

const api = axios.create({
  baseURL: process.env.URL_API + "/",

  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export default api;
