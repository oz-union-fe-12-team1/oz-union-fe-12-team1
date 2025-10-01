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
    // 이 부분 전체를 수정
    <div className="w-full h-full flex flex-col gap-4 justify-between py-4 px-2">
      {/* 상단 여백 */}
      <div className="flex-shrink-0"></div>

      {/* 시계 본체 - 부모 크기에 맞춰 줄어듦 */}
      <div className="flex-1 w-full flex items-center justify-center min-h-0">
        <div
          className="relative w-full h-full max-w-full max-h-full"
          style={{ aspectRatio: '1/1' }}
        >
          {/* 실제 시계 크기를 부모에 맞춤 */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-full h-full max-w-full max-h-full rounded-full">
              {/* 시침 */}
              <div
                className="w-[2.5%] h-[30%] absolute top-[50%] left-[50%] origin-bottom shadow-[0_0_15px_#000] transition-transform duration-1000 ease-linear z-30
                bg-gradient-to-b from-[#122a3f] via-[#1e4564] to-[#2d5b81]"
                style={{
                  transform: `translateX(-50%) translateY(-100%) rotate(${
                    hours * 30 + minutes * 0.5
                  }deg)`,
                }}
              />

              {/* 분침 */}
              <div
                className="w-[1.4%] h-[45%] absolute top-[50%] left-[50%] origin-bottom shadow-[0_0_15px_#000] transition-transform duration-1000 ease-linear z-30
                bg-gradient-to-b from-[#122a3f] via-[#1e4564] to-[#2d5b81]"
                style={{
                  transform: `translateX(-50%) translateY(-100%) rotate(${minutes * 6}deg)`,
                }}
              />

              {/* 초침 */}
              <div
                className="w-[1%] h-[38%] absolute top-[50%] left-[50%] origin-bottom shadow-[0_0_20px_#000] z-30
                bg-gradient-to-b from-[#122a3f] via-[#1e4564] to-[#2d5b81]"
                style={{
                  transform: `translateX(-50%) translateY(-100%) rotate(${secondAngle}deg)`,
                  transition: 'transform 1s linear',
                }}
              />

              {/* 중심점 */}
              <div className="bg-[#111] border-2 border-[#426784] w-[5%] aspect-[1/1] absolute top-[50%] left-[50%] rounded-full -translate-x-1/2 -translate-y-1/2 z-40"></div>
            </div>
          </div>
        </div>
      </div>

      {/* 디지털 시간 표시 */}
      <div
        className="flex-shrink-0 flex flex-col justify-center items-center gap-1 lg:gap-2 lg:flex-row text-center bg-gradient-to-r from-[#17334c] via-[#1e4564] to-[#234c6d] bg-clip-text text-transparent"
        style={{ textShadow: '0 0 15px black' }}
      >
        <span className="text-2xl lg:text-4xl xl:text-5xl font-semilight">
          {String(time.hour()).padStart(2, '0')}
        </span>
        <span className="hidden lg:block font-semibold relative bottom-1 text-[#234c6d] text-[1.5rem]">
          :
        </span>
        <span className="text-2xl lg:text-4xl xl:text-5xl font-semilight">
          {String(time.minute()).padStart(2, '0')}
        </span>
        <span className="hidden lg:block font-semibold relative bottom-1 text-[#234c6d] text-[1.5rem]">
          :
        </span>
        <span className="text-2xl lg:text-4xl xl:text-5xl font-semilight">
          {String(time.second()).padStart(2, '0')}
        </span>
      </div>
    </div>
  );
}
