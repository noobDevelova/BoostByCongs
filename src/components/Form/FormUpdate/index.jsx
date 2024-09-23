import {
  Keyboard,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React from "react";
import { Formik } from "formik";
import {
  initialValidatorSelector,
  validatorSelector,
} from "../../../schema/useValidationSelector";
import FormInput from "../FormInput";
import LinearBtn from "../../Button";

const FormUpdate = ({
  label,
  type,
  value,
  handleVal,
  handleAction,
  frameType,
  inpType,
}) => {
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <Formik
        initialValues={initialValidatorSelector(type, value)}
        validationSchema={validatorSelector(type)}
        onSubmit={async (values) => {
          handleAction();
          console.log(values);
        }}
        validateOnChange={false}
      >
        {({ handleChange, handleSubmit, values, errors, isSubmitting }) => (
          <View style={styles.inputContainer}>
            <View style={styles.inputWrapper}>
              <FormInput
                style={styles.input}
                onChange={(val) => {
                  handleChange(type)(val);
                  handleVal(val);
                }}
                value={values[type]}
                keyboard={type}
                type={inpType ? inpType : type}
                msg={!isSubmitting && errors[type]}
                label={label}
                frameType={frameType}
              />
            </View>

            <LinearBtn title="Update" onPress={handleSubmit} />
          </View>
        )}
      </Formik>
    </TouchableWithoutFeedback>
  );
};

export default FormUpdate;

const styles = StyleSheet.create({
  inputContainer: {
    marginTop: 13,
    flexDirection: "column",
    gap: 20,
  },
  inputWrapper: {
    flexDirection: "column",
    gap: 28,
  },
  wrapper: {
    marginLeft: "auto",
    marginTop: 22,
  },
});
