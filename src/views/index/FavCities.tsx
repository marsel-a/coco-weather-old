const FavCities = ({ city, temperatureUnit, favCities, setCityQuery, setCity, loadForecast }) => {
  return (
    <div className="flex justify-center mb-4">
      <ul className="menu menu-horizontal menu-compact flex gap-1 justify-center">
        {Array.from(favCities).map((favCityString: string, idx: number) => {
          const favCity = JSON.parse(favCityString);
          return (
            <li key={idx}>
              <a
                onClick={() => {
                  setCityQuery(favCity.name);
                  setCity(favCity);
                  loadForecast({ city: favCity, temperatureUnit });
                }}
              >
                {favCity.name}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default FavCities;

