import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import PageHeader from "../../PageHeader";
import fonts from "../../../utilities/fonts";

const ListBoostingHeader = ({ selectedCategory, setSelectedCategory }) => {
  const categoryType = {
    Semua: "semua",
    Paket: "paket",
    "Per Bintang": "unit",
  };

  const handleSortCategory = (category) => {
    setSelectedCategory(categoryType[category]);
  };

  const getSortBtnStyle = (category) => {
    return selectedCategory === categoryType[category]
      ? [styles.btnSort, styles.btnSortSelected]
      : [styles.btnSort];
  };

  return (
    <View style={styles.container}>
      <PageHeader subPage="List Boosting" page="Order" />
      <View style={styles.btnSortWrapper}>
        {["Semua", "Paket", "Per Bintang"].map((category) => (
          <TouchableOpacity
            key={category}
            style={getSortBtnStyle(category)}
            onPress={() => handleSortCategory(category)}
          >
            <Text style={styles.btnSortText}>{category}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default ListBoostingHeader;

const styles = StyleSheet.create({
  btnSortWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  btnSort: {
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderBottomWidth: 2,
    borderBottomColor: "#FFF",
  },

  btnSortText: {
    fontSize: fonts.size.font14,
    fontFamily: fonts.fontFamily.regular,
    lineHeight: 19.6,
  },

  btnSortSelected: {
    borderBottomWidth: 2,
    borderBottomColor: "#378FFF",
  },
});
