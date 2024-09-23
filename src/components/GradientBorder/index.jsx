import React, { useEffect, useRef } from "react";
import { View, Animated, StyleSheet } from "react-native";

const GradientBorder = ({ children, isBoosted }) => {
  const animation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isBoosted) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(animation, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: false,
          }),
          Animated.timing(animation, {
            toValue: 0,
            duration: 2000,
            useNativeDriver: false,
          }),
        ])
      ).start();
    } else {
      animation.stopAnimation();
      animation.setValue(0);
    }
  }, [isBoosted]);

  const animatedBorderStyle = isBoosted
    ? {
        borderWidth: 3,
        borderRadius: 6,
        borderColor: animation.interpolate({
          inputRange: [0, 1],
          outputRange: ["#595cff", "#60efff"],
        }),
      }
    : {};

  return (
    <Animated.View style={[styles.container, animatedBorderStyle]}>
      {children}
    </Animated.View>
  );
};

const styles = StyleSheet.create({});

export default GradientBorder;
