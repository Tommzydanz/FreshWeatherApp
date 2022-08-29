import {
  View,
  Text,
  Pressable,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from 'react-native';
import React, {FC} from 'react';
import {Colors} from '../../constants/colors';

interface ButtonProps {
  children: string;
  onPress: () => void;
  style: StyleProp<ViewStyle>;
}

const Button: FC<ButtonProps> = ({children, onPress, style}) => {
  return (
    <Pressable
      onPress={onPress}
      android_ripple={{color: Colors.offwhite}}
      style={({pressed}) => {
        return pressed && styles.pressed;
      }}>
      <View style={[styles.container, style]}>
        <Text style={styles.title}>{children}</Text>
      </View>
    </Pressable>
  );
};

export default Button;

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.25,
  },
  container: {
    backgroundColor: Colors.accent500,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    paddingVertical: 10,
    elevation: 4,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 4},
  },
  title: {
    textAlign: 'center',
    fontSize: 14,
    color: 'white',
  },
});
