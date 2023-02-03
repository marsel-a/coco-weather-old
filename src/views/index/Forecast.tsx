import ArrowDownIcon from '@/icons/ArrowDownIcon';
import ArrowUpIcon from '@/icons/ArrowUpIcon';
import SunriseIcon from '@/icons/SunriseIcon';
import SunsetIcon from '@/icons/SunsetIcon';
import { getWMODescription } from '@/utils/wmocodes';
import CityName from './CityName';
import DailyForecastChart from './DailyForecastChart';
import HourlyForecastChart from './HourlyForecastChart';

const Forecast = ({ forecast, city, favCities, setFavCity }) => {
  const currentHour = new Date().getUTCHours();

  return (
    <>
      <div className="flex flex-col items-center">
        <CityName city={city} favCities={favCities} setFavCity={setFavCity} />
        <div className="mt-8 mb-8">{getWMODescription(forecast.current_weather.weathercode)}</div>
        <div className="flex justify-between w-full mb-8 items-center">
          <div className="text-3xl font-bold flex flex-1 justify-center">{forecast.current_weather.temperature}°</div>
          <div className="text-xs text-center">
            <div>Real feel: {forecast.hourly.apparent_temperature[currentHour]}°</div>
            <div>
              Humidity: {forecast.hourly.relativehumidity_2m[currentHour]}
              {forecast.hourly_units.relativehumidity_2m}
            </div>
            <div>Wind {forecast.current_weather.windspeed}km/h</div>
          </div>
        </div>
        <div className="flex text-xs gap-2">
          <span className="flex gap-1">
            <SunriseIcon className="w-4" />
            Rise: {new Date(forecast.daily.sunrise[0]).toLocaleTimeString()}
          </span>
          |
          <span className="flex gap-1">
            <SunsetIcon className="w-4" />
            Set: {new Date(forecast.daily.sunset[0]).toLocaleTimeString()}
          </span>
          |
          <span className="flex gap-1">
            <ArrowUpIcon className="w-4" />
            High: {forecast.daily.temperature_2m_max[0]}°
          </span>
          |
          <span className="flex gap-1">
            <ArrowDownIcon className="w-4" />
            Low: {forecast.daily.temperature_2m_min[0]}°
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-2 mt-10">
        <div className="text-sm font-semibold">HOURLY HUMIDITY CHART</div>
        <div className="flex w-full">
          <HourlyForecastChart hourly={forecast.hourly} />
        </div>
      </div>

      <div className="flex flex-col gap-2 mt-6">
        <div className="text-sm font-semibold">DAILY TEMPERATURE FORECAST</div>
        <div>
          <DailyForecastChart daily={forecast.daily} />
        </div>
      </div>
    </>
  );
};

export default Forecast;
