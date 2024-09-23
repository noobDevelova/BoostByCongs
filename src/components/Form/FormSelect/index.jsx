import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { SelectList } from "react-native-dropdown-select-list";

const FormSelect = ({
  data,
  setSelected,
  msg,
  placeholder,
  inputStyles,
  defaultOption,
}) => {
  return (
    <View style={styles.container}>
      <SelectList
        data={data}
        setSelected={setSelected}
        placeholder={placeholder}
        save="value"
        search={false}
        boxStyles={{ borderRadius: 8 }}
        inputStyles={inputStyles}
        defaultOption={defaultOption}
      />
      
      {msg && (
        <View style={styles.msgWrapper}>
          <Text style={styles.textError}>{msg}</Text>
        </View>
      )}
    </View>
  );
};

export default FormSelect;

const styles = StyleSheet.create({});
