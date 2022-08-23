import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Image,
  ActivityIndicator,
  StatusBar,
} from 'react-native';
import React, {useCallback, useContext, useEffect, useState} from 'react';
import {IWeatherForecast} from '../../constants/interfaces';
import {WeatherContext} from '../../context/WeatherReportContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getWeather} from '../../util/http';
import IconButton from '../../components/ui/IconButton';
import MinAndMax from '../../components/MinAndMax';
import Detail from '../../components/Detail';
import {Colors} from '../../constants/colors';

const Forecast = () => {
  const [weather, setWeather] = useState<IWeatherForecast>();
  const {location} = useContext(WeatherContext);
  const [error, setError] = useState<string>();

  const fetchWeather = useCallback(async () => {
    try {
      setError(undefined);
      const weatherData = await getWeather(location?.state, location?.country);
      setWeather(weatherData);
      AsyncStorage.setItem(
        `weather:${location?.country}:${location?.state}`,
        JSON.stringify(weatherData),
      );
    } catch (err) {
      setError((err as Error).message);
    }
  }, [location?.country, location?.state]);

  const loadWeather = useCallback(async () => {
    const persisted = await AsyncStorage.getItem(
      `weather:${location?.country}:${location?.state}`,
    );
    if (persisted) {
      setWeather(JSON.parse(persisted));
    }
    fetchWeather();
  }, [fetchWeather, location?.country, location?.state]);

  useEffect(function componentDidMount() {
    loadWeather();
    return function componentWillUnmount() {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loading = useCallback(async () => {
    if (!error && !weather) {
      return (
        <View style={styles.rootContainer}>
          <ActivityIndicator
            style={styles.contentLoader}
            size="large"
            color="#666666"
          />
        </View>
      );
    }
  }, [error, weather]);

  if (!weather && error) {
    return (
      <View style={styles.rootContainer}>
        {error && (
          <IconButton
            icon="arrows-rotate"
            size={24}
            color="#666666"
            onPress={loading}
          />
        )}
      </View>
    );
  }

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.rootContainer}>
        <Text style={styles.mainDate}>DATE TO BE ADDED</Text>
        <View style={styles.mainWeatherContainer}>
          <View style={styles.mainWeatherText}>
            <Text>Day Weather Condition </Text>
            <Text>Temperature</Text>
          </View>
          <View style={styles.mainWeatherImage}>
            <Image
              source={require('../../assets/images/weather_cdns/clear_sky.png')}
              style={styles.mainImage}
              resizeMode="contain"
            />
          </View>
        </View>
        <View style={styles.smallTemp}>
          <MinAndMax children="35" icon="chevron-down-outline" />
          <MinAndMax children="36" icon="chevron-up-outline" />
        </View>
      </SafeAreaView>
      <SafeAreaView style={styles.weekContainer}>
        <Text style={styles.detailText}>Detail</Text>
        <View style={styles.detailContainer}>
          <Detail
            children={'Humidity \n\n 33%'}
            uri={require('../../assets/images/humidity.png')}
            style={undefined}
          />
          <Detail
            children={'Reel Feel \n\n 33°'}
            uri={require('../../assets/images/weather_cdns/clear_sky.png')}
            style={undefined}
          />
          <Detail
            children={'Wind Speed \n\n 3.6m/s'}
            uri={require('../../assets/images/windspeed.png')}
            // eslint-disable-next-line react-native/no-inline-styles
            style={{borderRightWidth: 0}}
          />
        </View>
        <View>
          <Text>EveryDay</Text>
        </View>
      </SafeAreaView>
    </>
  );
};

export default Forecast;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: Colors.purple100,
  },
  mainDate: {
    alignSelf: 'center',
  },
  mainImage: {
    width: 180,
    height: 180,
  },
  mainWeatherContainer: {
    flexDirection: 'row',
    paddingTop: 24,
    marginVertical: 12,
    paddingHorizontal: 24,
  },
  mainWeatherImage: {
    flex: 1,
  },
  mainWeatherText: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 48,
  },
  contentLoader: {
    alignSelf: 'center',
  },
  smallTemp: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    paddingHorizontal: 24,
  },
  detailText: {
    alignSelf: 'flex-start',
    padding: 24,
    color: 'white',
    fontSize: 14,
  },
  detailContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
  },
  weekContainer: {
    flex: 1.5,
    backgroundColor: Colors.purple500,
    borderTopLeftRadius: 48,
    borderTopRightRadius: 48,
    elevation: 2,
    shadowColor: Colors.purple500,
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 0.25,
  },
});
