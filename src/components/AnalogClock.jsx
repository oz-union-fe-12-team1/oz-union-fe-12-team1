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

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     const now = dayjs();
  //     setTime(now);
  //     setSecondAngle(now.second() * 6); // 매번 현재 초 기준
  //   }, 1000);

  //   return () => clearInterval(interval);
  // }, []);

  const hours = time.hour() % 12;
  const minutes = time.minute();

  return (
    <div className="clock-container w-full h-full flex flex-col gap-7 justify-between py-7">
      <div></div>
      <div className="w-full max-w-md aspect-[1/1] m-auto rounded-full relative z-20">
        {/* 시 */}
        <div
          className=" w-[2.5%] h-[30%] absolute top-[50%] left-[50%] origin-bottom shadow-[0_0_15px_#000] transition-transform duration-1000 ease-linear z-30
          bg-gradient-to-b from-[#122a3f] via-[#1e4564] to-[#2d5b81]"
          style={{
            transform: `translateX(-50%) translateY(-100%) rotate(${
              hours * 30 + minutes * 0.5
            }deg)`,
          }}
        />
        {/* 분 */}
        <div
          className=" w-[1.4%] h-[45%] absolute top-[50%] left-[50%] origin-bottom shadow-[0_0_15px_#000] transition-transform duration-1000 ease-linear z-30
          bg-gradient-to-b from-[#122a3f] via-[#1e4564] to-[#2d5b81]"
          style={{
            transform: `translateX(-50%) translateY(-100%) rotate(${minutes * 6}deg)`,
          }}
        />
        {/* 초 */}
        <div
          className=" w-[1%] h-[40%] absolute top-[50%] left-[50%] origin-bottom shadow-[0_0_20px_#000] transition-transform duration-1000 ease-linear z-30
          bg-gradient-to-b from-[#122a3f] via-[#1e4564] to-[#2d5b81]"
          style={{
            transform: `translateX(-50%) translateY(-100%) rotate(${secondAngle}deg)`,
            transition: 'transform 1s linear',
          }}
        />
        {/* 중심점 */}
        <div className="bg-[#111] border-2 border-[#ccc] w-[5%] h-[5%] absolute top-[50%] left-[50%] rounded-full -translate-x-1/2 -translate-y-1/2 z-40"></div>
      </div>

      <div
        className="flex flex-col justify-center items-center lg:gap-2 lg:flex-row text-center  bg-gradient-to-r from-[#17334c] via-[#1e4564] to-[#234c6d] bg-clip-text text-transparent"
        style={{ textShadow: '2px 2px 10px rgba(0,0,0,0.5)' }}
      >
        <span className="text-3xl lg:text-5xl font-semilight">
          {String(time.hour()).padStart(2, '0')}
        </span>
        <span className="hidden lg:block font-semibold relative bottom-1 text-[#555]">:</span>
        <span className="text-3xl lg:text-5xl font-semilight bg-gradient-to-b from-[#122a3f] via-[#1e4564] to-[#2d5b81] bg-clip-text text-transparent">
          {String(time.minute()).padStart(2, '0')}
        </span>
        <span className="hidden lg:block font-semibold relative bottom-1 text-[#555]">:</span>
        <span className="text-3xl lg:text-5xl font-semilight bg-gradient-to-b from-[#122a3f] via-[#1e4564] to-[#2d5b81] bg-clip-text text-transparent">
          {String(time.second()).padStart(2, '0')}
        </span>
      </div>
    </div>
  );
}
