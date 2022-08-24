import {createContext} from 'react';
import {ILocationContext} from './interfaces';

export const LocationContext = createContext<ILocationContext>({});
