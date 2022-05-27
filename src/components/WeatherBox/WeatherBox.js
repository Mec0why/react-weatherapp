import PickCity from '../PickCity/PickCity';
import WeatherSummary from '../WeatherSummary/WeatherSummary';
import Loader from '../Loader/Loader';
import { useState, useCallback } from 'react';

const WeatherBox = (props) => {
  const [weather, setWeather] = useState('');

  const handleCityChange = useCallback((city) => {
    console.log(city);
    fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=6db0f0a51cfc428c4996297d93582e04&units=metric`
    )
      .then((response) => response.json())
      .then((data) => {
        const weatherData = {
          city: data.name,
          temp: data.main.temp,
          icon: data.weather[0].icon,
          description: data.weather[0].main,
        };
        console.log(weatherData);

        setWeather(weatherData);
      });
  }, []);

  return (
    <section>
      <PickCity action={handleCityChange} />
      <WeatherSummary weatherData={weather} />
      <Loader />
    </section>
  );
};

export default WeatherBox;
