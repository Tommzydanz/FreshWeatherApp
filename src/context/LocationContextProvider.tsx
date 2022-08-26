import React, {useState} from 'react';
import {LocationContext} from './LocationContext';
import {ILocation, ILocationContextProviderProps} from './interfaces';

const LocationContextProvider: ILocationContextProviderProps =
  function LocationContextProvider({children}) {
    const [location, setLocation] = useState<ILocation>();

    return (
      <LocationContext.Provider
        value={{
          location,
          setLocation,
        }}>
        {children}
      </LocationContext.Provider>
    );
  };

export default LocationContextProvider;
