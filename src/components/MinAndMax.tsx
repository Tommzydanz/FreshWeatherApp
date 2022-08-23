import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {Colors} from '../constants/colors';

type IMaxNMinProps = {
  children: React.ReactNode;
  icon: string;
};

const MinAndMax: React.FC<IMaxNMinProps> = ({icon, children}) => {
  return (
    <View style={styles.container}>
      <Icon name={icon} size={22} color={Colors.gray500} />
      <Text>{children}</Text>
    </View>
  );
};

export default MinAndMax;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
