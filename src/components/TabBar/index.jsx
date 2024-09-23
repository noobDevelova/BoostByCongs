import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";

const TopBarContainer = ({ state, descriptors, navigation }) => {
  return (
    <View style={styles.tabBarContainer}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={index}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.tab}
          >
            <Text style={{ color: isFocused ? "#378FFF" : "#000" }}>
              {label}
            </Text>
            {isFocused && <View style={styles.indicator} />}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default TopBarContainer;

const styles = StyleSheet.create({
  tabBarContainer: {
    flexDirection: "row",
    paddingHorizontal: 16,
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#FFF",
  },
  tab: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 14,
  },
  indicator: {
    position: "absolute",
    bottom: 0,
    height: 2,
    width: "100%",
    backgroundColor: "#378FFF",
  },
});
