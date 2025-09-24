import { useState, useEffect } from 'react';
import dummyNews from '../api/dummyNews';

const CATEGORY_LABELS = {
  politics: '정치',
  economy: '경제',
  society: '사회',
  life: '사회/문화',
  it: 'IT/과학',
  world: '세계',
};

export default function News() {
  const [category, setCategory] = useState('life');
  const [newsData, setNewsData] = useState([]);
  const [page, setPage] = useState(0);

  const ITEMS_PER_PAGE = 6;

  useEffect(() => {
    setNewsData(dummyNews[category] || []);
    setPage(0);
  }, [category]);

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

      <div className="flex space-x-2 mb-3">
        {Object.keys(CATEGORY_LABELS).map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`px-2 py-1 rounded text-sm ${
              cat === category ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-700'
            }`}
          >
            {CATEGORY_LABELS[cat]}
          </button>
        ))}
      </div>

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
