import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import Constants from "expo-constants";

const KeyboardAvoidingContainer = ({ children }) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "position" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.contentContainerStyle}
        >
          {children}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default KeyboardAvoidingContainer;

const styles = StyleSheet.create({
  contentContainerStyle: {
    // paddingTop: Platform.OS === "android" ? Constants.statusBarHeight + 10 : 10,
  },
});
