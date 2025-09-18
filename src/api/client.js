import axios from "axios";


// - - - - axios 인스턴스 생성 - - - -
export const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: { "Content-Type": "application/json" },
});


// - - - - 요청 인터셉터 - - - - 
// api명세서에서 Header가 Authorization인 거는 토큰을 필요로 함, 인터셉터로 토큰까지 넣어서 보내주기
api.interceptors.request.use((config) => {
  // 요청 전 단계에서 config가 들어오면 거기에 토큰을 실어서 return으로 돌려주면, 최종적으로 axios가 서버에 보냄. 
  const token = localStorage.getItem("access_token"); 
  // 로그인할 때 저장해둔 토큰
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    // 꺼내온 토큰을 자동으로 헤더에 붙여줌
    // api.get("/users/me") 이 코드가 실행되면 axios 내부적으로 아래 같은 config 객체를 만듦.
    // {
    //   method: "get",
    //   url: "/users/me",
    //   baseURL: "http://localhost:3000/api/v1",
    //   headers: {
    //     "Content-Type": "application/json"
    //   }
    // }
  }
  return config;
});



// - - - - - - - - - - - - - - - - - -
// GET 예시

// const { data, isLoadig, isError } = useNews();

// if(isLoadig) return <p>불러오는 중...</p>
// if(isError) return <p>에러 발생</p>
// - - - - - - - - - - - - - - - - - -




// - - - - - - - - - - - - - - - - - -
// POST 예시

// const mutation = useCreateTodo();

// const handleAdd = () =>  {
//   mutation.mutate({
//     title: "POST 예시",
//     description: "POST 예시 설명",
//   });
// }

// return (
//   <button onClick={handleAdd} disabled={mutation.isLoading}>
//     {mutation.isLoading ? "로딩 중..." : "추가 완료"}
//   </button>
// )
// - - - - - - - - - - - - - - - - - -




// - - - - - - - - - - - - - - - - - -
// PATCH, DELETE 예시
// const updateMutation = useUpdateTodo();
// const deleteMutation = useDeeleteTodo();

// const handleToggle = () => {
//   updateMutation.mutate({
//     id: todo.id,
//     payload: { is_completed: !todo.is_completed },
//   });
// };
// const handleDelete = () => {
//   deleteMutation.mutate(todo.id);
// };
// <button onClick={handleToggle}>
//   {todo.is_completed ? "되돌리기" : "완료" }
// </button>
// <button onClick={handleDelete}>
//   삭제
// </button>
// - - - - - - - - - - - - - - - - - -