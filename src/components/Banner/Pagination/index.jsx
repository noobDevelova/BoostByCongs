import { StyleSheet, Text, View, Animated } from "react-native";
import React from "react";
import matrics from "../../../utilities/screenDimensions";

const screen_width = matrics.screenWidth;

const Pagination = ({ data, scrollX, index }) => {
  return (
    <View style={styles.container}>
      {data?.map((_, idx) => {
        const inputRange = [
          (idx - 1) * screen_width,
          idx * screen_width,
          (idx + 1) * screen_width,
        ];
        const dotWidth = scrollX.interpolate({
          inputRange,
          outputRange: [12, 30, 12],
          extrapolate: "clamp",
        });

        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0.2, 1, 0.2],
          extrapolate: "clamp",
        });
        return (
          <Animated.View
            key={idx.toString()}
            style={[
              styles.dot,
              { width: dotWidth, opacity },
              idx === index && styles.isActive,
            ]}
          />
        );
      })}
    </View>
  );
};

export default Pagination;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 10,
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 3,
    backgroundColor: "#ccc",
  },
  isActive: {
    backgroundColor: "#378FFF",
  },
});
