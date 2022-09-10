import {
  View,
  Text,
  Image,
  ImageSourcePropType,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from 'react-native';
import React from 'react';
import {Colors} from '../constants/colors';

type DetailProps = {
  title: string;
  mode: string;
  uri: ImageSourcePropType;
  style: StyleProp<ViewStyle>;
};

const Detail: React.FC<DetailProps> = function ({title, mode, uri, style}) {
  return (
    <View style={[styles.rootContainer, style]}>
      <View style={{}}>
        <Image source={uri} style={styles.image} resizeMode={'contain'} />
      </View>
      <View>
        <Text style={styles.text}>{title}</Text>
        <Text style={styles.mode}>{mode}</Text>
      </View>
    </View>
  );
};

export default Detail;

const styles = StyleSheet.create({
  rootContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 8,
    borderRightWidth: 1,
    borderRightColor: Colors.gray500,
  },
  image: {
    width: 24,
    height: 24,
    paddingHorizontal: 18,
  },
  text: {
    fontSize: 14,
    color: Colors.gray500,
    textAlign: 'center',
  },
  mode: {
    fontWeight: 'bold',
    fontSize: 14,
    color: 'white',
    textAlign: 'center',
    paddingTop: 12,
  },
});
