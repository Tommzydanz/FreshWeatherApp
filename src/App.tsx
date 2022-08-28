import React, {useCallback, useContext, useEffect, useState} from 'react';
import {ActivityIndicator, StatusBar, StyleSheet, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/Ionicons';
import GetStarted from './screens/GetStarted';
import Forecast from './screens/main_screen/Forecast';
import {Colors} from './constants/colors';
import IconButton from './components/ui/IconButton';
import LocationContextProvider from './context/LocationContextProvider';
import {LocationContext} from './context/LocationContext';
import {ILocation} from './context/interfaces';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LocationForm from './screens/main_screen/LocationForm';
import ShowLocation from './screens/ShowLocation';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function OnBoard() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="GetStarted" component={GetStarted} />
      <Stack.Screen name="ShowLocation" component={ShowLocation} />
      <Stack.Screen name="LocationForm" component={LocationForm} />
    </Stack.Navigator>
  );
}

function DrawerNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerStyle: {backgroundColor: Colors.purple100},
        headerTintColor: Colors.purple500,
        drawerContentStyle: {backgroundColor: Colors.purple600},
        sceneContainerStyle: {backgroundColor: Colors.purple100},
        drawerInactiveTintColor: 'white',
        drawerActiveTintColor: Colors.purple500,
        drawerActiveBackgroundColor: Colors.purple100,
      }}>
      <Drawer.Screen
        name="Forecast"
        component={Forecast}
        options={({navigation}) => ({
          // headerTitle: 'Weather Forecast',
          drawerIcon: ({color, size}) => (
            <Icon name="location-outline" color={color} size={size} />
          ),
          drawerContentStyle: {backgroundColor: Colors.purple500},
          headerRight: ({tintColor}) => (
            <IconButton
              icon="add-outline"
              size={24}
              color={tintColor}
              onPress={() => navigation.navigate('LocationForm')}
            />
          ),
        })}
      />
    </Drawer.Navigator>
  );
}

function Main() {
  return (
    <>
      <StatusBar barStyle="light-content" />
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen
          name="Drawer"
          component={DrawerNavigator}
          options={{
            contentStyle: {backgroundColor: Colors.purple500},
            headerRight: ({tintColor}) => (
              <Icon name="add-outline" size={24} color={tintColor} />
            ),
          }}
        />
        <Stack.Screen name="LocationForm" component={LocationForm} />
      </Stack.Navigator>
    </>
  );
}

function Navigation() {
  const {location} = useContext(LocationContext);

  return (
    <NavigationContainer>
      {!location && <OnBoard />}
      {location && <Main />}
    </NavigationContainer>
  );
}

function Root() {
  const [isShowingWeather, setIsShowingWeather] = useState<boolean>(true);
  const locationCtx = useContext(LocationContext);

  const initialize = useCallback(async () => {
    // get saved location at component initialization
    const persistedLocationRaw: string | null = await AsyncStorage.getItem(
      'LOCATION',
    );

    // JSON parse location if found
    const persistedLocation: ILocation = persistedLocationRaw
      ? JSON.parse(persistedLocationRaw)
      : undefined;
    setIsShowingWeather(false);
    // update sate with saved location
    locationCtx.setLocation?.(persistedLocation);
  }, [locationCtx]);

  useEffect(function componentDidMount() {
    // initialize component after 2 seconds (simulate an async call)
    initialize();
    return function componentWillUnmount() {
      //  do nothing for now
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isShowingWeather) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size={'large'} style={styles.contentLoader} />
      </View>
    );
  }
  return <Navigation />;
}

const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <LocationContextProvider>
        <Root />
      </LocationContextProvider>
    </>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentLoader: {
    alignSelf: 'center',
  },
});
