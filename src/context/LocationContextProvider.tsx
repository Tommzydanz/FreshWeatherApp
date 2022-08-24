import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useCallback, useEffect, useState} from 'react';
import {WeatherContext} from './LocationContext';
import {ILocation, IWeatherContextProviderProps} from './interfaces';

const WeatherContextProvider: IWeatherContextProviderProps =
  function WeatherContextProvider({children}) {
    const [location, setLocation] = useState<ILocation>();

    const initialize = useCallback(async () => {
      // get saved color at component initialization
      const persistedLocationRaw: string | null = await AsyncStorage.getItem(
        'LOCATION',
      );
      // JSON parse location if found
      const persistedLocation: ILocation | undefined = persistedLocationRaw
        ? JSON.parse(persistedLocationRaw)
        : undefined;

      // update sate with saved location
      setLocation(persistedLocation || undefined);
    }, []);

    useEffect(function componentDidMount() {
      // initialize component after 2 seconds (simulate an async call)
      initialize();
      return function componentWillUnmount() {
        //  do nothing for now
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
      <WeatherContext.Provider
        value={{
          location,
          setLocation,
        }}>
        {children}
      </WeatherContext.Provider>
    );
  };

export default WeatherContextProvider;
