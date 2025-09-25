import dayjs from 'dayjs';
import { fiveDayWeatherDummy } from '../../api/dummyWeather';

export default function FiveDayWeather() {
  const data = fiveDayWeatherDummy;

  return (
    <div className="flex flex-col gap-4 h-full min-h-0">
      <h2 className="text-lg font-semibold text-white">5일 날씨</h2>

      <div className="flex-1 min-h-0 overflow-auto flex flex-col gap-6">
        <div className="flex justify-center gap-6">
          {data.slice(0, 2).map((d, i) => (
            <WeatherCard key={i} d={d} />
          ))}
        </div>

        <div className="flex justify-center gap-6">
          {data.slice(2, 5).map((d, i) => (
            <WeatherCard key={i + 2} d={d} />
          ))}
        </div>
      </div>
    </div>
  );
}

function WeatherCard({ d }) {
  return (
    <div className="w-40 rounded-xl bg-neutral-800/70 border border-neutral-700 px-3 py-5 flex flex-col items-center justify-center text-center">
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
  );
}
