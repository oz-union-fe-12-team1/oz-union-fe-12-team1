import { fiveDayWeatherDummy } from '../../api/weather';

export default function FiveDayWeather() {
  return (
    <div>
      <div className="grid grid-cols-5 gap-4">
        {fiveDayWeatherDummy.map((d, i) => (
          <div
            key={i}
            className="rounded-lg border border-slate-200 bg-white p-4 shadow flex flex-col items-center text-center"
          >
            {/* 날짜 */}
            <div className="text-sm font-semibold text-slate-700">{d.date}</div>

            {/* 날씨 설명 */}
            <div className="text-base">{d.description}</div>

            {/* 기온 */}
            <div className="text-sm text-slate-600">
              {d.temp_min}°C ~ {d.temp_max}°C
            </div>

            {/* 습도, 강수 */}
            <div className="text-xs text-slate-500">
              습도 {d.humidity}%, 강수 {d.precipitation}mm
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
