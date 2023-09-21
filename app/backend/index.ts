import axios from "axios";

export async function loginWithEmailAndPassword(data: {
  email: string;
  password: string;
}) {
  const res = await axios.post(
    "/https://hi-exchange-api.onrender.com/auth/login/login",
    data
  );
  return res;
}
