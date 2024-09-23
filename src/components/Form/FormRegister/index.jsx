import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import FormInput from "../FormInput";
import LinearBtn from "../../Button";
import { Formik } from "formik";
import {
  useRegisterValidationScheme,
  initialSignUpScheme,
} from "../../../schema";
import FormError from "../FormError";
import { useDispatch, useSelector } from "react-redux";
import { signUpUser } from "../../../store/auth/thunks";

const FormRegister = ({ email }) => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);
  const [statusMessages, setStatusMessage] = useState("");
  const [isLoading, setLoading] = useState(false);

  const handleSignUp = (registerData) => {
    try {
      setLoading(true);
      const datas = {
        email: email,
        ...registerData,
      };
      const actionResult = dispatch(signUpUser(datas));
      if (signUpUser.fulfilled.match(actionResult)) {
        setStatusMessage({ success: true, error_message: "" });
      } else if (actionResult.payload && actionResult.payload_error_message) {
        setStatusMessage({
          success: false,
          error_message: actionResult.payload.error_message,
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Formik
        initialValues={initialSignUpScheme}
        validationSchema={useRegisterValidationScheme}
        onSubmit={(values) => {
          handleSignUp(values);
          console.log(values);
        }}
        validateOnChange={false}
      >
        {({ handleChange, handleSubmit, values, errors, isSubmitting }) => (
          <View style={styles.inputWrapper}>
            <FormInput
              label="Username"
              type="text"
              keyboard="default"
              value={values.username}
              onChange={handleChange("username")}
              msg={!isSubmitting && errors.username}
            />
            <FormInput
              label="Password"
              type="password"
              keyboard="default"
              value={values.password}
              onChange={handleChange("password")}
              msg={!isSubmitting && errors.password}
            />
            <FormInput
              label="Konfirmasi Password"
              type="password"
              keyboard="default"
              value={values.passwordConfirmation}
              onChange={handleChange("passwordConfirmation")}
              msg={!isSubmitting && errors.passwordConfirmation}
            />

            <View style={styles.btnWrapper}>
              <LinearBtn
                title="Daftar"
                onPress={handleSubmit}
                isLoading={isLoading || loading}
              />
            </View>
          </View>
        )}
      </Formik>
      {statusMessages.success === false && (
        <FormError msg={statusMessages.error_message} />
      )}
    </SafeAreaView>
  );
};

export default FormRegister;

const styles = StyleSheet.create({
  inputWrapper: {
    flexDirection: "column",
    gap: 8,
  },
  btnWrapper: {
    marginTop: 15,
  },
});
