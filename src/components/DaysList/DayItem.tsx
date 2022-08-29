import {View, Text, ImageSourcePropType, Image, StyleSheet} from 'react-native';
import React from 'react';
import moment from 'moment';
import {Colors} from '../../constants/colors';

type IDayItemProps = {
  date: number;
  minTemp: number;
  maxTemp: number;
  uri: ImageSourcePropType;
};

const DayItem: React.FC<IDayItemProps> = ({date, minTemp, maxTemp, uri}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.day}>
        {moment(date * 1000).format('ddd, MMM DD')}
      </Text>
      <View style={styles.tempStyle}>
        <Text style={styles.maxTemp}>{maxTemp + '°'}</Text>
        <Text style={styles.minTemp}>{minTemp + '°'}</Text>
        <Image source={uri} style={styles.image} resizeMode={'center'} />
      </View>
    </View>
  );
};

export default DayItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
  },
  day: {
    fontSize: 14,
    textAlign: 'left',
    color: Colors.gray500,
  },
  maxTemp: {
    fontSize: 14,
    fontWeight: '500',
    color: 'white',
    paddingHorizontal: 16,
  },
  minTemp: {
    fontSize: 14,
    color: Colors.gray500,
    paddingRight: 20,
  },
  image: {
    width: 24,
    height: 24,
    paddingHorizontal: 18,
  },
  tempStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 10,
  },
});
