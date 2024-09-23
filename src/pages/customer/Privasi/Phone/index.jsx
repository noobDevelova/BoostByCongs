import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import {
  AlertInfo,
  AlertWarning,
  FormUpdate,
  PageHeader,
} from "../../../../components";
import { useDispatch, useSelector } from "react-redux";
import { updateUserPhoneNumber } from "../../../../store/user/thunks";
import { unwrapResult } from "@reduxjs/toolkit";
import { useNotifications } from "react-native-notificated";

const PhoneNumberSetting = () => {
  const [phoneNumber, setNewPhoneNumber] = useState("");
  const [statusMessage, setStatusMessage] = useState({});
  const dispatch = useDispatch();
  const { notify } = useNotifications();

  const userPhoneNumber =
    useSelector((state) => state.userData.userDetail.phone_number) || "";

  useEffect(() => {
    console.log(userPhoneNumber);
  }, []);

  const submitUpdate = () => {
    try {
      console.log(phoneNumber);
      const actionResult = dispatch(updateUserPhoneNumber(phoneNumber));

      unwrapResult(actionResult);

      setStatusMessage({
        success: true,
      });

      notify("notification", {
        params: {
          messages: `Sekarang anda bisa mendapatkan info terbaru dari admin`,
          title: "No. Telp berhasil diperbarui! 🎉",
          status: "success",
        },
        config: {
          duration: 2000,
        },
      });
    } catch (error) {
      console.log(error);

      setStatusMessage({
        ...error,
      });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <PageHeader page="Privasi" subPage="Pengaturan Email" />
      </View>
      <View style={styles.body}>
        {!userPhoneNumber ? (
          <AlertWarning
            title="Daftarkan Nomor Telepon Anda"
            subTitle="Kami perhatikan Anda belum mendaftarkan nomor telepon Anda. Yuk, daftarkan sekarang agar Admin bisa menghubungi anda jika anda order Boosting kami"
          />
        ) : (
          <AlertInfo
            title="Update No. Telp"
            subTitle="Ingin daftarkan No. Telp baru? Yuk, ubah No. Telp Anda sekarang!"
          />
        )}

        <FormUpdate
          type="phone_number"
          inpType="text"
          label="No. Telp"
          value={userPhoneNumber}
          handleVal={setNewPhoneNumber}
          handleAction={submitUpdate}
        />
      </View>
    </View>
  );
};

export default PhoneNumberSetting;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FD",
  },
  header: {
    paddingHorizontal: 16,
    backgroundColor: "#fff",
    paddingBottom: 10,
  },

  body: {
    padding: 16,
  },
});
