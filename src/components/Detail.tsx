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

const Detail: React.FC<DetailProps> = ({title, mode, uri, style}) => {
  return (
    <View style={[styles.rootContainer, style]}>
      <Image source={uri} style={styles.image} />
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
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRightWidth: 1,
    borderRightColor: Colors.gray500,
  },
  image: {
    width: 20,
    height: 20,
    alignSelf: 'center',
  },
  text: {
    fontSize: 16,
    color: Colors.gray500,
    textAlign: 'center',
  },
  mode: {
    fontWeight: 'bold',
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    paddingTop: 12,
  },
});
