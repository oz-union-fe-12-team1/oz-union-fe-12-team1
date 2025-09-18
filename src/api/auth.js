import { useMutation } from "@tanstack/react-query";
import { api } from "./client";


// - - - - 이메일/패스워드 회원가입 - - - -
export async function registerUser (payload) {
  // 사용자가 적은 이메일/패스워드를 payload 매개변수로 받아와서 보냄
  const res = await api.post("/auth/register", payload);
  return res.data;
}
export function useRegisterUser() {
  // 위에서 만든 registerUser를 호출하는 용도.
  return useMutation({ mutationFn: registerUser });
  // useMuatation: 서버에 데이터 보낼 때. (주로 POST, PUT, PATCH, DELETE 요청)
  // mutationFn: 실행할 함수
}


// - - - - 로그인(JWT 발급) - - - - 
export async function login (payload) {
  const res = await api.post("/auth/login", payload);
  // 로그인 정보 
  return res.data;
}
export function useLogin () {
  return useMutation ({ mutationFn: login });
}


// - - - - 구글 소셜 로그인 - - - -
export async function socialLogin (payload) {
  const res = await api.post("/auth/social", payload)
  return res.data;
}
export function useSocialLogin () {
  return useMutation ({ mutationFn: socialLogin });
}


// - - - - 토큰 리프레시로 액세스 재발급 (다시 불러오기) - - - -
export async function refreshToken (payload) {
  const res = await api.post("/auth/token/refresh", payload);
  return res.data;
}
export function useRefreshToken () {
  return useMutation ({ mutationFn: refreshToken });
}


// - - - - 로그아웃(현재 jti 블랙리스트 등록) - - - -
export async function logout () {
  const res = await api.post("/auth/logout");
  return res.data;
}
export function useLogout () {
  return useMutation ({ mutationFn: logout });
}


// - - - - 인증 메일 재발송 - - - - 
export async function resend () {
  const res = await api.post("/auth/email/resend");
  return res.data;
}
export function useResend () {
  return useMutation ({ mutationFn: resend });
}


// - - - - 이메일 인증 완료 - - - -
export async function verify (payload) {
  const res = await api.post("/auth/email/verify", payload);
  return res.data;
}
export function useVerify () {
  return useMutation ({ mutationFn: verify });
}


// - - - - 비밀번호 변경 - - - - 
export async function passwordChange (payload) {
  const res = await api.post("/auth/password/change", payload);
  return res.data;
}
export function usePasswordChange () {
  return useMutation ({ mutationFn: passwordChange });
}


// - - - - 비밀번호 초기화 메일 - - - - 
export async function passwordReset (payload) {
  const res = await api.post("/auth/password/reset-request", payload);
  return res.data;
}
export function usePasswordReset () {
  return useMutation ({ mutationFn: passwordReset });
}


// - - - - 새 비밀번호 설정(초기화 토큰으로 설정) - - - -
export async function confirmPasswordReset (payload) {
  const res = await api.post("/auth/password/reset-confirm", payload);
  return res.data;
}
export function useConfirmPasswordReset () {
  return useMutation ({ mutationFn: confirmPasswordReset });
}