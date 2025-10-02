import { useQuery } from '@tanstack/react-query';
import { api } from './client';

// 덩어리별 코드 순서(목차)
// 1. api 요청 함수
// 2. TanStack Query 훅
// 3. 구조분해할당으로 데이터 꺼내오는 법

const NEWS = 'news';
const QUIZ = 'quiz';
const BRIEFINGS = 'briefings';
const CONVERSATIONS = 'conversations';
const FORTUNE = 'fortune';
const WEATHER = 'weather';

// !- - - - 카테고리별 최신 뉴스 헤드라인 및 링크 가져오기 - - - -
export async function getNews(category) {
  const res = await api.get('/news', { params: { category } });
  return res.data;
}
export function useNews(category) {
  const {
    data: newsData,
    isLoading: newsIsLoading,
    isError: newsIsError,
    error: newsError,
    ...rest
  } = useQuery({
    queryKey: [NEWS, category],
    queryFn: () => getNews(category),
    staleTime: 1000 * 60 * 5,
    //5분 동안은 캐시가 살아있어서, news를 재호출했을 때 캐시를 불러옴.
  });
  return { newsData, newsIsLoading, newsIsError, newsError, ...rest };
}
// const { newsData, newsIsLoading, newsIsError } = useNews("politics");

// !- - - - 퀴즈 - - - -
export async function getQuiz() {
  const res = await api.get('/quiz/');
  return res.data;
}
export function useQuiz() {
  const {
    data: quizData,
    isLoading: quizIsLoading,
    isError: quizIsError,
    refetch,
    ...rest
  } = useQuery({
    queryKey: [QUIZ],
    queryFn: getQuiz,
    //얘는 매번 랜덤으로 새로 문제 뽑아오게 staleTime: 0 기본값으로 두었음.
  });
  return { quizData, quizIsLoading, quizIsError, refetch, ...rest };
}
// const { quizData, quizIsLoading, quizIsError } = useQuiz();

// !- - - - 브리핑 조회 (morning/evening) - - - -
export async function getBriefings() {
  const res = await api.get('/gemini/briefings');
  return res.data;
}
export function useBriefings() {
  const {
    data: briefingsData,
    isLoading: briefingsIsLoading,
    isError: briefingsIsError,
    ...rest
  } = useQuery({
    queryKey: [BRIEFINGS],
    queryFn: getBriefings,
    staleTime: 1000 * 60 * 5,
    // 브리핑은 아침/저녁에만 바뀌니까 실시간 반영 필요 없음.
  });
  return { briefingsData, briefingsIsLoading, briefingsIsError, ...rest };
}
// const { briefingsData, briefingsIsLoading, briefingsIsError } = useBriefings();

// !- - - - 일정/할일 요약 대화 - - - -
export async function getConversations() {
  const res = await api.get('/gemini/conversations');
  return res.data;
}
export function useConversations() {
  const {
    data: conversationsData,
    isLoading: conversationsIsLoading,
    isError: conversationsIsError,
    ...rest
  } = useQuery({
    queryKey: [CONVERSATIONS],
    queryFn: getConversations,
  });
  return { conversationsData, conversationsIsLoading, conversationsIsError, ...rest };
}
// const { conversationsData, conversationsIsLoading, conversationsIsError } = useConversations();

// !- - - - 오늘의 운세 (생일 필요) - - - -
export async function getFortune(birthdate) {
  const res = await api.get('/gemini/fortune', { params: { birthdate } });
  return res.data;
}
export function useFortune(birthdate) {
  return useQuery({
    queryKey: [FORTUNE, birthdate],
    queryFn: () => (birthdate ? getFortune(birthdate) : Promise.resolve(null)),
    enabled: !!birthdate,
    staleTime: 1000 * 60 * 60 * 12,
  });
}

// !- - - - 현재 날씨 조회 (lat/lon 추가) - - - -
export async function getTodayWeather(lat, lon) {
  const res = await api.get('/weather', { params: { lat, lon } });
  return res.data;
}
export function useTodayWeather(location) {
  return useQuery({
    queryKey: [WEATHER, 'today', location?.lat, location?.lon],
    queryFn: () => (location ? getTodayWeather(location.lat, location.lon) : Promise.resolve(null)),
    enabled: !!location,
    staleTime: 1000 * 60 * 5,
  });
}

// !- - - - 5일 날씨 예보 조회 (lat/lon 추가) - - - -
export async function getFiveDayWeather(lat, lon) {
  const res = await api.get('/weather/forecast', { params: { lat, lon } });
  return res.data;
}
export function useFiveDayWeather(location) {
  return useQuery({
    queryKey: [WEATHER, 'five', location?.lat, location?.lon],
    queryFn: () => (location ? getFiveDayWeather(location.lat, location.lon) : Promise.resolve([])),
    enabled: !!location,
    staleTime: 1000 * 60 * 30,
  });
}
// const { weatherData, weatherIsLoading, weatherIsError } = useWeather();

//? 삭제 가능성 있음- - - - 5일 날씨 예보 조회 - - - -
// export async function getWeatherForecast() {
//   const res = await api.get('/weather/forecast');
//   return res.data;
// }
// export function useWeatherForecast() {
//   const {
//     data: weatherForecastData,
//     isLoading: weatherForecastIsLoading,
//     isError: weatherForecastIsError,
//     ...rest
//   } = useQuery({
//     queryKey: ['weatherForecast'],
//     queryFn: getWeatherForecast,
//     staleTime: 1000 * 60 * 30,
//   });
//   return { weatherForecastData, weatherForecastIsLoading, weatherForecastIsError, ...rest };
// }
// const { weatherForecastData, weatherForecastIsLoading, weatherForecastIsError } = useWeather();
