import dayjs from 'dayjs';
import { fiveDayWeatherDummy } from '../../api/dummyWeather';

export default function FiveDayWeather() {
  const data = fiveDayWeatherDummy;

  return (
    <section className="h-full rounded-2xl border border-neutral-800 bg-neutral-900 text-neutral-100 overflow-hidden">
      <div className="h-full flex flex-col items-center justify-center gap-8 rounded-xl border border-neutral-800/60 bg-black/30 p-6">
        <div className="flex justify-center gap-6">
          {data.slice(0, 2).map((d, i) => (
            <div
              key={i}
              className="w-44 rounded-xl bg-neutral-800/70 border border-neutral-700 px-4 py-6 flex flex-col items-center justify-center text-center"
            >
              <div className="text-sm font-semibold text-neutral-200 mb-2">
                {dayjs(d.date).format('MM/DD (ddd)')}
              </div>
              <div className="text-base text-white mb-2">{d.description}</div>
              <div className="text-sm font-medium mb-2">
                <span className="text-red-400 font-bold">최고 {d.temp_max}°</span> /{' '}
                <span className="text-blue-400 font-bold">최저 {d.temp_min}°</span>
              </div>
              <div className="flex flex-col items-center text-base text-neutral-400">
                <span>습도 {d.humidity}%</span>
                <span>강수 {d.precipitation}mm</span>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center gap-6">
          {data.slice(2).map((d, i) => (
            <div
              key={i + 2}
              className="w-44 rounded-xl bg-neutral-800/70 border border-neutral-700 px-4 py-6 flex flex-col items-center justify-center text-center"
            >
              <div className="text-sm font-semibold text-neutral-200 mb-2">
                {dayjs(d.date).format('MM/DD (ddd)')}
              </div>
              <div className="text-base text-white mb-2">{d.description}</div>
              <div className="text-sm font-medium mb-2">
                <span className="text-red-400 font-bold">최고 {d.temp_max}°</span> /{' '}
                <span className="text-blue-400 font-bold">최저 {d.temp_min}°</span>
              </div>
              <div className="flex flex-col items-center text-base text-neutral-400">
                <span>습도 {d.humidity}%</span>
                <span>강수 {d.precipitation}mm</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
