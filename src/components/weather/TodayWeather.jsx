import { weatherIconMap, mapIconCode } from '../../utils/weatherIcons';
import useLocation from '../../hook/useLocation';
import { useTodayWeather } from '../../hook/useWeather';

export default function TodayWeather() {
  const { location, error } = useLocation();
  const { data: d, isLoading, isError } = useTodayWeather(location);

  if (error) return <div>위치 오류: {error}</div>;
  if (isLoading) return <div>날씨 불러오는 중...</div>;
  if (isError) return <div>날씨 불러오기 실패</div>;
  if (!d) return <div>날씨 정보가 없습니다.</div>;

  console.log('🌤️ TodayWeather data:', d);

  const iconKey = mapIconCode(d.weather_icon || '');
  const Icon = weatherIconMap[iconKey] || weatherIconMap.cloudy;

  return (
    <div className="flex flex-col gap-4 h-full">
      <div className="flex items-center gap-3">
        <Icon className="w-20 h-20 text-blue-300" strokeWidth={1.5} />
        <div className="ml-auto text-right">
          <div className="text-4xl font-bold">{d.current_temp}°</div>
          <div className="text-sm text-neutral-400">
            최고 {d.max_temp}° / 최저 {d.min_temp}°
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <InfoCard label="습도" value={`${d.humidity}%`} />
        <InfoCard label="강수량" value={`${d.precipitation}mm`} />
        <InfoCard label="미세먼지" value={`${d.pm10}㎍/m³`} />
      </div>
    </div>
  );
}

function InfoCard({ label, value }) {
  return (
    <div className="rounded-xl bg-neutral-800/70 border border-neutral-700 px-2 py-2 flex flex-col items-center">
      <div className="text-sm text-neutral-400">{label}</div>
      <div className="text-base font-semibold">{value}</div>
    </div>
  );
}
