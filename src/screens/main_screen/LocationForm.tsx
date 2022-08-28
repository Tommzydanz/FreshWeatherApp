import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {Colors} from '../../constants/colors';
import Button from '../../components/ui/Button';
import DropDown from '../../components/DropDown';
import {OnBoardProp} from '../GetStarted';

const LocationForm: React.FC<OnBoardProp> = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        <Text style={styles.title}>Weather</Text> Forecast
      </Text>
      <View style={styles.innerContainer}>
        <Text style={styles.innerTitle}>Select your location </Text>
        <DropDown />
        <Button
          onPress={() => {
            console.log('Saved');
          }}
          style={{marginVertical: 24}}>
          Save & Continue
        </Button>
      </View>
    </View>
  );
};

export default LocationForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 150,
    backgroundColor: Colors.purple100,
  },
  innerContainer: {
    borderRadius: 12,
    backgroundColor: Colors.purple500,
    paddingVertical: 24,
    paddingHorizontal: 24,
    marginVertical: 12,
    marginHorizontal: 96,
  },
  title: {
    fontSize: 26,
    fontWeight: '500',
    textAlign: 'center',
    color: Colors.accent500,
  },
  text: {
    fontSize: 24,
    textAlign: 'center',
    color: Colors.purple500,
  },
  innerTitle: {
    fontSize: 24,
    textAlign: 'center',
    color: Colors.purple100,
  },
});
