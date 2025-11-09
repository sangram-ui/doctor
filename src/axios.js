import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8000", // backend ka URL
});

export default API;
