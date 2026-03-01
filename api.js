import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5017", // backend-url
});

export default API;