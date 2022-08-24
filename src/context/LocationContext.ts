import {createContext} from 'react';
import {IWeatherContext} from './interfaces';

export const WeatherContext = createContext<IWeatherContext>({});
