import { useMutation } from "@tanstack/react-query";
import { api } from "./client";

// - - - - 이메일/패스워드 회원가입 - - - -
export async function registerUser (payload) {
  const res = await api.post("/auth/register", payload);
  return res.data;
}

export function useRegisterUser() {
  return useMutation({ mutationFn: registerUser });
}

// - - - - 로그인 - - - - 
export async function login (payload) {
  const res = await api.post("/auth/login", payload);
  return res.data;
}

export function useLogin () {
  return useMutation ({ mutationFn: login });
}


// - - - - 토큰 리프레시 (다시 불러오기) - - - -
export async function refreshToken (payload) {
  const res = await api.post("/auth/token/refresh", payload);
  return res.data;
}
export function useRefreshToken () {
  return useMutation ({ mutationFn: refreshToken });
}