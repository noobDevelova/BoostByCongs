import { BackHandler, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import {
  CheckoutOrderLayout,
  DialogBox,
  PageHeader,
} from "../../../../components";
import { useDispatch, useSelector } from "react-redux";
import { clearTemporaryOrder } from "../../../../store/user/thunks";

const Checkout = ({ navigation }) => {
  const dispatch = useDispatch();
  const temporaryData = useSelector((state) => state.userData.temporaryOrder);
  const [isBackDialogVisible, setBackDialogVisible] = useState(false);

  const handleCloseBackDialog = () => {
    setBackDialogVisible(false);
  };

  const handleShowBackDialog = () => {
    setBackDialogVisible(true);
  };

  const handleConfirmBackDialog = async () => {
    await dispatch(clearTemporaryOrder());
    setBackDialogVisible(false);
    navigation.navigate("Beranda");
  };

  useEffect(() => {
    const backAction = () => {
      setBackDialogVisible(true);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    const beforeRemoveListener = navigation.addListener("beforeRemove", (e) => {
      if (!isBackDialogVisible) {
        e.preventDefault();
        setBackDialogVisible(true);
      }
    });

    return () => {
      backHandler.remove();
      navigation.removeListener("beforeRemove", beforeRemoveListener);
    };
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <PageHeader
          subPage="Checkout"
          page="Order"
          onBackPress={handleShowBackDialog}
        />
      </View>
      <ScrollView style={styles.body}>
        <CheckoutOrderLayout orderData={temporaryData} />
      </ScrollView>

      <DialogBox
        variant="info"
        isVisible={isBackDialogVisible}
        title="Order belum disimpan"
        message="Order anda belum disimpan, apakah anda yakin ingin kembali?"
        onCancel={handleCloseBackDialog}
        onConfirm={handleConfirmBackDialog}
      />
    </View>
  );
};

export default Checkout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  header: {
    paddingHorizontal: 16,
    backgroundColor: "#fff",
    paddingBottom: 10,
  },

  body: {
    paddingHorizontal: 16,
    backgroundColor: "#F8F9FD",
  },
});
