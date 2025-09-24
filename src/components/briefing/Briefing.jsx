import { useState } from 'react';
import { dummyMorning, dummyEvening } from '../../api/dummyBriefings';

export default function Briefing() {
  const [mode, setMode] = useState('morning'); // morning | evening

  return (
    <div className="w-full">
      <div className="flex gap-2 mb-3">
        <button
          onClick={() => setMode('morning')}
          className={`px-3 py-1 rounded text-white ${mode === 'morning' ? 'bg-blue-500' : 'bg-slate-400'}`}
        >
          아침
        </button>
        <button
          onClick={() => setMode('evening')}
          className={`px-3 py-1 rounded text-white ${mode === 'evening' ? 'bg-purple-500' : 'bg-slate-400'}`}
        >
          저녁
        </button>
      </div>

      {mode === 'morning' ? (
        <p className="text-slate-700 whitespace-pre-line">{dummyMorning.summary}</p>
      ) : (
        <p className="text-slate-700 whitespace-pre-line">{dummyEvening.summary}</p>
      )}
    </div>
  );
}
