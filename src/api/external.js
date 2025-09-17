import { useQuery } from "@tanstack/react-query";
import api from "./apiClient";

// - - - - 뉴스 조회 - - - - 
export async function getNews() {
  const res = await api.get("/news");
  return res.data;
}
export function useNews() {
  return useQuery({
    queryKey: ["news"],
    queryFn: getNews,
  });
}



// - - - - 퀴즈 조회 - - - - 
export async function getQuiz() {
  const res = await api.get("/quiz");
  return res.data;
}
export function useQuiz() {
  return useQuery({
    queryKey: ["quiz"],
    queryFn: getQuiz,
  });
}

// - - - - 브리핑 조회 (morning/evening) - - - - 
export async function getBriefings() {
  const res = await api.get("/briefings");
  return res.data;
}
export function useBriefings() {
  return useQuery({
    queryKey: ["briefings"],
    queryFn: getBriefings,
  });
}

// - - - - 일정/할일 요약 대화 - - - - 
export async function getConversations(params = {}) {
  const res = await api.get("/conversations", { params });
  return res.data;
}
export function useConversations(params) {
  return useQuery({
    queryKey: ["conversations", params],
    queryFn: () => getConversations(params),
  });
}

// - - - - 운세 조회 - - - - 
export async function getFortune(params) {
  const res = await api.get("/fortune", { params });
  return res.data;
}
export function useFortune(params) {
  return useQuery({
    queryKey: ["fortune", params],
    queryFn: () => getFortune(params),
    enabled: !!params?.birthday, // 생일이 있을 때만 실행
  });
}

// - - - - 현재 날씨 조회 - - - - 
export async function getWeather() {
  const res = await api.get("/weather");
  return res.data;
}
export function useWeather() {
  return useQuery({
    queryKey: ["weather"],
    queryFn: getWeather,
  });
}

// - - - - 5일 날씨 예보 조회 - - - - 
export async function getWeatherForecast() {
  const res = await api.get("/weather/forecast");
  return res.data;
}
export function useWeatherForecast() {
  return useQuery({
    queryKey: ["weatherForecast"],
    queryFn: getWeatherForecast,
  });
}
