import { fiveDayWeatherDummy } from '../../api/weather';
import dayjs from 'dayjs';

export default function FiveDayWeather() {
  return (
    <div>
      <div className="grid grid-cols-5 gap-4">
        {fiveDayWeatherDummy.map((d, i) => (
          <div
            key={i}
            className="rounded-lg border border-slate-200 bg-white p-4 shadow flex flex-col items-center text-center"
          >
            <div className="text-sm font-semibold text-slate-700">
              {dayjs(d.date).format('MM/DD (ddd)')}
            </div>
            <div className="text-base">{d.description}</div>
            <div className="text-sm text-slate-600">
              {d.temp_min}°C ~ {d.temp_max}°C
            </div>
            <div className="text-xs text-slate-500">
              습도 {d.humidity}%, 강수 {d.precipitation}mm
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
