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

  useEffect(() => {
    const allNews = dummyNews[category] || [];

    const shuffled = [...allNews].sort(() => Math.random() - 0.5);
    const limited = shuffled.slice(0, 6);

    setNewsData(limited);
  }, [category]);

  return (
    <section className="h-full rounded-2xl border border-neutral-800 bg-neutral-900 text-neutral-100 overflow-hidden">
      <div className="h-full flex flex-col p-4 gap-4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold text-white">뉴스</h2>
          <div className="flex gap-2">
            {Object.keys(CATEGORY_LABELS).map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                  cat === category
                    ? 'bg-blue-600 text-white'
                    : 'bg-neutral-700 text-neutral-300 hover:bg-neutral-600'
                }`}
              >
                {CATEGORY_LABELS[cat]}
              </button>
            ))}
          </div>
        </div>

        {newsData.length === 0 ? (
          <p className="text-sm text-neutral-400">뉴스를 불러오는 중...</p>
        ) : (
          <ul className="flex-1 space-y-2 overflow-auto">
            {newsData.map((news, idx) => (
              <li
                key={`${news.url}-${idx}`}
                className="rounded-lg bg-neutral-800/60 px-3 py-2 hover:bg-neutral-700 transition-colors"
              >
                <a
                  href={news.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-sm text-neutral-100 hover:text-blue-400"
                >
                  {news.headline}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
