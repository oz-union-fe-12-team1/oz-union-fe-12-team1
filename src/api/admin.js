import { QueryClient, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "./client";


// - - - - 유저 목록 검색 - - - -
export async function getUsers (params) {
  const res = await api.get("/users", { params });
  // params: 쿼리스트링으로 url 뒤에 붙는 형태. (주로 GET 요청에서 사용)
  // getUsers ({ email: "abc@test.com", is_active; true }); 
  // 라는 요청을 보내면
  // GET /users?email=abc@test.com&is_active=true
  // 실제로 가는 요청은 이거임
  // - - - -
  // 반면 payload는 Request Body로 보내는 데이터. (보통 POST, PATCH, PUT 요청에서 사용함)
  // updateUser(5, { is_active: false, is_superuser: true });
  // 라는 요청을 보내면
  // PATCH /users/5
  // Content-Type: application/json

  // {
  //   "is_active": false,
  //   "is_superuser": true
  // }

  return res.data;
}
export function useUsers (params) {
  return useQuery ({
    queryKey: ["adminUsers", params],
    queryFn: () => getUsers(params),
    staleTime: 1000 * 60 * 5,
    // 유저 목록은 자주 바뀌지 않으니 짧게 캐싱해 두었음.
  });
}


// - - - - 특정 유저 수정 (관리자) - - - -
export async function updateUser(userId, payload) {
  const res = await api.patch(`/users/${userId}`, payload);
  return res.data;
}
export function useUpdateUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ userId, payload }) => updateUser(userId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adminUsers"] });
    },
  });
}


// - - - - 특정 유저 삭제 (관리자) - - - -
export async function deleteUser(userId) {
  const res = await api.delete(`/users/${userId}`);
  return res.data;
}
export function useDeleteUser () {
  const queryClient = useQueryClient();
  return useMutation ({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adminUsers"] });
    },
  });
}


// - - - - 전체 문의 검색 - - - -
export async function getAllInquiries () {
  const res = await api.get("/admin/inquiries");
  return res.data;
}
export function useAllInquiries() {
  return useQuery({
    queryKey: ["adminInquiries"],
    queryFn: getAllInquiries,
  });
}


// - - - - 문의 상태 변경 - - - -
export async function updateInquiryStatus (id, payload) {
  const res = await api.patch(`/admin/inquiries/${id}/status`, payload);
  return res.data;
}
export function useUpdateInquiry () {
  const queryClient = useQueryClient();
  return useMutation ({
    mutationFn: ({ id, payload }) => updateInquiryStatus(id, payload), 
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adminInquiries"] });
    },
  });
}

