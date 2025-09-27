import { useState } from 'react';
import { dummyMorning, dummyEvening } from '../../api/dummyBriefings';

export default function Briefing() {
  const [mode, setMode] = useState('morning'); // morning | evening

  return (
    <div className="w-full">
      <div className="flex gap-2 mb-3 ">
        <button
          onClick={() => setMode('morning')}
          className={`transition-colors px-3 py-1 rounded-lg text-white ${mode === 'morning' ? 'bg-[#2d5b81] hover:bg-[#1b4567]' : 'bg-neutral-700 hover:bg-neutral-800'}`}
        >
          아침
        </button>
        <button
          onClick={() => setMode('evening')}
          className={`transition-colors px-3 py-1 rounded-lg  ${mode === 'evening' ? 'bg-[#2d5b81] hover:bg-[#1b4567]' : 'bg-neutral-700 hover:bg-neutral-800'}`}
        >
          저녁
        </button>
      </div>

      {mode === 'morning' ? (
        <p className=" whitespace-pre-line">{dummyMorning.summary}</p>
      ) : (
        <p className=" whitespace-pre-line">{dummyEvening.summary}</p>
      )}
    </div>
  );
}
