// src/components/weather/TodayWeather.jsx
import { todayWeatherDummy } from '../../api/dummyWeather';

export default function TodayWeather() {
  const d = todayWeatherDummy;
  const iconUrl = `https://openweathermap.org/img/wn/${d.weather_icon}@4x.png`;

  return (
    <section className="h-full rounded-2xl border border-neutral-800 bg-neutral-900 text-neutral-100 overflow-hidden">
      <div className="h-full p-3 grid grid-rows-[auto_auto] gap-2 rounded-xl border border-neutral-800/60 bg-black/30">
        {/* 상단: 아이콘 + 현재/최고/최저 */}
        <div className="flex items-center gap-3">
          <div className="relative shrink-0">
            {/* ✅ 오픈웨더 아이콘 표시 */}
            <img src={iconUrl} alt="weather icon" className="w-32 h-32 object-contain" />
            <div className="absolute top-1 left-1 text-[11px] px-2 py-0.5 rounded bg-black/50 border border-white/10">
              내 현재 위치
            </div>
          </div>
          <div className="ml-auto pr-1 flex flex-col items-end justify-center">
            <div className="text-5xl font-extrabold leading-none">{d.current_temp}°</div>
            <div className="text-sm text-neutral-300 mt-1">
              최고 {d.max_temp}° / 최저 {d.min_temp}°
            </div>
          </div>
        </div>

        {/* 하단: 상세 (습도/강수량/미세먼지) */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { k: '습도', v: `${d.humidity}%` },
            { k: '강수량', v: `${d.precipitation} mm` },
            { k: '미세먼지', v: `${d.pm10} ㎍/m³` },
          ].map((it) => (
            <div
              key={it.k}
              className="rounded-xl bg-neutral-800/70 border border-neutral-700 px-2 flex flex-col items-center justify-center transition-[height] duration-200"
              style={{ height: 'clamp(0px, 10vh, 90px)' }}
            >
              <div className="text-[11px] text-neutral-400">{it.k}</div>
              <div className="text-base font-semibold leading-tight">{it.v}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
