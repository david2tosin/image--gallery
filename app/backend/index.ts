import axios from "axios";

const API_URL = "https://hi-exchange-api.onrender.com";

export const axios_server = axios.create({
  baseURL: API_URL,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "content-type": "application/json",
  },
});

export async function loginWithEmailAndPassword(data: {
  email: string;
  password: string;
}) {
  const res = await axios_server.post("/auth/login", data);
  return res.data;
}
