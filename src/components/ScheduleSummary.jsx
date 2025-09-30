import { useEffect, useState } from 'react';
import { conversationsData } from '../api/dummyData/dummySummary';
// import { useQuery } from '@tanstack/react-query';

export default function ScheduleSummary() {
  // const { conversationsData, conversationsIsLoading, conversationsIsError } = useQuery();

  const [page, setPage] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setPage((prev) => (prev === 0 ? 1 : 0));
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <div className="w-full h-auto justify-center items-center border border-[#444] px-3 py-5 rounded-xl select-none break-keep text-light">
        {conversationsData.data.summary[page]}
      </div>
    </>
  );
}
