import {View, Text, Pressable, StyleSheet} from 'react-native';
import React, {FC} from 'react';
import {Colors} from '../../constants/colors';

interface ButtonProps {
  children: string;
  onPress: () => void;
}

const Button: FC<ButtonProps> = ({children, onPress}) => {
  return (
    <View style={styles.container}>
      <Pressable
        onPress={onPress}
        android_ripple={{color: Colors.offwhite}}
        style={({pressed}) => {
          return pressed && styles.pressed;
        }}>
        <Text style={styles.title}>{children}</Text>
      </Pressable>
    </View>
  );
};

export default Button;

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.25,
  },
  container: {
    backgroundColor: Colors.accent500,
    borderRadius: 10,
    marginVertical: 24,
    marginHorizontal: 72,
    elevation: 4,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 4},
  },
  title: {
    paddingVertical: 10,
    paddingHorizontal: 4,
    textAlign: 'center',
    fontSize: 18,
    color: 'white',
  },
});
