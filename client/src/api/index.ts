import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
});

// ERROR_TYPE (When i run the server in production mode)
export interface ResErrorsI {
  status: string;
  message?: string;
  errors?: string[];
}

export default api;
