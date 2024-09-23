import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import Modal from "react-native-modal";
import fonts from "../../utilities/fonts";
import {
  Add,
  ErrorNotif,
  Info,
  Minus,
  Star,
  WarningNotif,
} from "../../assets/icon";

const DialogBox = ({
  variant,
  title,
  message,
  isVisible,
  onCancel,
  onConfirm,
  data,
  setCount,
  count,
  hasInput,
  isLoading,
}) => {
  const variantIcon = {
    warning: <WarningNotif />,
    error: <ErrorNotif />,
    info: <Info />,
  };

  const handleIncrement = () => {
    setCount((prevCount) =>
      prevCount < data.estimatedStar ? prevCount + 1 : data.estimatedStar
    );
  };

  const handleDecrement = () => {
    setCount((prevCount) => (prevCount > 0 ? prevCount - 1 : 0));
  };

  return (
    <Modal isVisible={isVisible}>
      <View style={styles.modalContainer}>
        <View style={styles.modalHeader}>
          {variantIcon[variant]}
          <Text style={styles.modalTitle}>{title}</Text>
        </View>
        <View style={styles.modalBody}>
          <Text style={styles.modalDescription}>{message}</Text>
          {hasInput && (
            <View style={styles.inputWrapper}>
              <View style={styles.counterWrapper}>
                <TouchableOpacity
                  onPress={handleIncrement}
                  style={styles.btnCounter}
                >
                  <Add />
                </TouchableOpacity>
                <View style={styles.valueCount}>
                  <Star />
                  <Text style={styles.value}>{count}</Text>
                </View>
                <TouchableOpacity
                  onPress={handleDecrement}
                  style={styles.btnCounter}
                >
                  <Minus width={18} height={18} />
                </TouchableOpacity>
              </View>

              <Text style={styles.modalDescription}>
                Membutuhkan{" "}
                <Text style={styles.highlight}>{data?.estimatedStar}</Text>{" "}
                bintang untuk mencapai rank{" "}
                <Text style={styles.highlight}>{data?.nextRank}</Text>
              </Text>
            </View>
          )}
        </View>
        <View style={styles.modalFooter}>
          <TouchableOpacity
            style={styles.cancelBtn}
            onPress={onCancel}
            disabled={isLoading}
          >
            <Text style={styles.cancelBtnText}>Kembali</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.confirmBtn}
            onPress={() => onConfirm(data)}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator size="small" />
            ) : (
              <Text style={styles.confirmBtnText}>Lanjut</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default DialogBox;

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: "#F8F8F8",
    padding: 24,
    borderRadius: 6,
    gap: 8,
  },

  modalHeader: {
    borderBottomWidth: 2,
    borderBottomColor: "#D5D5D5",
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 5,
    alignItems: "center",
    paddingBottom: 11,
  },

  modalTitle: {
    flexShrink: 1,
    flexWrap: "wrap",
    fontSize: fonts.size.font14,
    fontFamily: fonts.fontFamily.semiBold,
    color: "#222",
  },

  modalDescription: {
    fontSize: fonts.size.font12,
    fontFamily: fonts.fontFamily.regular,
    lineHeight: 24,
    color: "#222",
  },

  modalFooter: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    justifyContent: "flex-end",
  },

  cancelBtn: {
    paddingHorizontal: 22,
    paddingTop: 8.5,
    paddingBottom: 10.5,
    borderWidth: 2,
    borderColor: "#D5D5D5",
    borderRadius: 50,
  },
  confirmBtn: {
    paddingHorizontal: 22,
    paddingTop: 8.5,
    paddingBottom: 10.5,
    borderRadius: 50,
    backgroundColor: "#0265DC",
  },

  cancelBtnText: {
    fontSize: fonts.size.font14,
    fontFamily: fonts.fontFamily.semiBold,
    lineHeight: 24,
    color: "#222",
  },

  confirmBtnText: {
    fontSize: fonts.size.font14,
    fontFamily: fonts.fontFamily.semiBold,
    lineHeight: 24,
    color: "#FFF",
  },

  counterWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    marginTop: 10,
    alignSelf: "center",
  },
  btnCounter: {
    backgroundColor: "#0265DC",
    padding: 5,
    borderRadius: 10,
  },

  valueCount: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },

  value: {
    fontSize: fonts.size.font14,
    fontFamily: fonts.fontFamily.semiBold,
  },

  inputWrapper: {
    flexDirection: "column",
    marginVertical: 8,
    gap: 8,
  },

  highlight: {
    fontSize: fonts.size.font12,
    fontFamily: fonts.fontFamily.bold,
  },
});
