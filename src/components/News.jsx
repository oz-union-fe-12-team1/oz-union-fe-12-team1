import { useState, useEffect } from 'react';
import dummyNews from '../api/NewsData';

export default function News() {
  const [newsData, setNewsData] = useState([]);
  const [page, setPage] = useState(0);

  const ITEMS_PER_PAGE = 5;

  useEffect(() => {
    setNewsData(dummyNews);
  }, []);

  const totalPages = Math.ceil(newsData.length / ITEMS_PER_PAGE);
  const startIndex = page * ITEMS_PER_PAGE;
  const currentItems = newsData.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handlePrev = () => {
    setPage((prev) => (prev === 0 ? totalPages - 1 : prev - 1));
  };

  const handleNext = () => {
    setPage((prev) => (prev === totalPages - 1 ? 0 : prev + 1));
  };

  return (
    <div className="flex flex-col h-full">
      <h2 className="text-lg font-bold mb-2 text-slate-800 underline">뉴스</h2>

      {newsData.length === 0 ? (
        <p className="text-sm text-slate-500">뉴스를 불러오는 중...</p>
      ) : (
        <ul className="flex-1 space-y-2 overflow-auto">
          {currentItems.map((news, idx) => (
            <li key={`${news.url}-${idx}`}>
              <a
                href={news.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-sm text-slate-800 hover:text-blue-600 hover:underline"
              >
                {news.headline}
              </a>
            </li>
          ))}
        </ul>
      )}

      {totalPages > 1 && (
        <div className="flex items-center justify-center mt-3 space-x-3">
          <button
            onClick={handlePrev}
            className="bg-slate-100 hover:bg-slate-200 w-7 h-7 rounded-full flex items-center justify-center text-slate-600"
          >
            &lt;
          </button>

          <div className="flex space-x-2">
            {Array.from({ length: totalPages }).map((_, idx) => (
              <div
                key={idx}
                className={`w-2.5 h-2.5 rounded-full ${
                  idx === page ? 'bg-blue-600' : 'bg-slate-400'
                }`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            className="bg-slate-100 hover:bg-slate-200 w-7 h-7 rounded-full flex items-center justify-center text-slate-600"
          >
            &gt;
          </button>
        </div>
      )}
    </div>
  );
}
