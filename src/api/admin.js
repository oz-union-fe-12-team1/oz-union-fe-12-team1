import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from './client';
// 덩어리별 코드 순서(목차)
// 1. api 요청 함수
// 2. TanStack Query 훅
// 3. 구조분해할당으로 데이터 꺼내오는 법

const ADMIN_INQUIRIES = 'adminInquiries';
const ADMIN_USERS = 'adminUsers';
const USER_SEARCH = 'userSearch';

// !- - - - 유저 목록 검색(관리자용) - - - -
export async function getUsers() {
  const res = await api.get('/admin/users');
  return res.data;
}
export function useUsers() {
  const {
    data: usersData,
    isLoading: usersIsLoading,
    isError: usersIsError,
    ...rest
  } = useQuery({
    queryKey: [ADMIN_USERS],
    queryFn: () => getUsers(),
    staleTime: 1000 * 60 * 5,
    // 유저 목록은 자주 바뀌지 않으니 짧게 캐싱해 두었음.
  });
  return { usersData, usersIsLoading, usersIsError, ...rest };
}
// const  { usersData, usersIsLoading, usersIsError } = useUsers();   :   전체 목록

// const { usersData } = useUsers({ email: "search@example.com" });   :   이메일로 찾기
// --이렇게 params로 넘겨야 할 때는 객체 형태로 넘김.
// GET요청 시의 useQuery에서는 params를  api요청함수를 호출하는 TanStack Query 훅 자체에서 넘겨줌.
// 그 외 요청의 useMutation에서는 params를  생성된 mutate에서 넘겨줌.

// if (usersIsLoading) return <p>불러오는 중...</p>;

//! - - - - 특정 유저 조회 - - - -
export async function getUserSearch(search) {
  const res = await api.get(`/admin/users/${search}`);
  return res.data;
}
export function useUserSearch(search) {
  const {
    data: userSearchData,
    isLoading: userSearchIsLoading,
    isError: userSearchIsError,
    ...rest
  } = useQuery({
    queryKey: [USER_SEARCH, search],
    queryFn: () => getUserSearch(search),
    enabled: !!search,
  });
  return { userSearchData, userSearchIsLoading, userSearchIsError, ...rest };
}
//const {userSearchData, userSearchIsLoading, userSearchIsError } = userUserSearch(userId);

// !- - - - 유저 계정 차단 (관리자) - - - -
export async function updateUser({ user_Id, is_active }) {
  const res = await api.patch(`/admin/users/${user_Id}/status`, { params: { is_active } });
  return res.data;
}
export function useUpdateUser() {
  const queryClient = useQueryClient();
  const {
    mutate: updateUserMutate,
    error: updateUserError,
    ...rest
  } = useMutation({
    mutationFn: updateUser,
    // mutate에서 받은 인자를 그대로 updateUser에 전달함.
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [ADMIN_USERS] });
    },
  });
  return { updateUserMutate, updateUserError, ...rest };
}
// const { updateUserMutate, updateUserError, isSuccess } = useUpdateUser();
// -- 이런 식으로 지어준 별칭을 가져와서 쓰면 됨, 별칭짓지 않은 ...rest에 담겨 있던 것들도 가져와서 쓸 수 있음.

// <button onClick={() =>
//    updateUserMutate({ userId: 5, payload: { is_active: false } })}
// > 수정 </button>
// -- 이렇게 수정할 userId와 payload(내용)을 함수에 넣어서 실행시킴

// !- - - - 특정 유저 삭제 (관리자) - - - -
export async function deleteUser(user_Id) {
  const res = await api.delete(`/admin/users/${user_Id}`);
  //얘는 객체로 넘기지 않고 있음. 숫자로 넣어도 됨.
  return res.data;
}
export function useDeleteUser() {
  const queryClient = useQueryClient();
  const {
    mutate: deleteUserMutate,
    error: deleteUserError,
    ...rest
  } = useMutation({
    mutationFn: deleteUser,
    // mutationFn이 단일 인자를 받게 만들어졌으면, mutate도 단일 인자를 넘기면 됨.
    // deleteUser를 호출하면서 params로 id만 받음 => mutate로 넘겨서 받는 것도 id뿐.
    // 즉 객체로 쓰지 않고 숫자 id 자체를 넘기면 됨.
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [ADMIN_USERS] });
    },
  });
  return { deleteUserMutate, deleteUserError, ...rest };
}
// const { deleteUserMutate, deleteUserError } = useDeleteUser();
// <button onClick={() => deleteUserMutate(user.id)}>삭제</button>

// !- - - - 전체 문의 검색 - - - -
export async function getAllInquiries() {
  const res = await api.get('/admin/inquiries');
  return res.data;
}
export function useAllInquiries() {
  const {
    data: allInquiriesData,
    isLoading: allInquiriesIsLoading,
    isError: allInquiriesIsError,
    ...rest
  } = useQuery({
    queryKey: [ADMIN_INQUIRIES],
    queryFn: getAllInquiries,
  });
  return { allInquiriesData, allInquiriesIsLoading, allInquiriesIsError, ...rest };
}
//const { allInquiriesData, allInquiriesIsLoading, allInquiriesIsError } = useAllInquiries();

// !- - - - 문의 상태 변경 - - - -
export async function updateInquiryStatus(id, payload) {
  const res = await api.patch(`/admin/inquiries/${id}/status`, payload);
  return res.data;
}
export function useUpdateInquiry() {
  const queryClient = useQueryClient();
  const {
    mutate: updateInquiryMutate,
    error: updateInquiryError,
    ...rest
  } = useMutation({
    mutationFn: ({ id, payload }) => updateInquiryStatus(id, payload),
    //얘는 updateUser와 달리 id와 payload를 받으니, 넘겨줄 때도 객체 형태로 id와 payload를 모두 넘겨줘야 함.
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [ADMIN_INQUIRIES] });
    },
  });
  return { updateInquiryMutate, updateInquiryError, ...rest };
}
// const { updateInquiryMutate, updateInquiryError } = useUpdateInquiry();
// updateInquiryMutate({
//   id: inquiryId,
//   payload: { status: "in_progress" },
// })

// !- - - - 관리자 답변 등록 / 수정 - - - -
export async function adminInquiriesReply(id, payload) {
  const res = await api.post(`/admin/inquiries/${id}/reply`, payload);
  return res.data;
}
export function useAdminInquiriesReply() {
  const queryClient = useQueryClient();
  const {
    mutate: adminInquiriesReplyMutate,
    error: adminInquiriesReplyError,
    ...rest
  } = useMutation({
    mutationFn: ({ id, payload }) => adminInquiriesReply(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [ADMIN_INQUIRIES] });
    },
  });
  return { adminInquiriesReplyMutate, adminInquiriesReplyError, ...rest };
}
// const { adminInquiriesMutate, adminInquiriesError } = useAdminInquiriesReply()
// adminInquiriesMutate({
//  "id": 3,
//  "payload": {
//      "admin_reply": "오류 수정"
//    }
//  })
