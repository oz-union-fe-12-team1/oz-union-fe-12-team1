import { fiveDayWeatherDummy } from '../../api/weather';

export default function FiveDayWeather() {
  return (
    <div>
      <h2 className="font-bold mb-2">5일 날씨</h2>
      <ul className="space-y-1">
        {fiveDayWeatherDummy.map((d, i) => (
          <li key={i} className="border-b py-1">
            {d.date} → {d.temp_min}°C ~ {d.temp_max}°C / {d.description}
            (습도 {d.humidity}%, 강수 {d.precipitation}mm)
          </li>
        ))}
      </ul>
    </div>
  );
}
