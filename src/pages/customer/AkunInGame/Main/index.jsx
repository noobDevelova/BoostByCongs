import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { AccountCard, DialogBox, PageHeader } from "../../../../components";
import { Sad } from "../../../../assets/img";
import fonts from "../../../../utilities/fonts";
import LinearBtn from "../../../../components/Button";
import { useDispatch, useSelector } from "react-redux";
import { deleteUserInGameAccount } from "../../../../store/user/thunks";
import { createNotifications } from "react-native-notificated";

const MainInGame = ({ navigation }) => {
  const [isShow, setShow] = useState(false);
  const [selectedId, setSelectedId] = useState("");
  const dispatch = useDispatch();
  const { notify } = createNotifications();

  const { userLoading, userIngameAccount, userDetail, userError } = useSelector(
    (state) => state.userData
  );

  if (userLoading) {
    return <ActivityIndicator />;
  }

  const handleDelete = (gameId) => {
    try {
      dispatch(deleteUserInGameAccount(gameId));
      notify("notification", {
        params: {
          status: "success",
          title: "Akun Dihapus",
          messages: "Akun berhasil dihapus",
        },
        config: {
          duration: 1000,
        },
      });
    } catch (error) {
      console.log(error);
    } finally {
      setShow(false);
    }
  };

  const handleShow = (id) => {
    setShow(true);
    setSelectedId(id);
  };

  const handleCancel = () => {
    setShow(false);
  };

  return (
    <View style={styles.container}>
      <DialogBox
        isVisible={isShow}
        variant="warning"
        title="Apakah Anda yakin ingin menghapus akun ini?"
        message="Setelah dihapus, Anda tidak akan bisa lagi menggunakan akun ini untuk di-boost"
        onCancel={handleCancel}
        onConfirm={handleDelete}
        data={selectedId}
      />

      <View style={styles.header}>
        <PageHeader page="Profil" subPage="Akun In-Game" />
      </View>
      <View style={styles.body}>
        {userIngameAccount?.length > 0 ? (
          <View style={styles.cardContainer}>
            {userIngameAccount?.map((acc, index) => (
              <View key={index}>
                <AccountCard
                  rank={acc.rank}
                  tier={acc.tier}
                  nickname={acc.nickname}
                  level={acc.level}
                  userId={acc.user_id}
                  star={acc.star}
                  id={acc.id}
                  handleDelete={() => handleShow(acc.id)}
                  ingameData={acc}
                />
              </View>
            ))}
          </View>
        ) : (
          <View style={styles.defaultContainer}>
            <View style={styles.defaultView}>
              <Sad />
              <View style={styles.textWrapper}>
                <Text style={styles.title}>Ups, Akunmu Belum Ditambahkan!</Text>
                <Text style={styles.subTitle}>
                  Sepertinya kamu belum menambahkan akun. Ayo, tambahkan
                  sekarang dan buka pintu ke fitur-fitur seru yang sudah
                  menunggumu!
                </Text>
              </View>
            </View>
          </View>
        )}
        {userIngameAccount.length < 3 && (
          <View style={styles.btnWrapper}>
            <LinearBtn
              title="Tambah Akun"
              onPress={() => navigation.navigate("AddInGameAccount")}
            />
          </View>
        )}
      </View>
    </View>
  );
};

export default MainInGame;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F9F9F9",
    flex: 1,
  },
  header: {
    paddingHorizontal: 16,
    backgroundColor: "#fff",
    marginBottom: 16,
    paddingBottom: 10,
  },
  body: {
    paddingHorizontal: 16,
  },
  defaultContainer: {
    gap: 41,
  },
  defaultView: {
    alignSelf: "center",
    flexDirection: "column",
    alignItems: "center",
    marginTop: 65,
  },
  textWrapper: {
    flexDirection: "column",
    alignItems: "center",
    marginTop: 15,
    gap: 13,
    width: "85%",
  },
  title: {
    color: "#101828",
    fontSize: fonts.size.font16,
    fontFamily: fonts.fontFamily.bold,
    lineHeight: 24,
    textAlign: "center",
  },
  subTitle: {
    textAlign: "center",
    fontSize: fonts.size.font12,
    fontFamily: fonts.fontFamily.regular,
    color: "#667085",
  },
  cardContainer: {
    gap: 10,
  },
  btnWrapper: {
    marginTop: 20,
  },
});
