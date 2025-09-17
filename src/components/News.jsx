import { useState } from 'react';

export default function News() {
  const newsData = [
    {
      id: 1,
      title: '1번 뉴스',
      url: 'https://news.naver.com/',
    },
    {
      id: 2,
      title: '2번 뉴스',
      url: 'https://news.naver.com/',
    },
    {
      id: 3,
      title: '3번 뉴스',
      url: 'https://news.naver.com/',
    },
    {
      id: 4,
      title: '4번 뉴스',
      url: 'https://news.naver.com/',
    },
    {
      id: 5,
      title: '5번 뉴스',
      url: 'https://news.naver.com/',
    },
    {
      id: 6,
      title: '6번 뉴스',
      url: 'https://news.naver.com/',
    },
    {
      id: 7,
      title: '7번 뉴스',
      url: 'https://news.naver.com/',
    },
    {
      id: 8,
      title: '8번 뉴스',
      url: 'https://news.naver.com/',
    },
    {
      id: 9,
      title: '9번 뉴스',
      url: 'https://news.naver.com/',
    },
    {
      id: 10,
      title: '10번 뉴스',
      url: 'https://news.naver.com/',
    },
  ];

  const itemsPerPage = 5;
  const totalPages = Math.ceil(newsData.length / itemsPerPage);
  const [page, setPage] = useState(0);

  const startIndex = page * itemsPerPage;
  const currentItems = newsData.slice(startIndex, startIndex + itemsPerPage);

  const handlePrev = () => {
    setPage((prev) => (prev === 0 ? totalPages - 1 : prev - 1));
  };

  const handleNext = () => {
    setPage((prev) => (prev === totalPages - 1 ? 0 : prev + 1));
  };

  return (
    <div className="w-full bg-orange-200 rounded-3xl p-6 relative">
      {/* 뉴스 제목 */}
      <h2 className="text-lg font-bold mb-4 text-center underline">뉴스</h2>

      {/* 뉴스 리스트 */}
      <ul className="space-y-2">
        {currentItems.map((news) => (
          <li key={news.id}>
            <a
              href={news.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-sm text-black hover:underline"
            >
              {news.title}
            </a>
          </li>
        ))}
      </ul>

      {/* 좌우 버튼 */}
      <button
        onClick={handlePrev}
        className="absolute left-4 bottom-4 bg-white w-8 h-8 rounded-full flex items-center justify-center shadow"
      >
        &lt;
      </button>
      <button
        onClick={handleNext}
        className="absolute right-4 bottom-4 bg-white w-8 h-8 rounded-full flex items-center justify-center shadow"
      >
        &gt;
      </button>

      {/* 페이지 점 */}
      <div className="flex justify-center mt-4">
        {Array.from({ length: totalPages }).map((_, idx) => (
          <div
            key={idx}
            className={`w-3 h-3 mx-1 rounded-full ${
              idx === page ? 'bg-black' : 'bg-gray-400'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
