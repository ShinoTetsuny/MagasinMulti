import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000",
});
export async function register(data) {
  try {
    const resp = await api.post("/auth/register", {
      username: data.username,
      email: data.email,
      password: data.password,
    });
    return resp;
  } catch (error) {
    return error;
  }
}
