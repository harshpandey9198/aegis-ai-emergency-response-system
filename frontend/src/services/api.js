import axios from "axios";

const API = axios.create({
  baseURL: "https://aegis-ai-emergency-response-system-1.onrender.com",
});

export default API;