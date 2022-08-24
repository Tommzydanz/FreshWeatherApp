import React, {useContext} from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/Ionicons';
import GetStarted from './screens/GetStarted';
import SelectLocation from './screens/SelectLocation';
import Forecast from './screens/main_screen/Forecast';
import SearchCity from './screens/main_screen/SearchCity';
import WeatherContextProvider from './context/LocationContextProvider';
import {WeatherContext} from './context/LocationContext';
import {Colors} from './constants/colors';
import IconButton from './components/ui/IconButton';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function OnBoard() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="GetStarted" component={GetStarted} />
      <Stack.Screen name="SelectLocation" component={SelectLocation} />
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
        drawerInactiveTintColor: 'white',
        drawerActiveTintColor: Colors.purple500,
        drawerActiveBackgroundColor: Colors.purple100,
      }}>
      <Drawer.Screen
        options={{
          headerTitle: 'Weather Forecast',
          drawerIcon: ({color, size}) => (
            <Icon name="location-outline" color={color} size={size} />
          ),
          headerRight: ({tintColor}) => (
            <IconButton
              icon="add-outline"
              size={24}
              color={tintColor}
              onPress={() => {
                return console.log('Move to select other countries');
              }}
            />
          ),
        }}
        name="Forecast"
        component={Forecast}
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
            headerRight: ({tintColor}) => (
              <Icon name="add-outline" size={24} color={tintColor} />
            ),
          }}
        />
        <Stack.Screen name="SearchCity" component={SearchCity} />
      </Stack.Navigator>
    </>
  );
}

function Navigation() {
  const {location} = useContext(WeatherContext);

  return (
    <NavigationContainer>
      {!location && <OnBoard />}
      {location && <Main />}
    </NavigationContainer>
  );
}

const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <WeatherContextProvider>
        <Navigation />
      </WeatherContextProvider>
    </>
  );
};

export default App;
