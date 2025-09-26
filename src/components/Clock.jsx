import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import { useEffect, useState } from 'react';

dayjs.locale('ko');

const Ani = ({ children }) => {
  const [isShown, setIsShown] = useState(false);

  useEffect(() => {
    setIsShown(true);
  }, []);

  return (
    <div
      className={`bg-neutral-800 rounded-[4px] p-5 transition-all duration-300 ease-out relative ${
        isShown ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
      }`}
    >
      {children}
    </div>
  );
};

export default function Clock() {
  const [time, setTime] = useState(dayjs());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(dayjs());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col justify-center items-center w-screen h-screen bg-neutral-900 text-neutral-100 p-10 gap-2 font-['HsFallThought20']">
      <div className="text-4xl">
        <Ani key={time.hour()}>{String(time.hour()).padStart(2, '0')}</Ani>
      </div>
      <div className="text-4xl">
        <Ani key={time.minute()}>
          {String(time.minute()).padStart(2, '0')}
          {/* <div className="text-xs absolute bottom-1 right-1">
            {String(time.second()).padStart(2, '0')}
          </div> */}
        </Ani>
      </div>
      <div className="text-base mt-1 text-gray-400">{time.format('YYYY. MM. DD (ddd)')}</div>
    </div>
  );
}
