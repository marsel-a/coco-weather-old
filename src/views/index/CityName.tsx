import StarIcon from '@/icons/StarIcon';
import StarFilledIcon from '@/icons/StartFilledIcon';

interface Props {
  city: any;
  favCities: Set<string>;
  setFavCity: () => void;
}

const CityName = ({ city, favCities, setFavCity }: Props) => {
  return (
    <div className="text-lg font-bold mt-6 flex items-center gap-2">
      {city?.name}, {city?.country_code}
      <label className="swap">
        <input type="checkbox" readOnly checked={favCities.has(JSON.stringify(city))} onClick={setFavCity} />

        <StarIcon className="swap-off fill-current w-5 h-5" />
        <StarFilledIcon className="swap-on fill-current w-5 h-5" />
      </label>
    </div>
  );
};

export default CityName;

