import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from './client';

// 덩어리별 코드 순서(목차)
// 1. api 요청 함수
// 2. TanStack Query 훅
// 3. 구조분해할당으로 데이터 꺼내오는 법

const INQUIRIES = 'inquiries';
const ADMIN_INQUIRIES = 'adminInquiries';

// !- - - - 전체 문의 검색 - - - -
export async function getAllInquiries() {
  const res = await api.get('/inquiries');
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

// !- - - - 내 문의 목록 조회 (쿼리: status=pending 등) - - - -
export async function getInquiries(params) {
  const res = await api.get('/inquiries/me', { params });
  return res.data;
}
export function useInquiries(params) {
  const {
    data: inquiriesData,
    isLoading: inquiriesIsLoading,
    isError: inquiriesIsError,
    ...rest
  } = useQuery({
    queryKey: [INQUIRIES, params],
    queryFn: () => getInquiries(params),
    staleTime: 1000 * 60 * 5,
    // 문의 달았을 때 createInquiry에서 캐시 초기화가 발생하기 때문에 새로고침돼서 바로바로 잘 나타나고, 그렇기에 오래 캐싱할 필요도 없음.
  });
  return { inquiriesData, inquiriesIsLoading, inquiriesIsError, ...rest };
}
// const { inquiriesData, inquiriesIsLoading, inquiriesIsError } = useInquiries();   :   전체 조회
// const { inquiriesData, inquiriesIsLoading, inquiriesIsError } = useInquiries({ status: "pending" });   :    pending 상태인 문의만 보여줌.

// !- - - - 문의 등록 - - - -
export async function createInquiry(payload) {
  const res = await api.post('/inquiries', payload);
  return res.data;
}
export function useCreateInquiry() {
  const queryClient = useQueryClient();
  const {
    mutate: createInquiryMutate,
    error: createInquiryError,
    ...rest
  } = useMutation({
    mutationFn: createInquiry,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [INQUIRIES] });
    },
  });
  return { createInquiryMutate, createInquiryError, ...rest };
}
// const { createInquiryMutate, createInquiryError } = useCreateInquiry();
// createInquiryMutate({ "title": "문의 등록", "message": "문의 등록하겠습니다."})

// !- - - - 문의 상세 조회 - - - -
export async function getInquiryById(id) {
  const res = await api.get(`/inquiries/${id}`);
  return res.data;
}
export function useInquiry(id) {
  const {
    data: inquiryByIdData,
    isLoading: inquiryByIdIsLoading,
    isError: inquiryByIdIsError,
    ...rest
  } = useQuery({
    queryKey: [INQUIRIES, id],
    queryFn: () => getInquiryById(id),
    enabled: !!id,
  });
  return { inquiryByIdData, inquiryByIdIsLoading, inquiryByIdIsError, ...rest };
}
// const { inquiryByIdData, inquiriesIsLoading, inquiriesIsError } = useInquiry(3);

// !- - - - 문의 수정 (pending 상태일 때만 가능) - - - -
export async function updateInquiry(id, payload) {
  const res = await api.patch(`/inquiries/${id}`, payload);
  return res.data;
}
export function useUpdateInquiry() {
  const queryClient = useQueryClient();
  const {
    mutate: updateInquiryMutate,
    error: updateInquiryError,
    ...rest
  } = useMutation({
    mutationFn: ({ id, payload }) => updateInquiry(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [INQUIRIES] });
    },
  });
  return { updateInquiryMutate, updateInquiryError, ...rest };
}
// const { updateInquiryMutate, updateInquiryError } = useUpdateInquiry();
// updateInquiryMutate({ id: 3, payload: { "title": "문의 수정", "message": "문의 수정하겠습니다." }})

// !- - - - 문의 삭제 (pending 상태일 때만 가능) - - - -
export async function deleteInquiry(id) {
  const res = await api.delete(`/inquiries/${id}`);
  return res.data;
}
export function useDeleteInquiry() {
  const queryClient = useQueryClient();
  const {
    mutate: deleteInquiryMutate,
    error: deleteInquiryError,
    ...rest
  } = useMutation({
    mutationFn: deleteInquiry,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [INQUIRIES] });
    },
  });
  return { deleteInquiryMutate, deleteInquiryError, ...rest };
}
// const { deleteInquiryMutate, deleteInquiryError } = useDeleteInquiry();
// deleteInquiryMutate(id)

// ? 삭제 가능성 있음 - - - - 문의 상태 변경 - - - -
// export async function updateInquiryStatus(id, payload) {
//   const res = await api.patch(`/admin/inquiries/${id}/status`, payload);
//   return res.data;
// }
// export function useUpdateInquiry() {
//   const queryClient = useQueryClient();
//   const {
//     mutate: updateInquiryMutate,
//     error: updateInquiryError,
//     ...rest
//   } = useMutation({
//     mutationFn: ({ id, payload }) => updateInquiryStatus(id, payload),
//     //얘는 updateUser와 달리 id와 payload를 받으니, 넘겨줄 때도 객체 형태로 id와 payload를 모두 넘겨줘야 함.
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: [ADMIN_INQUIRIES] });
//     },
//   });
//   return { updateInquiryMutate, updateInquiryError, ...rest };
// }
// const { updateInquiryMutate, updateInquiryError } = useUpdateInquiry();
// updateInquiryMutate({
//   id: inquiryId,
//   payload: { status: "in_progress" },
// })

// ? 삭제 가능성 있음 - - - - 관리자 답변 등록 / 수정 - - - -
// export async function adminInquiriesReply(id, payload) {
//   const res = await api.post(`/admin/inquiries/${id}/reply`, payload);
//   return res.data;
// }
// export function useAdminInquiriesReply() {
//   const queryClient = useQueryClient();
//   const {
//     mutate: adminInquiriesReplyMutate,
//     error: adminInquiriesReplyError,
//     ...rest
//   } = useMutation({
//     mutationFn: ({ id, payload }) => adminInquiriesReply(id, payload),
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: [ADMIN_INQUIRIES] });
//     },
//   });
//   return { adminInquiriesReplyMutate, adminInquiriesReplyError, ...rest };
// }
// const { adminInquiriesMutate, adminInquiriesError } = useAdminInquiriesReply()
// adminInquiriesMutate({
//  "id": 3,
//  "payload": {
//      "admin_reply": "오류 수정"
//    }
//  })
