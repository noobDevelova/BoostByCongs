import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import FormInput from "../FormInput";
import LinearBtn from "../../Button";
import FormError from "../FormError";
import { Formik } from "formik";
import { useLoginValidateScheme } from "../../../schema";
import { useDispatch, useSelector } from "react-redux";
import { signInUser } from "../../../store/auth/thunks";
import NavigateLink from "../../NavigateLink";
import { unwrapResult } from "@reduxjs/toolkit";

/**
 * FormLogin Component
 *
 * A form component for user login. It uses Formik for form state management
 * and Yup for validation.
 *
 * @returns {React.Component} The FormLogin component.
 */

const FormLogin = () => {
  const dispatch = useDispatch();
  const [statusMessage, setStatusMessage] = useState({});
  const { authLoading } = useSelector((state) => state.auth);
  const [isLoading, setLoading] = useState(false);

  /**
   * Function to handle user login.
   * @param {string} email - The email address of the user.
   * @param {string} password - The password of the user.
   */

  const handleKeyboardDismiss = () => {
    Keyboard.dismiss();
  };

  const handleLogin = async (email, password) => {
    try {
      const actionResult = await dispatch(signInUser({ email, password }));
      unwrapResult(actionResult);
    } catch (error) {
      setStatusMessage({
        ...error,
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <TouchableWithoutFeedback onPress={handleKeyboardDismiss}>
      <View>
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={useLoginValidateScheme}
          onSubmit={(values) => {
            setLoading(true);
            handleLogin(values.email, values.password);
          }}
          validateOnChange={false}
        >
          {({ handleChange, handleSubmit, values, errors, isSubmitting }) => (
            <View style={styles.inputContainer}>
              <View style={styles.inputWrapper}>
                <FormInput
                  style={styles.input}
                  onChange={handleChange("email")}
                  value={values.email}
                  keyboard="email-address"
                  type="email"
                  msg={!isSubmitting && errors.email}
                  label="Email"
                />

                <FormInput
                  style={styles.input}
                  onChange={handleChange("password")}
                  value={values.password}
                  keyboard="default"
                  type="password"
                  msg={!isSubmitting && errors.password}
                  label="Password"
                />
              </View>

              {statusMessage.success === false && (
                <FormError msg={statusMessage.error_message} />
              )}
              <View style={styles.wrapper}>
                <NavigateLink
                  linkTitle="Lupa Password?"
                  linkTo="ForgotPassword"
                />
              </View>

              <View style={styles.btnWrapper}>
                <LinearBtn
                  title="Masuk"
                  onPress={handleSubmit}
                  isLoading={isLoading || authLoading}
                />
              </View>
            </View>
          )}
        </Formik>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default FormLogin;

const styles = StyleSheet.create({
  inputContainer: {
    marginTop: 13,
    flexDirection: "column",
  },
  inputWrapper: {
    flexDirection: "column",
    gap: 8,
  },
  btnWrapper: {
    marginTop: 15,
  },
  wrapper: {
    marginLeft: "auto",
    marginTop: 22,
  },
});
