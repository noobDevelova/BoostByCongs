import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import HomeHeader from "../../HomeHeader";
import Slider from "../../Banner/Slider";
import fonts from "../../../utilities/fonts";
import BoostCard from "../../Card/BoostCard";
import { useDispatch, useSelector } from "react-redux";
import {
  saveTemporaryOrder,
  updateTemporaryOrder,
} from "../../../store/user/thunks";
import { useNavigation } from "@react-navigation/native";
import OrderSheet from "../../OrderSheet";
import { useNotifications } from "react-native-notificated";

const Homepage = () => {
  const listBoosting = useSelector((state) => state.rankCatalogData.rankData);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const sheetRef = useRef(null);
  const temporaryData = useSelector((state) => state.userData.temporaryOrder);
  const { notify } = useNotifications();

  const shuffleBoost = (array) => {
    let currentIndex = array.length,
      randomIndex;

    // Sementara ada elemen untuk diacak
    while (currentIndex !== 0) {
      // Ambil elemen acak
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // Tukar elemen
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  };

  const randomBoost = shuffleBoost([...listBoosting])?.slice(0, 5);

  useEffect(() => {
    console.log(JSON.stringify(temporaryData, 0, 2));
  }, []);

  const storeProductData = async (data) => {
    const boostData = { order_detail: data };

    if (Object.keys(temporaryData).length === 0) {
      await dispatch(saveTemporaryOrder(boostData));
    } else {
      await dispatch(updateTemporaryOrder(boostData));
    }

    sheetRef.current?.open();
  };

  return (
    <>
      <ScrollView style={styles.container}>
        <HomeHeader />
        <Slider />
        <View style={styles.productWrapper}>
          <View style={styles.headerWrapper}>
            <Text style={styles.headerText}>Rekomendasi Boosting</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("ListBoosting")}
            >
              <Text style={styles.btnText}>Lihat Semua</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.cardWrapper}>
            {randomBoost?.map((data) => (
              <View key={data.id}>
                <BoostCard
                  rank={data.details.item_name}
                  price={data.details.price}
                  productType={data.product_type}
                  handleUploadProduct={() => storeProductData(data)}
                />
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      <OrderSheet ref={sheetRef} />
    </>
  );
};

export default Homepage;

const styles = StyleSheet.create({
  bannerWrapper: {
    marginTop: 10,
  },
  productWrapper: {
    paddingHorizontal: 16,
    paddingTop: 19,
  },
  headerWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 7,
    alignItems: "center",
  },
  headerText: {
    fontSize: fonts.size.font16,
    fontFamily: fonts.fontFamily.semiBold,
    lineHeight: 25,
    color: "#1c1c1e",
  },
  btnText: {
    fontSize: fonts.size.font12,
    fontFamily: fonts.fontFamily.medium,
    lineHeight: 16,
    color: "#8E8E93",
  },
  cardWrapper: {
    gap: 8,
    marginBottom: 16,
  },
});
