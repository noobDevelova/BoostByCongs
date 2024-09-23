import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { FormAccount, PageHeader, DialogBox } from "../../../../components";
import { useDispatch, useSelector } from "react-redux";
import { uploadUserInGameAccount } from "../../../../store/user/thunks";
import { useNavigation } from "@react-navigation/native";
import { useNotifications } from "react-native-notificated";

const AddInGameAccount = () => {
  const [isShow, setShow] = useState(false);
  const [inGameData, setInGameData] = useState();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { notify } = useNotifications();
  const [isLoading, setLoading] = useState(false);
  const { userLoading } = useSelector((state) => state.userData);

  const handleUploadUserInGameAccount = (ingameData) => {
    try {
      setLoading(true);
      dispatch(uploadUserInGameAccount(ingameData));

      notify("notification", {
        params: {
          messages: `Menambahkan Akun ${ingameData.nickname}`,
          title: "Berhasil",
          status: "success",
        },
        config: {
          duration: 2000,
        },
      });
    } catch (error) {
      console.log(error);
    } finally {
      navigation.navigate("InGame");
      setLoading(false);
    }
  };

  const handleShow = (data) => {
    setInGameData(data);
    setShow(true);
  };

  const handleCancel = () => {
    setShow(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <PageHeader page="Akun In-Game" subPage="Tambah Akun" />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <FormAccount handleUpload={handleShow} />

        <DialogBox
          isVisible={isShow}
          variant="warning"
          title="Yuk, Periksa Sekali Lagi Sebelum Submit!"
          message="Sebelum menambahkan akun baru, pastikan semuanya sudah benar ya. Terima kasih!"
          onCancel={handleCancel}
          onConfirm={handleUploadUserInGameAccount}
          data={inGameData}
          isLoading={isLoading || userLoading}
        />
      </ScrollView>
    </View>
  );
};

export default AddInGameAccount;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F9F9F9",
    flex: 1,
  },

  header: {
    paddingHorizontal: 16,
    backgroundColor: "#fff",
    paddingBottom: 16,
  },
  scrollContainer: {
    paddingVertical: 20,
    paddingHorizontal: 16,
    flexGrow: 1,
  },
});
