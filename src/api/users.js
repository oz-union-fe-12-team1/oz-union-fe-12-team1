import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: { "Content-Type": "application/json" },
});


export async function getMyProfile () {
  const res = await api.get("users/me");
  return res.data;
};

export async function updateProfile (payload) {
  const res = await api.put("/users/me", payload);
  return res.data;
}