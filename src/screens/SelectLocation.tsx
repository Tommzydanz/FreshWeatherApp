/* eslint-disable react-native/no-inline-styles */
import React, {useState, useLayoutEffect, useCallback} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';
// import DropDown from '../components/DropDown';
import {getGeoInfo} from '../util/http';
import Button from '../components/ui/Button';
import {Colors} from '../constants/colors';

export type IpLocation = {
  country: string;
  state: string;
};

const SelectLocation = () => {
  const [location, setLocation] = useState<IpLocation>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  async function showCurrentLocation() {
    setIsLoading(true);
    try {
      const data = await getGeoInfo();
      setLocation({country: data?.country_name, state: data?.region});
    } catch (err) {
      console.log(err);
      setError((err as Error).message);
      setIsLoading(false);
    }
  }

  const saveLocationHandler = useCallback(async () => {
    setIsLoading(true);
    try {
      await AsyncStorage.setItem('LOCATION', JSON.stringify(location));
    } catch (err) {
      console.log(err);
      setError((err as Error).message);
    }
    setIsLoading(false);
    console.log('Saving location handler');
  }, [location]);

  useLayoutEffect(() => {
    showCurrentLocation();
  }, []);

  if (!error) {
    return (
      <View style={{backgroundColor: Colors.purple600}}>
        <ActivityIndicator
          style={styles.contentLoader}
          size="large"
          color="#666666"
        />
      </View>
    );
  }

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
              {location?.state + ', ' + location?.country}
            </Text>
          </Text>
        )}
      </View>
      <Text style={styles.text}> Or </Text>
      {/* <DropDown /> */}
      <View style={{marginTop: 200}}>
        <Button onPress={saveLocationHandler}>Save & Continue</Button>
      </View>
    </View>
  );
};

export default SelectLocation;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    padding: 52,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.purple500,
  },
  container: {
    marginVertical: 100,
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
  button: {
    marginVertical: 24,
  },
});
