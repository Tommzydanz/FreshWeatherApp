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
    <View style={[styles.container, style]}>
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
    paddingVertical: 10,
    paddingHorizontal: 10,
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
