import { useState } from 'react';
import { conversationsData } from '../api/dummyData/dummySummary';
// import { useQuery } from '@tanstack/react-query';

export default function ScheduleSummary() {
  // const { conversationsData, conversationsIsLoading, conversationsIsError } = useQuery();

  const [page, setPage] = useState(0);

  setTimeout(function () {
    page === 0 ? setPage(1) : setPage(0);
  }, 7000);

  return (
    <>
      <div className="w-full h-auto justify-center items-center border border-[#444] px-3 py-5 rounded-xl select-none break-keep text-light">
        {conversationsData.data.summary[page]}
      </div>
    </>
  );
}
