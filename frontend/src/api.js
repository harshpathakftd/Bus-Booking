import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:5000/api"
});

export const withAuth = (token) => ({
  headers: { Authorization: `Bearer ${token}` }
});
