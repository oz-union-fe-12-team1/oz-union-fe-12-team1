import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import { useEffect, useState } from 'react';

dayjs.locale('ko');

export default function AnalogClock() {
  const [time, setTime] = useState(dayjs());
  const [secondAngle, setSecondAngle] = useState(time.second() * 6);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = dayjs();
      setTime(now);

      const targetAngle = now.second() * 6;

      setSecondAngle((prev) => {
        if (targetAngle < prev % 360) {
          return prev + 6;
        }
        return prev - (prev % 360) + targetAngle;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const hours = time.hour() % 12;
  const minutes = time.minute();

  return (
    <div className="clock-container w-full h-full flex flex-col gap-7 justify-between py-7">
      <div></div>
      <div className="w-full max-w-md aspect-[1/1] m-auto rounded-full relative z-20">
        {/* 시 */}
        <div
          className="bg-[#aaa] w-[2.5%] h-[30%] absolute top-[50%] left-[50%] origin-bottom rounded-full shadow-[0_0_15px_#000] transition-transform duration-1000 ease-linear z-30"
          style={{
            transform: `translateX(-50%) translateY(-100%) rotate(${
              hours * 30 + minutes * 0.5
            }deg)`,
          }}
        />
        {/* 분 */}
        <div
          className="bg-[#aaa] w-[1.4%] h-[45%] absolute top-[50%] left-[50%] origin-bottom rounded-full shadow-[0_0_15px_#000] transition-transform duration-1000 ease-linear z-30"
          style={{
            transform: `translateX(-50%) translateY(-100%) rotate(${minutes * 6}deg)`,
          }}
        />
        {/* 초 */}
        <div
          className="bg-[#aaa] w-[1%] h-[40%] absolute top-[50%] left-[50%] origin-bottom rounded-full shadow-[0_0_20px_#000] transition-transform duration-1000 ease-linear z-30"
          style={{
            transform: `translateX(-50%) translateY(-100%) rotate(${secondAngle}deg)`,
            transition: 'transform 1s linear',
          }}
        />
        {/* 중심점 */}
        <div className="bg-[#aaa] border-2 border-[#555] w-[5%] h-[5%] absolute top-[50%] left-[50%] rounded-full -translate-x-1/2 -translate-y-1/2 z-40"></div>
      </div>

      <div
        className="flex flex-col justify-center items-center lg:gap-2  text-[#aaa] text-3xl lg:text-5xl font-semilight lg:flex-row text-center"
        style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}
      >
        <span>{String(time.hour()).padStart(2, '0')}</span>
        <span className="hidden lg:block font-semibold text-center relative bottom-1">:</span>
        <span>{String(time.minute()).padStart(2, '0')}</span>
        <span className="hidden lg:block font-semibold text-center relative bottom-1">:</span>
        <span>{String(time.second()).padStart(2, '0')}</span>
      </div>
    </div>
  );
}
