import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { DialogBox, FormAccount, PageHeader } from "../../../../components";
import { useDispatch, useSelector } from "react-redux";
import { updateUserInGameAccount } from "../../../../store/user/thunks";
import { useNavigation } from "@react-navigation/native";
import { useNotifications } from "react-native-notificated";

const EditInGameAccount = ({ route }) => {
  const [isShow, setShow] = useState(false);
  const [updatedData, setUpdatedData] = useState();
  const { id } = route.params;
  const inGameData = useSelector((state) => state.userData.userIngameAccount);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { notify } = useNotifications();

  const acc = (id) => {
    return inGameData.filter((row) => row.id === id).pop();
  };

  const handleUpdate = (updatedData) => {
    try {
      dispatch(updateUserInGameAccount(updatedData));

      notify("notification", {
        params: {
          messages: `Update Akun ${updatedData.nickname}`,
          title: "Berhasil",
          status: "success",
        },
        config: {
          duration: 2000,
        },
      });

      navigation.navigate("InGame");
    } catch (error) {
      console.log(error);
    }
  };

  const handleShow = (data) => {
    setUpdatedData(data);
    setShow(true);
  };

  const handleCancel = () => {
    setShow(false);
  };

  return (
    <View style={styles.container}>
      <PageHeader page="Akun In-Game" subPage="Edit Akun" />
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <DialogBox
          isVisible={isShow}
          variant="warning"
          title="Cek Ulang Sebelum Menyimpan Perubahan"
          message="Sebelum menyimpan perubahan, pastikan semua informasi sudah tepat. Terima kasih atas kerjasamanya!"
          onCancel={handleCancel}
          onConfirm={handleUpdate}
          data={updatedData}
        />
        <FormAccount initialValues={acc(id)} handleUpload={handleShow} />
      </ScrollView>
    </View>
  );
};

export default EditInGameAccount;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    backgroundColor: "#F9F9F9",
    flex: 1,
  },
  scrollContainer: {
    paddingVertical: 20,
    flexGrow: 1,
  },
});
