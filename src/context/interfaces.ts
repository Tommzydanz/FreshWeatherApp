import React from 'react';

export type IWeatherContextProviderProps = React.FC<{
  children: React.ReactNode;
}>;

export type ILocation = {
  country: string;
  state: string;
};

export type IWeatherReport = any;

export type IWeatherContext = {
  location?: ILocation;
  setLocation?: (location: ILocation) => void;
};
