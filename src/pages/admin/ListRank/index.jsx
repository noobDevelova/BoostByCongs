import { Keyboard, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import {
  AlertInfo,
  DialogBox,
  FormProduct,
  PageHeader,
  RankCard,
  SheetFrame,
  ToastNotifications,
} from "../../../components";
import { useDispatch, useSelector } from "react-redux";
import LinearBtn from "../../../components/Button";
import fonts from "../../../utilities/fonts";
import {
  uploadRankCatalog,
  updateRankCatalog,
} from "../../../store/ranks/thunks";
import { useNotifications } from "react-native-notificated";

const ListRank = () => {
  const ranks = useSelector((state) => state.rankCatalogData.rankData);
  const [editData, setEditData] = useState(null);
  const [formData, setFormData] = useState(null);
  const [showDialog, setShowDialog] = useState(false);
  const sheetRef = useRef(null);
  const dispatch = useDispatch();
  const { notify } = useNotifications();

  const openSheet = (data = null) => {
    setEditData(data);
    sheetRef.current?.open();
  };

  const closeSheet = () => {
    sheetRef.current?.close();
    Keyboard.dismiss();
  };

  useEffect(() => {
    console.log(JSON.stringify(ranks, 0, 2));
  }, []);

  const handleUpload = (data) => {
    try {
      if (editData) {
        dispatch(updateRankCatalog(data));
        Keyboard.dismiss();
        closeSheet();
        setFormData(null);
        setShowDialog(false);

        notify("notification", {
          params: {
            messages: `Mengupdate Boosting ${data.details.item_name}`,
            title: "Berhasil",
            status: "success",
          },
          config: {
            duration: 2000,
          },
        });
      } else {
        dispatch(uploadRankCatalog(data));
        Keyboard.dismiss();
        closeSheet();
        setFormData(null);
        setShowDialog(false);

        notify("notification", {
          params: {
            messages: `Menambahkan Boosting ${data.details.item_name}`,
            title: "Berhasil",
            status: "success",
          },
          config: {
            duration: 2000,
          },
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleShow = (data) => {
    setFormData(data);
    setShowDialog(true);
  };

  const handleCancel = () => {
    setShowDialog(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <PageHeader page="Produk" subPage="List Rank" />
      </View>

      <View style={styles.body}>
        <ScrollView
          contentContainerStyle={styles.scrollViewContent}
          showsVerticalScrollIndicator={false}
        >
          {ranks?.length > 0 ? (
            <View style={styles.cardWrapper}>
              {ranks?.map((data) => (
                <View key={data.id}>
                  <RankCard data={data} onEdit={openSheet} />
                </View>
              ))}
            </View>
          ) : (
            <View style={{ marginTop: 16 }}>
              <AlertInfo
                title="Produk Belum Tersedia"
                subTitle="Yuk, tambahkan produk baru agar customer bisa mulai order!"
              />
            </View>
          )}
          <View style={styles.btnWrapper}>
            <LinearBtn title="Tambah Katalog" onPress={() => openSheet()} />
          </View>
        </ScrollView>
      </View>
      <SheetFrame ref={sheetRef}>
        <Text style={styles.sheetTitle}>
          {editData ? "Edit Produk Boosting" : "Tambahkan Produk Boosting"}
        </Text>
        <FormProduct handleUpload={handleShow} initialData={editData} />
      </SheetFrame>

      <DialogBox
        isVisible={showDialog}
        variant="warning"
        title="Yuk, Periksa Sekali Lagi Sebelum Submit!"
        message={
          editData
            ? "Pastikan semua perubahan sudah sesuai sebelum Anda mengirimkannya."
            : "Apakah Anda yakin semua data sudah benar sebelum menambahkannya?"
        }
        onCancel={handleCancel}
        onConfirm={handleUpload}
        data={formData}
      />
    </View>
  );
};

export default ListRank;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F5F5FA",
    flex: 1,
  },

  header: {
    paddingHorizontal: 16,
    backgroundColor: "#fff",
    paddingBottom: 12,
  },

  body: {
    flex: 1,
    paddingHorizontal: 16,
  },

  cardWrapper: {
    flexDirection: "column",
    gap: 12,
  },

  btnWrapper: {
    marginVertical: 11,
  },

  sheetTitle: {
    fontSize: fonts.size.font16,
    fontFamily: fonts.fontFamily.medium,
    marginBottom: 18,
  },
  scrollViewContent: {
    paddingTop: 16,
  },
});
