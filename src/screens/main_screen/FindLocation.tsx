import React from 'react';
import {OnBoardProp} from '../GetStarted';
import LocationForm from '../../components/LocationForm/LocationForm';

const FindLocation: React.FC<OnBoardProp> = function FindLocation() {
  return <LocationForm />;
};

export default FindLocation;
