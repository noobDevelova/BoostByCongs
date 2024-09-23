import { Keyboard, StyleSheet, View } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import {
  AlertWarning,
  PageHeader,
  FormUpdate,
  AlertInfo,
  SheetFrame,
  FormError,
} from "../../../../components";
import { FIREBASE_AUTH } from "../../../../config";
import { useDispatch } from "react-redux";
import {
  sendVerificationEmailToUser,
  updateCurrentEmail,
} from "../../../../store/auth/thunks";
import { useNotifications } from "react-native-notificated";
import { unwrapResult } from "@reduxjs/toolkit";

const EmailSettings = () => {
  const [statusMessage, setStatusMessage] = useState({});
  const [newEmail, setNewEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [emailVerified, setEmailVerified] = useState(false);
  const [initialCheckDone, setInitialCheckDone] = useState(false);

  const auth = FIREBASE_AUTH;
  const dispatch = useDispatch();
  const sheetRef = useRef(null);
  const { notify } = useNotifications();

  const openSheet = () => {
    sheetRef.current?.open();
    Keyboard.dismiss();
  };

  const closeSheet = () => {
    sheetRef.current?.close();
  };

  const handleUpdateEmail = () => {
    try {
      const actionResult = dispatch(
        updateCurrentEmail({ newEmail, password: currentPassword })
      );

      unwrapResult(actionResult);

      setStatusMessage({
        success: true,
      });

      notify("notification", {
        params: {
          messages: `Jangan lupa untuk memverifikasi email baru anda, dan verifikasi untuk mengonfirmasi email baru Anda`,
          title: "Email Anda berhasil diperbarui! 🎉",
          status: "success",
        },
        config: {
          duration: 2000,
        },
      });

      closeSheet();
    } catch (error) {
      setStatusMessage({
        ...error,
      });
    }
  };

  const handleSendEmailVerification = () => {
    try {
      const actionResult = dispatch(
        sendVerificationEmailToUser(auth.currentUser)
      );

      unwrapResult(actionResult);

      notify("notification", {
        params: {
          messages: `Kami telah mengirimkan email verifikasi ke alamat email baru Anda. Silakan periksa kotak masuk Anda untuk menyelesaikan proses verifikasi.`,
          title: "Email Verifikasi Telah Terkirim",
          status: "success",
        },
        config: {
          duration: 3000,
        },
      });
    } catch (error) {
      setStatusMessage({
        success: false,
        error_message: "Terjadi Kesalahan Saat Mengirim Verifikasi Email",
      });
    }
  };

  useEffect(() => {
    const checkEmailVerification = async () => {
      try {
        await auth.currentUser.reload();

        const isVerified = auth.currentUser.emailVerified;

        if (!initialCheckDone) {
          setEmailVerified(isVerified);
          setInitialCheckDone(true);
        } else if (isVerified && !emailVerified) {
          setEmailVerified(true);
          notify("notification", {
            params: {
              messages: `Terima kasih telah melakukan verifikasi email Anda!`,
              title: "Email Telah Diverifikasi",
              status: "success",
            },
            config: {
              duration: 3000,
            },
          });
        }
      } catch (error) {
        console.log(error);
      }
    };

    const intervalId = setInterval(checkEmailVerification, 1000);
    return () => clearInterval(intervalId);
  }, [emailVerified, notify]);

  return (
    <View style={styles.container}>
      <PageHeader page="Email" subPage="Pengaturan Email" />
      <View style={styles.wrapper}>
        {!auth.currentUser.emailVerified ? (
          <AlertWarning
            title="Verifikasi Email"
            subTitle="Kami perhatikan email Anda belum terverifikasi. Yuk, verifikasi sekarang agar Anda bisa mengubah email dan menikmati semua fitur kami tanpa hambatan!"
            btnTitle="Kirim Link Verifikasi Email"
            onPress={handleSendEmailVerification}
          />
        ) : (
          <AlertInfo
            title="Update Email"
            subTitle="Ingin menggunakan email baru? Yuk, ubah email Anda sekarang!"
          />
        )}
        <View style={styles.formWrapper}>
          <FormUpdate
            type="email"
            label="Email"
            value={auth.currentUser.email}
            handleVal={setNewEmail}
            handleAction={openSheet}
            frameType="page"
          />
        </View>
      </View>
      {statusMessage.success === false && (
        <FormError msg={statusMessage.error_message} />
      )}
      <SheetFrame ref={sheetRef}>
        <AlertInfo
          title="Masukkan Password"
          subTitle="Demi keamanan, masukkan password Anda untuk mengubah email."
        />
        <FormUpdate
          type="password"
          label="Password"
          handleVal={setCurrentPassword}
          handleAction={handleUpdateEmail}
          frameType="sheet"
        />
        {statusMessage.success === false && (
          <FormError msg={statusMessage.error_message} />
        )}
      </SheetFrame>
    </View>
  );
};

export default EmailSettings;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    backgroundColor: "#F9F9F9",
    flex: 1,
  },
  wrapper: {
    marginTop: 18,
  },

  formWrapper: {
    marginTop: 15,
  },

  sheetContainer: {
    paddingHorizontal: 12,
  },
});
