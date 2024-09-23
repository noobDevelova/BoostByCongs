import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import Constants from "expo-constants";
import SearchHeader from "../SearchHeader";
import fonts from "../../../utilities/fonts";

const ListOrderHeader = ({
  searchQuery,
  setSearchQuery,
  selectedStatus,
  setSelectedStatus,
}) => {
  const handleSortOrder = (status) => {
    setSelectedStatus(status);
  };
  const getSortBtnStyle = (status) => {
    return status === selectedStatus
      ? [styles.btnSort, styles.btnSortSelected]
      : [styles.btnSort];
  };

  return (
    <View style={styles.container}>
      <SearchHeader
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        placeholder="Cari order"
      />
      <View style={styles.btnSortWrapper}>
        {["Semua", "Pending", "On Process", "Done"].map((status) => (
          <TouchableOpacity
            key={status}
            style={getSortBtnStyle(status)}
            onPress={() => handleSortOrder(status)}
          >
            <Text style={styles.btnSortText}>{status}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default ListOrderHeader;

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight + 10,
  },

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

  btnSortSelected: {
    borderBottomWidth: 2,
    borderBottomColor: "#378FFF",
  },

  btnSortText: {
    fontSize: fonts.size.font14,
    fontFamily: fonts.fontFamily.regular,
    lineHeight: 19.6,
  },
});
