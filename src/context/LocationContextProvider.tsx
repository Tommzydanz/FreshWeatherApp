import React, {useCallback, useState} from 'react';
import {LocationContext} from './LocationContext';
import {ILocation, ILocationContextProviderProps} from './interfaces';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LocationContextProvider: ILocationContextProviderProps =
  function LocationContextProvider({children}) {
    const [location, setLocation] = useState<ILocation>();

    const saveLocation = useCallback(
      async (newLocation: ILocation): Promise<void> => {
        await AsyncStorage.setItem('LOCATION', JSON.stringify(newLocation));
        setLocation(newLocation);
        return Promise.resolve();
      },
      [],
    );

    return (
      <LocationContext.Provider
        value={{
          location,
          setLocation,
          saveLocation,
        }}>
        {children}
      </LocationContext.Provider>
    );
  };

export default LocationContextProvider;
