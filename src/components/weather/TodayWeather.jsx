import { todayWeatherDummy } from '../../api/dummyweather';

export default function TodayWeather() {
  const d = todayWeatherDummy;

  return (
    <div>
      <h2 className="font-bold mb-2">오늘의 날씨</h2>
      <p>현재기온: {d.current_temp}°C</p>
      <p>
        최저기온: {d.min_temp}°C / 최고기온: {d.max_temp}°C
      </p>
      <p>습도: {d.humidity}%</p>
      <p>강수량: {d.precipitation}mm</p>
      <p>미세먼지(PM10): {d.pm10}</p>
    </div>
  );
}
