import { StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import Constants from "expo-constants";
import { Search } from "../../../assets/icon";

const SearchHeader = ({ searchQuery, setSearchQuery, placeholder }) => {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.inputWrapper}>
        <Search />
        <TextInput
          style={styles.searchInput}
          placeholder={placeholder}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>
    </View>
  );
};

export default SearchHeader;

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: "#fff",
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    gap: 8,
  },
  searchInput: {
    height: 40,
    width: "100%",
  },
});
