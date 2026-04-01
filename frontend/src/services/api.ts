import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5009/api",
  withCredentials: true, // needed for cookies
});

export default API;