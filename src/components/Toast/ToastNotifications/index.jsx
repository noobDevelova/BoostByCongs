import { StyleSheet, Text, View } from "react-native";
import React from "react";
import {
  Close,
  ErrorNotif,
  SuccessNotif,
  WarningNotif,
} from "../../../assets/icon";
import ButtonIcon from "../../ButtonIcon";
import fonts from "../../../utilities/fonts";
import { useNotificationController } from "react-native-notificated";

const ToastNotifications = ({ status, title, messages }) => {
  const { remove } = useNotificationController();

  const statusIcon = {
    success: <SuccessNotif />,
    error: <ErrorNotif />,
    warning: <WarningNotif />,
  };

  const statusStyle = {
    success: {
      borderColor: "#6FCF97",
    },
    error: {
      borderColor: "#EB5757",
    },
    warning: {
      borderColor: "#F2C94C",
    },
  };

  return (
    <View style={[styles.container, statusStyle[status]]}>
      <View style={styles.innerWrapper}>
        {statusIcon[status]}
        <View style={styles.wrapper}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.message}>{messages}</Text>
        </View>
      </View>
      <ButtonIcon Icon={Close} onPress={() => remove()} />
    </View>
  );
};

export default ToastNotifications;

const styles = StyleSheet.create({
  container: {
    padding: 12,
    flexDirection: "row",
    borderRadius: 6,
    borderWidth: 1,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 26,
    elevation: 5,
    backgroundColor: "#fff",
  },

  innerWrapper: {
    alignItems: "center",
    flexDirection: "row",
    marginRight: "auto",
    gap: 12,
  },

  wrapper: {
    gap: 4,
  },

  title: {
    fontSize: fonts.size.font16,
    fontFamily: fonts.fontFamily.semiBold,
    lineHeight: 20,
    color: "#333",
  },
  message: {
    fontSize: fonts.size.font14,
    fontFamily: fonts.fontFamily.regular,
    lineHeight: 20,
    color: "#4D4D4D",
    flexShrink: 1,
    flexWrap: "wrap",
    maxWidth: "95%",
  },
});
