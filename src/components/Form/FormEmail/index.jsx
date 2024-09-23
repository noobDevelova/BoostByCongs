import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import FormInput from "../FormInput";
import { Formik } from "formik";
import LinearBtn from "../../Button";
import {
  initialValidatorSelector,
  validatorSelector,
} from "../../../schema/useValidationSelector";
import { useDispatch, useSelector } from "react-redux";
import {
  isEmailExists,
  sendUserResetPassword,
} from "../../../store/auth/thunks";
import { unwrapResult } from "@reduxjs/toolkit";
import FormError from "../FormError";
import { useNotifications } from "react-native-notificated";

const FormEmail = ({ setAction, setEmail, checking }) => {
  const [statusMessages, setStatusMessage] = useState({
    success: "",
    message: "",
  });
  const [isLoading, setLoading] = useState(false);
  const initialScheme = initialValidatorSelector("email", "", "");
  const validate = validatorSelector("email");
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);
  const { notify } = useNotifications();

  const handleSubmitEmail = async (values) => {
    try {
      const response = await dispatch(isEmailExists(values.email));
      const result = unwrapResult(response);

      setLoading(true);
      if (checking) {
        if (!result.isExists) {
          setAction(true);
          setEmail(values.email);
        } else {
          setStatusMessage({
            success: false,
            message: "Email sudah ada yang memakai",
          });
        }
      } else {
        if (result.isExists) {
          await dispatch(sendUserResetPassword(values.email));

          notify("notification", {
            params: {
              messages: `Link reset password sudah dikirim ke email anda`,
              title: "Silahkan reset password anda",
              status: "success",
            },
            config: {
              duration: 2000,
            },
          });
        } else {
          setStatusMessage({
            success: false,
            message: "Email tidak ditemukan",
          });
        }
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
        initialValues={initialScheme}
        validationSchema={validate}
        onSubmit={(values) => {
          handleSubmitEmail(values);
          console.log(values);
        }}
        validateOnChange={false}
      >
        {({ handleChange, handleSubmit, values, errors, isSubmitting }) => (
          <View style={styles.inputWrapper}>
            <FormInput
              label="Email"
              type="email"
              keyboard="default"
              value={values.email}
              onChange={handleChange("email")}
              msg={!isSubmitting && errors.email}
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
        <FormError msg={statusMessages.message} />
      )}
    </SafeAreaView>
  );
};

export default FormEmail;

const styles = StyleSheet.create({
  inputWrapper: {
    flexDirection: "column",
    gap: 8,
  },

  btnWrapper: {
    marginTop: 15,
  },
});
