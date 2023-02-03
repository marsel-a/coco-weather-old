// Third Party Library
import SearchIcon from '@/icons/SearchIcon';
import debounce from '@/utils/debounce';

// Third Party Components
import { Combobox } from '@headlessui/react';

interface Props {
  city: any;
  temperatureUnit: string;
  cityTextField: any;
  setQCity: (qCity: string) => void;
  setCity: (city: string) => void;
  loadCities: ({}) => void;
  loadForecast: ({}) => void;
  cities: any;
  isLoadingCities: boolean;
  changeTemperatureUnit: () => void;
}

const SearchAndTemperature = ({
  city,
  temperatureUnit,
  cityTextField,
  setQCity,
  setCity,
  loadCities,
  loadForecast,
  cities,
  isLoadingCities,
  changeTemperatureUnit,
}: Props) => {
  return (
    <div className="flex justify-center items-center gap-2">
      <Combobox
        value={city}
        onChange={(city) => {
          setCity(city);
          loadForecast({ city, temperatureUnit });
        }}
      >
        <div className="relative w-full max-w-xs">
          <Combobox.Input
            className="input input-sm input-ghost bg-base-100 w-full"
            placeholder="Search city..."
            ref={cityTextField}
            onChange={debounce((e: Event & { target: HTMLInputElement }) => {
              setQCity(e.target.value);
              loadCities(e.target.value);
            })}
            displayValue={(city: { name: string }) => city?.name}
          />
          <Combobox.Options className="absolute mt-2 max-h-60 w-full shadow-xl overflow-auto rounded-md text-base sm:text-sm menu menu-compact bg-base-100 flex-nowrap z-50">
            {cities?.results?.map((city: { id: number; name: string }) => (
              <Combobox.Option key={city.id} value={city}>
                <a>{city.name}</a>
              </Combobox.Option>
            ))}
          </Combobox.Options>
        </div>
      </Combobox>
      <button className={`btn btn-sm btn-ghost rounded-full p-2 ${isLoadingCities ? 'loading' : 'w-8 h-8'}`}>
        {!isLoadingCities && <SearchIcon />}
      </button>
      {city && (
        <label className="btn btn-sm btn-ghost rounded-full w-8 h-8 swap swap-rotate">
          <input type="checkbox" onChange={changeTemperatureUnit} />
          <div className="swap-off">
            <strong>°C</strong>
          </div>
          <div className="swap-on">
            <strong>°F</strong>
          </div>
        </label>
      )}
    </div>
  );
};

export default SearchAndTemperature;

