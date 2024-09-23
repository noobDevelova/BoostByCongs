import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const ButtonIcon = ({ navigateTo, Icon, type, onPress }) => {
  const navigation = useNavigation();
  return (
    <View>
      <TouchableOpacity
        onPress={
          type === "linking" ? () => navigation.navigate(navigateTo) : onPress
        }
        style={styles.buttonRange}
      >
        <Icon />
      </TouchableOpacity>
    </View>
  );
};

export default ButtonIcon;

const styles = StyleSheet.create({});
