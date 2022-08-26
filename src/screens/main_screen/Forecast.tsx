import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Image,
  ActivityIndicator,
  StatusBar,
  FlatList,
  ImageBackground,
} from 'react-native';
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {IWeatherForecast, List} from '../../constants/interfaces';
import {LocationContext} from '../../context/LocationContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getWeather} from '../../util/http';
import IconButton from '../../components/ui/IconButton';
import MinAndMax from '../../components/MinAndMax';
import Detail from '../../components/Detail';
import {Colors} from '../../constants/colors';
import moment from 'moment';
import DayItem from '../../components/DaysList/DayItem';

const tempConverter: number = -273.15;

const Forecast = () => {
  const [weather, setWeather] = useState<IWeatherForecast>();
  const {location} = useContext(LocationContext);
  const [error, setError] = useState<string>();

  const todaysWeather = useMemo((): List | undefined => {
    if (!weather) {
      return;
    }
    return weather.list.find(item => {
      const startOfDay = moment().startOf('day').unix();
      const endOfDay = moment().endOf('day').unix();
      if (!item.dt) {
        return false;
      }

      if (item.dt < startOfDay || item.dt > endOfDay) {
        return item;
      }
      return item;
    });
  }, [weather]);

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

  // const getCurrentDate = useCallback(() => {
  //   /* get the date here */
  //   const date = moment().format('MMM D, YYYY');
  //   setToday(date);
  // }, []);

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

  if (!weather && error) {
    return (
      <View style={styles.rootContainer}>
        {error && (
          <IconButton
            icon="arrows-rotate"
            size={24}
            color="#666666"
            onPress={() => console.log('reload')}
          />
        )}
      </View>
    );
  }

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.rootContainer}>
        <Text style={styles.mainDate}>
          {moment((todaysWeather?.dt || 0) * 1000).format('ddd, MMMM DD YYYY')}
        </Text>
        <View style={styles.mainWeatherContainer}>
          <View style={styles.mainWeatherText}>
            <Text style={{fontSize: 24, color: Colors.purple300}}>
              {todaysWeather?.weather
                ? todaysWeather?.weather[0].description
                : ''}
            </Text>
            <Text style={{fontSize: 72, color: Colors.purple600}}>
              {parseInt(
                todaysWeather
                  ? String(todaysWeather.temp.day + tempConverter)
                  : '',
                10,
              ) + '°'}
            </Text>
          </View>
          <View style={styles.mainWeatherImage}>
            <ImageBackground
              source={require('../../assets/images/oval_background.png')}
              resizeMode="cover">
              <Image
                source={{
                  uri: `https://openweathermap.org/img/wn/${todaysWeather?.weather[0].icon}@4x.png`,
                }}
                style={styles.mainImage}
                resizeMode="contain"
              />
            </ImageBackground>
          </View>
        </View>
        <View style={styles.smallTemp}>
          <MinAndMax icon="chevron-up-outline">
            {parseInt(
              todaysWeather
                ? String(todaysWeather.temp.max + tempConverter)
                : '',
              10,
            ) + '°'}
          </MinAndMax>
          <MinAndMax icon="chevron-down-outline">
            {parseInt(
              todaysWeather
                ? String(todaysWeather?.temp.min + tempConverter)
                : '',
              10,
            ) + '°'}
          </MinAndMax>
        </View>
      </SafeAreaView>
      <SafeAreaView style={styles.weekContainer}>
        <Text style={styles.detailText}>Detail</Text>
        <View style={styles.detailContainer}>
          <Detail
            title={'Humidity'}
            mode={todaysWeather?.humidity + '%'}
            uri={require('../../assets/images/humidity.png')}
            style={undefined}
          />
          <Detail
            title={'Reel Feel'}
            mode={
              parseInt(
                todaysWeather
                  ? String(todaysWeather.feels_like.day + tempConverter)
                  : '',
                10,
              ) + '°'
            }
            uri={{
              uri: `https://openweathermap.org/img/wn/${todaysWeather?.weather[0].icon}@4x.png`,
            }}
            style={undefined}
          />
          <Detail
            title={'Wind Speed'}
            mode={todaysWeather?.speed + 'km'}
            uri={require('../../assets/images/windspeed.png')}
            // eslint-disable-next-line react-native/no-inline-styles
            style={{borderRightWidth: 0}}
          />
        </View>
        <View style={{padding: 24}}>
          <View style={styles.daysContainer}>
            <Text style={styles.daysText}>Everyday</Text>
          </View>
          <FlatList
            alwaysBounceVertical={false}
            data={weather?.list}
            renderItem={({item}) => {
              return (
                <DayItem
                  date={item.dt}
                  maxTemp={parseInt(String(item.temp.max + tempConverter), 10)}
                  minTemp={parseInt(String(item.temp.min + tempConverter), 10)}
                  uri={{
                    uri: `https://openweathermap.org/img/wn/${item.weather[0].icon}@4x.png`,
                  }}
                />
              );
            }}
          />
        </View>
      </SafeAreaView>
    </>
  );
};

export default Forecast;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
  mainDate: {
    alignSelf: 'center',
    marginTop: 12,
  },
  mainImage: {
    width: 200,
    height: 200,
    paddingHorizontal: 18,
  },
  mainWeatherContainer: {
    flexDirection: 'row',
    paddingTop: 24,
    paddingHorizontal: 24,
  },
  mainWeatherImage: {
    flex: 1,
  },
  mainWeatherText: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20,
  },
  contentLoader: {
    alignSelf: 'center',
  },
  smallTemp: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    paddingHorizontal: 24,
    paddingBottom: 12,
  },
  detailText: {
    alignSelf: 'flex-start',
    padding: 20,
    color: 'white',
    fontSize: 16,
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
  daysContainer: {
    borderTopWidth: 1,
    borderTopColor: Colors.gray500,
    paddingVertical: 12,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  daysText: {
    fontSize: 16,
    color: 'white',
  },
});
