import Head from 'next/head';
import { useRef, useState } from 'react';

// Third Party Library
import useSWRMutation from 'swr/mutation';

// Icons
import SunriseIcon from '@/icons/SunriseIcon';
import SunsetIcon from '@/icons/SunsetIcon';
import ArrowUpIcon from '@/icons/ArrowUpIcon';
import ArrowDownIcon from '@/icons/ArrowDownIcon';
import SearchIcon from '@/icons/SearchIcon';
import { getWMODescription } from '@/utils/wmocodes';
import CityName from '@/views/index/CityName';
import LocalTime from '@/views/index/LocalTime';
import HourlyForecastChart from '@/views/index/HourlyForecastChart';
import DailyForecastChart from '@/views/index/DailyForecastChart';
import dynamic from 'next/dynamic';
import SearchAndTemperature from '@/views/index/SearchAndTemperature';
import Forecast from '@/views/index/Forecast';
import FavCities from '@/views/index/FavCities';

const fetchCities = (key: string, { arg: qCity }: { arg: string }) => {
  if (!qCity) return;
  return fetch(`/api/cities?q=${qCity}`).then((res) => res.json());
};

const fetchForecast = (key: string, { arg }: { arg: any }) => {
  const { city, temperatureUnit } = arg;
  if (!city) return;

  return fetch(
    `/api/forecast?latitude=${city.latitude}&longitude=${city.longitude}&temperatureUnit=${temperatureUnit}`
  ).then((res) => res.json());
};

function Home() {
  // States
  const [qCity, setQCity] = useState('');
  const [city, setCity] = useState<any>(null);
  const [favCities, setFavCities] = useState(new Set<string>());
  const [temperatureUnit, setTemperatureUnit] = useState('celsius');

  // Refs
  const cityTextField = useRef<HTMLInputElement>(null);

  // Hooks
  const { data: cities, isMutating: isLoadingCities, trigger: loadCities } = useSWRMutation('fetchCities', fetchCities);
  const {
    data: forecast,
    isMutating: isLoadingForecast,
    trigger: loadForecast,
  } = useSWRMutation('fetchForecast', fetchForecast);

  // Actions
  const setCityQuery = (value: string) => {
    if (cityTextField.current) {
      cityTextField.current.value = value;
      var event = new Event('input', { bubbles: true });
      cityTextField.current.dispatchEvent(event);

      setQCity(value);
    }
  };

  const setFavCity = () => {
    const currentCity = JSON.stringify(city);
    const newSet = new Set(favCities);
    if (newSet.has(currentCity)) {
      newSet.delete(currentCity);
    } else {
      newSet.add(currentCity);
    }

    setFavCities(newSet);
  };

  const changeTemperatureUnit = () => {
    const newTemperatureUnit = temperatureUnit === 'celsius' ? 'fahrenheit' : 'celsius';
    setTemperatureUnit(newTemperatureUnit);
    loadForecast({ city, temperatureUnit: newTemperatureUnit });
  };

  return (
    <>
      <Head>
        <title>Coco-Weather</title>
      </Head>
      <main className="grid h-screen place-items-center">
        <div className="max-w-2xl bg-base-200 px-8 py-4 shadow-xl relative">
          {isLoadingForecast && <progress className="progress w-full h-1 absolute left-0 top-0"></progress>}
          <FavCities
            city={city}
            temperatureUnit={temperatureUnit}
            favCities={favCities}
            setCityQuery={setCityQuery}
            setCity={setCity}
            loadForecast={loadForecast}
          />

          <SearchAndTemperature
            city={city}
            temperatureUnit={temperatureUnit}
            cityTextField={cityTextField}
            setQCity={setQCity}
            setCity={setCity}
            loadCities={loadCities}
            loadForecast={loadForecast}
            cities={cities}
            isLoadingCities={isLoadingCities}
            changeTemperatureUnit={changeTemperatureUnit}
          />

          <LocalTime />

          {forecast && <Forecast forecast={forecast} city={city} favCities={favCities} setFavCity={setFavCity} />}
        </div>
      </main>
    </>
  );
}

export default dynamic(() => Promise.resolve(Home), { ssr: false });

