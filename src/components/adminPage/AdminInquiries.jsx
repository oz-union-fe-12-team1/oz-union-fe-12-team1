import { useState } from 'react';
import { inquiryData } from '../../api/dummyData/dummyInquiries';

export function AdminInquiries() {
  // const { allInquiriesData, allInquiriesIsLoading, allInquiriesIsError } = useAllInquiries();
  // api 들어오면 inquiryData를 allInquiriesData로 변경하면 됨.

  const [allInquiriesIsLoading] = useState(false);
  const [allInquiriesIsError] = useState(false);
  const pendingData = inquiryData.items.filter((item) => item.status === 'pending');

  return (
    <>
      <div className="flex w-full h-full justify-between items-center">
        <span className="text-[1.1rem] font-bold m-1 items-start h-full">답변을 기다리는 문의</span>
        <div className="flex w-[9rem] h-[9rem] p-6 justify-center items-center bg-[#242424] rounded-[100%] aspect-[1/1]">
          {allInquiriesIsLoading ? (
            <div>로딩 중</div>
          ) : allInquiriesIsError ? (
            <div>오류 발생</div>
          ) : (
            <div>
              <span
                className={`relative bottom-2 font-semibold text-[3.5rem]
                ${
                  pendingData.length === 0
                    ? 'text-[#1b99f9]'
                    : inquiryData.total * 0.3 >= pendingData.length
                      ? 'text-[#10b610]'
                      : inquiryData.total * 0.6 >= pendingData.length
                        ? 'text-[#f80]'
                        : inquiryData.total * 0.6 < pendingData.length
                          ? 'text-[#d82121]'
                          : 'text-black'
                }  
                `}
              >
                {pendingData.length}
              </span>
              <span className="text-2xl"> / </span>
              <span className="relative top-2 text-[1.8rem]">{inquiryData.total}</span>
            </div>
          )}
        </div>
        <div></div>
      </div>
    </>
  );
}
