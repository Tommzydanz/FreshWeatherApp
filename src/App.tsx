import React from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import GetStarted from './screens/GetStarted';
import Forecast from './screens/main_screen/Forecast';
import {Colors} from './constants/colors';
import IconButton from './components/ui/IconButton';
import LocationContextProvider from './context/LocationContextProvider';
import FindLocation from './screens/main_screen/FindLocation';

const Stack = createNativeStackNavigator();

function Main() {
  return (
    <>
      <StatusBar barStyle="light-content" />
      <Stack.Navigator
        screenOptions={{
          headerStyle: {backgroundColor: Colors.purple100},
          headerTintColor: Colors.purple500,
          contentStyle: {backgroundColor: Colors.purple100},
        }}>
        <Stack.Screen
          name="GetStarted"
          component={GetStarted}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Forecast"
          component={Forecast}
          options={({navigation}) => ({
            headerRight: ({tintColor}) => (
              <IconButton
                icon="add-outline"
                size={24}
                color={tintColor}
                onPress={() => navigation.navigate('FindLocation')}
              />
            ),
          })}
        />
        <Stack.Screen name="FindLocation" component={FindLocation} />
      </Stack.Navigator>
    </>
  );
}

function Navigation() {
  return (
    <NavigationContainer>
      <Main />
    </NavigationContainer>
  );
}

const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <LocationContextProvider>
        <Navigation />
      </LocationContextProvider>
    </>
  );
};

export default App;
