import PickCity from '../PickCity/PickCity';
import WeatherSummary from '../WeatherSummary/WeatherSummary';
import Loader from '../Loader/Loader';
import ErrorBox from '../ErrorBox/ErrorBox';
import { useState, useCallback } from 'react';

const WeatherBox = (props) => {
  const [weather, setWeather] = useState('');
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(false);

  const handleCityChange = useCallback((city) => {
    setPending(true);
    setError(false);
    fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=6db0f0a51cfc428c4996297d93582e04&units=metric`
    ).then((response) => {
      if (response.status === 200) {
        response.json().then((data) => {
          const weatherData = {
            city: data.name,
            temp: data.main.temp,
            icon: data.weather[0].icon,
            description: data.weather[0].main,
          };
          setPending(false);
          setWeather(weatherData);
        });
      } else {
        setError(true);
        setPending(false);
        setWeather('');
      }
    });
  }, []);

  return (
    <section>
      <PickCity action={handleCityChange} />
      {weather && !pending && !error && <WeatherSummary {...weather} />}
      {weather && pending && <Loader />}
      {error && <ErrorBox>There is no such City!</ErrorBox>}
    </section>
  );
};

export default WeatherBox;
