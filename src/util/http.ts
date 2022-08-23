import {IWeatherForecast} from './../constants/interfaces';
import axios from 'axios';

export const getWeather = async (
  state: string | undefined,
  country: string | undefined,
): Promise<IWeatherForecast> => {
  const response = await axios.get<IWeatherForecast>(
    `https://api.openweathermap.org/data/2.5/forecast/daily?q=${state},${country}&cnt=7&appid=84dde353cf2757e657ef9075598771c2`,
  );
  return response.data;
};

export const getGeoInfo = async () => {
  const response = await axios.get('https://ipapi.co/json/');
  return response.data;
};
