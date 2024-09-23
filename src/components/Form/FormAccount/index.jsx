import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useRef, useState } from "react";

import LinearBtn from "../../Button";
import { Formik } from "formik";
import FormInput from "../FormInput";
import FormSelect from "../FormSelect";
import {
  inGameAccountInitialValue,
  useInGameAccountValidationScheme,
} from "../../../schema/useAddInGameAccountScheme";

const FormAccount = ({ handleUpload, initialValues = null }) => {
  const [selectedMethod, setSelectedMethod] = useState("");
  const [tierData, setTierData] = useState([]);
  const [starData, setStarData] = useState([]);

  const loginMethod = [
    { key: "1", value: "Email" },
    { key: "2", value: "No. Telp" },
  ];

  const rankData = [
    { key: "1", value: "Warrior" },
    { key: "2", value: "Elite" },
    { key: "3", value: "Master" },
    { key: "4", value: "Grandmaster" },
    { key: "5", value: "Epic" },
    { key: "6", value: "Legend" },
    { key: "7", value: "Mythic" },
    { key: "8", value: "Mythic Honor" },
    { key: "9", value: "Mythic Glory" },
    { key: "10", value: "Mythic Immortal" },
  ];
  const viaLogin = [
    { key: "1", value: "Moonton" },
    { key: "2", value: "TikTok" },
    { key: "3", value: "Google Play" },
    { key: "4", value: "VK" },
    { key: "5", value: "Facebook" },
  ];

  const handleRankChange = (rank, setFieldValue) => {
    setFieldValue("rank", rank);

    switch (rank) {
      case "Mythic":
        setTierData([]);
        setStarData(
          Array.from({ length: 24 }, (_, i) => ({
            key: `${i + 1}`,
            value: `${i + 1}`,
          }))
        );
        break;
      case "Mythic Honor":
        setTierData([]);
        setStarData(
          Array.from({ length: 26 }, (_, i) => ({
            key: `${i + 25}`,
            value: `${i + 25}`,
          }))
        );
        break;
      case "Mythic Glory":
        setTierData([]);
        setStarData(
          Array.from({ length: 51 }, (_, i) => ({
            key: `${i + 50}`,
            value: `${i + 50}`,
          }))
        );
        break;
      case "Mythic Immortal":
        setTierData([]);
        setStarData(
          Array.from({ length: 50 }, (_, i) => ({
            key: `${i + 101}`,
            value: `${i + 101}`,
          }))
        );
        break;
      default:
        setTierData([
          { key: "1", value: "I" },
          { key: "2", value: "II" },
          { key: "3", value: "III" },
          { key: "4", value: "IV" },
          { key: "5", value: "V" },
        ]);
        setStarData([
          { key: "1", value: "1" },
          { key: "2", value: "2" },
          { key: "3", value: "3" },
          { key: "4", value: "4" },
          { key: "5", value: "5" },
        ]);
    }
  };

  useEffect(() => {
    if (initialValues) {
      setSelectedMethod(initialValues.email ? "Email" : "No. Telp");
      handleRankChange(initialValues.rank, (field, value) => {
        if (field === "tier") setTierData(value);
        if (field === "star") setStarData(value);
      });
    }
  }, [initialValues]);

  const getInitialValues = () => {
    if (initialValues) {
      return initialValues;
    }

    return inGameAccountInitialValue(selectedMethod);
  };

  return (
    <View style={styles.container}>
      <Formik
        initialValues={getInitialValues()}
        validationSchema={useInGameAccountValidationScheme(selectedMethod)}
        onSubmit={async (values) => {
          const sanitazedValues = { ...values };

          if (selectedMethod === "Email") {
            delete sanitazedValues.phone_number;
          } else {
            delete sanitazedValues.email;
          }

          if (
            sanitazedValues.rank === "Mythic" ||
            sanitazedValues.rank === "Mythic Honor" ||
            sanitazedValues.rank === "Mythic Glory"
          ) {
            delete sanitazedValues.tier;
          }
          console.log(sanitazedValues);

          await handleUpload(sanitazedValues);
        }}
        validateOnChange={false}
      >
        {({
          handleChange,
          handleSubmit,
          setFieldValue,
          values,
          errors,
          isSubmitting,
        }) => (
          <View style={styles.formContainer}>
            <FormSelect
              data={viaLogin}
              setSelected={handleChange("login_via")}
              placeholder="Mau Login Via Apa?"
              msg={!isSubmitting && errors.login_via}
            />
            <FormSelect
              data={loginMethod}
              setSelected={(value) => {
                setSelectedMethod(value);
                setFieldValue(value === "Email" ? "email" : "phone_number");

                if (value === "Email") {
                  setFieldValue("phone_number", undefined);
                } else {
                  setFieldValue("email", undefined);
                }
              }}
              placeholder="Login menggunakan Email / No Telp"
            />
            {selectedMethod !== "" && (
              <FormInput
                label={selectedMethod === "Email" ? "Email" : "No. Telp"}
                type={selectedMethod === "Email" ? "text" : "number"}
                onChange={handleChange(
                  selectedMethod === "Email" ? "email" : "phone_number"
                )}
                value={
                  selectedMethod === "Email"
                    ? values.email
                    : values.phone_number
                }
                msg={
                  !isSubmitting && selectedMethod === "Email"
                    ? errors.email
                    : errors.phone_number
                }
              />
            )}
            <FormInput
              label="Nickname"
              type="text"
              onChange={handleChange("nickname")}
              value={values.nickname}
              msg={!isSubmitting && errors.nickname}
            />
            <FormInput
              label="User ID"
              type="text"
              onChange={handleChange("user_id")}
              value={values.user_id}
              msg={!isSubmitting && errors.user_id}
            />
            <FormSelect
              data={rankData}
              setSelected={(rank) => handleRankChange(rank, setFieldValue)}
              placeholder="Rank Anda"
              msg={!isSubmitting && errors.rank}
            />
            <View style={styles.wrapper}>
              {tierData.length > 0 && (
                <FormSelect
                  data={tierData}
                  setSelected={handleChange("tier")}
                  placeholder="Tier Anda"
                  inputStyles={{ width: 100 }}
                  msg={!isSubmitting && errors.tier}
                />
              )}
              <FormSelect
                data={starData}
                setSelected={handleChange("star")}
                placeholder="Star Anda"
                inputStyles={{ width: 100 }}
                msg={!isSubmitting && errors.star}
              />
            </View>
            <FormInput
              label="Level"
              type="text"
              onChange={handleChange("level")}
              value={values.level}
              msg={!isSubmitting && errors.level}
            />
            <FormInput
              label="Password"
              type="password"
              onChange={handleChange("password")}
              value={values.password}
              msg={!isSubmitting && errors.password}
            />

            <View style={styles.btnWrapper}>
              <LinearBtn title="Submit" onPress={handleSubmit} />
            </View>
          </View>
        )}
      </Formik>
    </View>
  );
};

export default FormAccount;

const styles = StyleSheet.create({
  container: {},
  formContainer: {
    gap: 10,
  },
  wrapper: {
    flexDirection: "row",
    position: "relative",
    justifyContent: "space-between",
  },

  btnWrapper: {
    marginVertical: 10,
  },
});
