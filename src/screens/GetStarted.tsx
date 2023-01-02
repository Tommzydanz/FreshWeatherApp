import React, {FC, useCallback, useContext, useEffect} from 'react';
import {
  Text,
  Image,
  StyleSheet,
  View,
  ImageBackground,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {CommonActions} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Colors} from '../constants/colors';
import {LocationContext} from '../context/LocationContext';
import {getGeoInfo} from '../util/http';

export interface OnBoardProp {
  navigation: NativeStackNavigationProp<any, any>;
}

const GetStarted: FC<OnBoardProp> = function GetStarted({navigation}) {
  const {setLocation, saveLocation} = useContext(LocationContext);

  const continueToNext = useCallback(
    (screenName: string) => {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: screenName}],
        }),
      );
    },
    [navigation],
  );

  const fetchLocationFromIpAddress = useCallback(async () => {
    try {
      const location = await getGeoInfo();
      if (!saveLocation) {
        throw new Error('Cannot save location right now.');
      }
      const newLocation = {
        country: location.country_name,
        state: location.region,
      };
      await saveLocation(newLocation);
      continueToNext('Forecast');
    } catch (err) {
      continueToNext('FindLocation');
    }
  }, [continueToNext, saveLocation]);

  const findSavedLocation = useCallback(async () => {
    const savedLocationRaw = await AsyncStorage.getItem('LOCATION');
    if (savedLocationRaw && setLocation) {
      const savedLocation = JSON.parse(savedLocationRaw);
      setLocation(savedLocation);
      return continueToNext('Forecast');
    }
    fetchLocationFromIpAddress();
  }, [continueToNext, fetchLocationFromIpAddress, setLocation]);

  useEffect(function componetDidMount() {
    findSavedLocation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={styles.rootContainer}>
      <ImageBackground
        source={require('../assets/images/oval_background.png')}
        style={styles.imageBackground}
        resizeMode="contain">
        <View style={styles.imageContainer}>
          <Image source={require('../assets/images/fresh_weather.png')} />
        </View>
      </ImageBackground>
      <View style={styles.textContainer}>
        <Text style={styles.text}>
          <Text style={styles.title}>Weather</Text>
          {'\n'}Forcast App
        </Text>
        <Text style={styles.smallText}>
          {'\n'}It's the newest weather app. It has a bunch of features and that
          includes most of the ones that every weather app has.
        </Text>
        <ActivityIndicator
          size={'large'}
          color={'white'}
          style={styles.contentLoader}
        />
      </View>
    </View>
  );
};

export default GetStarted;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    padding: 52,
    backgroundColor: Colors.purple500,
  },
  imageBackground: {
    width: '100%',
    height: 300,
  },
  imageStyle: {
    borderRadius: 50,
  },
  imageContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  textContainer: {
    marginVertical: 24,
    marginTop: 100,
    paddingHorizontal: 4,
  },
  title: {
    fontSize: 40,
    textAlign: 'left',
    fontWeight: '500',
    color: Colors.accent500,
  },
  text: {
    fontSize: 37,
    textAlign: 'left',
    color: 'white',
  },
  smallText: {
    fontSize: 15,
    color: 'white',
    fontFamily: 'Roboto-Bold',
  },
  contentLoader: {
    alignSelf: 'center',
    marginTop: 10,
    padding: 24,
  },
});
