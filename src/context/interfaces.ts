import React from 'react';

export type ILocationContextProviderProps = React.FC<{
  children: React.ReactNode;
}>;

export type ILocation = {
  country: string;
  state: string;
};

export type ILocationContext = {
  location?: ILocation;
  setLocation?: (location: ILocation) => void;
};
