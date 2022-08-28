/* eslint-disable react-native/no-inline-styles */
import React, {useState, useLayoutEffect, useCallback, useContext} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';
// import DropDown from '../components/DropDown';
import {getGeoInfo} from '../util/http';
import {Colors} from '../constants/colors';
import {LocationContext} from '../context/LocationContext';
import {OnBoardProp} from './GetStarted';

// import {LocationContext} from '../context/LocationContext';

export type IpLocation = {
  country: string;
  state: string;
};

const ShowLocation: React.FC<OnBoardProp> = ({navigation}) => {
  const [showLocation, setShowLocation] = useState<IpLocation>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const locationCtx = useContext(LocationContext);

  const showCurrentLocation = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await getGeoInfo();
      setShowLocation({
        country: data.country_name,
        state: data.region,
      });
      await AsyncStorage.setItem('LOCATION', JSON.stringify(data));

      locationCtx.setLocation?.({
        country: data.country_name,
        state: data.region,
      });
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  }, [locationCtx]);

  useLayoutEffect(() => {
    setTimeout(showCurrentLocation, 2000);
    if (!showCurrentLocation) {
      navigation.replace('LocationForm');
    }
  }, [navigation, showCurrentLocation, showLocation]);

  return (
    <View style={styles.rootContainer}>
      <Text style={styles.text}>
        <Text style={styles.title}>Weather</Text> Forecast
      </Text>
      <View>
        {!isLoading ? (
          <ActivityIndicator
            style={styles.contentLoader}
            size="large"
            color="#666666"
          />
        ) : (
          <Text style={styles.currentLocationText}>
            Current Location
            <Text style={{textAlign: 'center', fontSize: 16}}>
              <Text style={styles.title}>{'\n \u2022'}</Text>
              {showLocation?.state + ', ' + showLocation?.country}
            </Text>
          </Text>
        )}
      </View>
    </View>
  );
};

export default ShowLocation;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    padding: 52,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.purple500,
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  contentLoader: {
    alignSelf: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '500',
    textAlign: 'center',
    color: Colors.accent500,
  },
  text: {
    paddingVertical: 12,
    fontSize: 26,
    textAlign: 'center',
    color: 'white',
  },
  currentLocationText: {
    color: '#09b109',
    fontSize: 20,
    textAlign: 'center',
    fontWeight: '600',
  },
});
