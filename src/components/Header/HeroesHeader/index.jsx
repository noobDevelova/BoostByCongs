import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import PageHeader from "../../PageHeader";
import SearchHeader from "../SearchHeader";
import fonts from "../../../utilities/fonts";

const HeroesHeader = ({
  searchQuery,
  setSearchQuery,
  selectedRole,
  setSelectedRole,
}) => {
  const handleSelectRole = (role) => {
    setSelectedRole(role);
  };

  const getPickerButtonStyle = (role) => {
    return role === selectedRole
      ? [styles.pickerBtn, styles.selectedPicker]
      : [styles.pickerBtn, styles.picker];
  };

  const getPickerTextStyle = (role) => {
    return role === selectedRole
      ? styles.selectedPickerText
      : styles.pickerText;
  };

  return (
    <View style={styles.headerWrapper}>
      <PageHeader page="Boosting" subPage="RequestHero" />
      <ScrollView
        horizontal={true}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <View style={styles.rolePicker}>
          {[
            "Semua",
            "Assassin",
            "Fighter",
            "Marksman",
            "Mage",
            "Support",
            "Tank",
          ].map((role) => (
            <TouchableOpacity
              key={role}
              style={getPickerButtonStyle(role)}
              onPress={() => handleSelectRole(role)}
            >
              <Text style={getPickerTextStyle(role)}>{role}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <View style={styles.searchWrapper}>
        <SearchHeader
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          placeholder="Cari Hero..."
        />
      </View>
    </View>
  );
};

export default HeroesHeader;

const styles = StyleSheet.create({
  headerWrapper: {
    paddingHorizontal: 16,
    backgroundColor: "#fff",
    paddingBottom: 10,
  },
  selectedPicker: {
    backgroundColor: "#378FFF",
    borderWidth: 0,
  },

  picker: {
    borderWidth: 1,
    borderColor: "#EDEDED",
    backgroundColor: "#F8F9FD",
  },

  selectedPickerText: {
    fontSize: fonts.size.font14,
    fontFamily: fonts.fontFamily.medium,
    color: "#fff",
  },

  pickerText: {
    color: "#4E4E50",
    fontSize: fonts.size.font14,
    fontFamily: fonts.fontFamily.regular,
  },

  pickerBtn: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 100,
  },

  rolePicker: {
    flexDirection: "row",
    gap: 8,
    paddingVertical: 8,
  },
});
