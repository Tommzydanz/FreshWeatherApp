import {View, Text, ImageSourcePropType, Image, StyleSheet} from 'react-native';
import React from 'react';

type IDayItemProps = {
  date: Date;
  minTemp: string;
  maxTemp: string;
  uri: ImageSourcePropType;
};

const DayItem: React.FC<IDayItemProps> = ({date, minTemp, maxTemp, uri}) => {
  return (
    <View>
      <Text style={styles.day}>{date.toISOString()}</Text>
      <View style={{flexEng}}> 
        <Text>{maxTemp}</Text>
        <Text>{minTemp}</Text>
        <Image source={uri} style={styles.image} resizeMode="contain" />
      </View>
    </View>
  );
};

export default DayItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  day: {
    fontSize: 12,
  },
  maxTemp: {
    fontSize: 12,
  },
  minTemp: {
    fontSize: 12,
  },
  image: {
    width: 24,
    height: 24,
  },
});
