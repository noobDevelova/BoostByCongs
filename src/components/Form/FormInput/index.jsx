import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Easing,
  Platform,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import fonts from "../../../utilities/fonts";
import { EyeClose, EyeOpen } from "../../../assets/icon";
import withShowPassword from "../../../utilities/withShowPassword";
// import { TextInput } from "@gorhom/bottom-sheet";

/**
 * FormInput Component
 *
 * A reusable input component that handles different types of input fields, including text, email, and password.
 * It supports validation messages and toggling the visibility of password fields.
 *
 * @param {Object} props - The properties object.
 * @param {string} props.placeholder - The placeholder text for the input field.
 * @param {string} props.value - The current value of the input field.
 * @param {boolean} props.isShow - A boolean indicating if the password should be shown. Managed by HOC withShowPassword.
 * @param {Function} props.toggle - A function to toggle the visibility of the password. Managed by HOC withShowPassword.
 * @param {string} props.keyboard - The type of keyboard to display, e.g., "default", "email-address".
 * @param {Function} props.onChange - The function to call when the text in the input field changes.
 * @param {string} props.type - The type of the input field, e.g., "text", "email", "password".
 * @param {string} [props.msg] - The validation message to display, if any.
 *
 * @returns {React.Component} The Input component.
 *
 * @example
 * <FormInput
 *   placeholder="Enter your email"
 *   value={email}
 *   type="email"
 *   keyboard="email-address"
 *   onChange={handleEmailChange}
 *   msg={emailError}
 * />
 */

const FormInput = ({
  value,
  isShow,
  toggle,
  setFieldValue,
  onChange,
  type,
  msg,
  label,
  frameType = "page",
}) => {
  const transY = useRef(new Animated.Value(0));
  const borderWidth = useRef(new Animated.Value(1));
  const [isFocused, setFocused] = useState(false);

  const handleFocus = () => {
    setFocused(true);
    animateTransform(-22);
    animateBorderWidth(2);
  };

  const handleBlur = () => {
    setFocused(false);
    if (!value) {
      animateTransform(0);
      animateBorderWidth(1);
    }
  };

  const animateTransform = (toValue) => {
    Animated.timing(transY.current, {
      toValue,
      duration: 300,
      useNativeDriver: true,
      easing: Easing.ease,
    }).start();
  };

  const animateBorderWidth = (toValue) => {
    Animated.timing(borderWidth.current, {
      toValue,
      duration: 300,
      useNativeDriver: false,
      easing: Easing.ease,
    }).start();
  };
  const transX = transY.current.interpolate({
    inputRange: [-120, 0],
    outputRange: [-40, 0],
    extrapolate: "clamp",
  });

  const borderColor = borderWidth.current.interpolate({
    inputRange: [1, 2],
    outputRange: [msg ? "#F04438" : "#7B7B7B", msg ? "#F04438" : "#0055FF"],
    extrapolate: "clamp",
  });

  const labelColor = borderWidth.current.interpolate({
    inputRange: [0, 2],
    outputRange: [msg ? "#F04438" : "#7B7B7B", msg ? "#F04438" : "#000000"],
    extrapolate: "clamp",
  });

  const fontSize = borderWidth.current.interpolate({
    inputRange: [0, 2],
    outputRange: [fonts.size.font16, fonts.size.font12],
    extrapolate: "clamp",
  });

  useEffect(() => {
    if (value || isFocused) {
      animateTransform(-22);
      animateBorderWidth(2);
    } else {
      animateTransform(0);
      animateBorderWidth(1);
    }
  }, [value]);

  const parseHandleChange = (val) => {
    const parsedVal = val === "" ? "" : Number(val);
    setFieldValue(parsedVal);
  };

  return (
    <View style={styles.inputContainer}>
      <Animated.View
        style={[
          type === "textarea" ? styles.textAreaWrapper : styles.inputWrapper,
          { borderWidth: borderWidth.current, borderColor },
        ]}
      >
        {/* @props.type === email OR @props.type === text OR @props.type === number*/}

        {(type === "email" || type === "text") &&
          (frameType === "page" ? (
            <TextInput
              style={styles.input}
              value={value}
              onChangeText={(val) => onChange(val)}
              onFocus={handleFocus}
              onBlur={handleBlur}
              keyboardType={
                type === "text" || type === "email" ? "default" : "numeric"
              }
            />
          ) : (
            <TextInput
              style={styles.input}
              value={value}
              onChangeText={(val) => onChange(val)}
              onFocus={handleFocus}
              onBlur={handleBlur}
              keyboardType={
                type === "text" || type === "email" ? "default" : "numeric"
              }
            />
          ))}

        {type === "textarea" &&
          (frameType === "page" ? (
            <TextInput
              style={styles.input}
              multiline={true}
              numberOfLines={10}
              value={value}
              onChangeText={(val) => onChange(val)}
              onFocus={handleFocus}
              onBlur={handleBlur}
              keyboardType="text"
            />
          ) : (
            <TextInput
              style={styles.input}
              multiline={true}
              numberOfLines={10}
              defaultValue={value}
              onChangeText={(val) => onChange(val)}
              onFocus={handleFocus}
              onBlur={handleBlur}
              keyboardType="text"
            />
          ))}
        {type === "number" &&
          (frameType === "page" ? (
            <TextInput
              style={styles.input}
              value={value}
              onChangeText={parseHandleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              keyboardType="numeric"
            />
          ) : (
            <TextInput
              style={styles.input}
              value={value}
              onChangeText={parseHandleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              keyboardType="numeric"
            />
          ))}

        {/* @props.type === password*/}

        {type === "password" && (
          <View style={styles.passwordWrapper}>
            {frameType === "page" ? (
              <TextInput
                style={styles.inputPassword}
                secureTextEntry={!isShow}
                value={value}
                onChangeText={(val) => onChange(val)}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
            ) : (
              <TextInput
                style={styles.inputPassword}
                secureTextEntry={!isShow}
                value={value}
                onChangeText={(val) => onChange(val)}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
            )}
            <TouchableOpacity style={styles.eye} onPress={toggle}>
              {isShow ? <EyeClose /> : <EyeOpen />}
            </TouchableOpacity>
          </View>
        )}
        <Animated.View
          style={[
            styles.labelContainer,
            {
              transform: [
                { translateY: transY.current },
                { translateX: transX },
              ],
            },
          ]}
        >
          <Animated.Text
            style={[styles.label, { color: labelColor, fontSize }]}
          >
            {label}
          </Animated.Text>
        </Animated.View>
      </Animated.View>
      {msg && (
        <View style={styles.msgWrapper}>
          <Text style={styles.textError}>{msg}</Text>
        </View>
      )}
    </View>
  );
};

export default withShowPassword(FormInput);

const styles = StyleSheet.create({
  inputContainer: {
    position: "relative",
  },
  input: {
    fontSize: fonts.size.font14,
    fontFamily: fonts.fontFamily.regular,
    width: "100%",
    color: "#030303",
    flex: 1,
  },

  inputPassword: {
    fontSize: fonts.size.font14,
    fontFamily: fonts.fontFamily.regular,
    width: "100%",
    color: "#030303",
    flex: 1,
  },
  inputWrapper: {
    padding: 12,
    borderRadius: 8,
    backgroundColor: "#FFF",
    height: 50,
  },

  textAreaWrapper: {
    padding: 12,
    borderRadius: 8,
    backgroundColor: "#FFF",
    height: 100,
  },

  passwordWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  msgWrapper: {
    marginLeft: 10,
  },
  textError: {
    color: "#F04438",
    fontFamily: fonts.fontFamily.medium,
  },
  labelContainer: {
    position: "absolute",
    top: 14,
    left: 20,
    backgroundColor: "#FFF",
    paddingHorizontal: 2,
  },
  label: {
    fontFamily: fonts.fontFamily.medium,
  },
});
