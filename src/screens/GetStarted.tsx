import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {FC} from 'react';
import {Text, Image, StyleSheet, View, ImageBackground} from 'react-native';
import Button from '../components/ui/Button';
import {Colors} from '../constants/colors';

export interface OnBoardProp {
  navigation: NativeStackNavigationProp<any, any>;
}

const GetStarted: FC<OnBoardProp> = ({navigation}) => {
  function onBoardHandler() {
    navigation.replace('ShowLocation');
  }

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
      </View>
      <Button onPress={onBoardHandler} style={undefined}>
        Get Started
      </Button>
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
  },
  contentLoader: {
    alignSelf: 'center',
  },
});
