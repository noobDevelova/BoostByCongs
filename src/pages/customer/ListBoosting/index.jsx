import {
  ActivityIndicator,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { ListBoostingHeader, OrderSheet } from "../../../components";
import { useDispatch, useSelector } from "react-redux";
import BoostCard from "../../../components/Card/BoostCard";
import {
  saveTemporaryOrder,
  updateTemporaryOrder,
} from "../../../store/user/thunks";

const ListBoosting = () => {
  const [selectedCategory, setSelectedCategory] = useState("semua");
  const temporaryData = useSelector((state) => state.userData.temporaryOrder);
  const sheetRef = useRef(null);
  const dispatch = useDispatch();

  const { rankLoading, rankData } = useSelector(
    (state) => state.rankCatalogData
  );

  const filteredBoosting = rankData?.filter(
    (boost) =>
      boost.showOnCatalog === true &&
      (selectedCategory === "semua" || boost.product_type === selectedCategory)
  );

  const storeProductData = async (data) => {
    const boostData = { order_detail: data };

    if (Object.keys(temporaryData).length === 0) {
      // Jika temporaryOrder kosong, gunakan saveTemporaryOrder
      await dispatch(saveTemporaryOrder(boostData));
    } else {
      // Jika temporaryOrder sudah ada, gunakan updateTemporaryOrder
      await dispatch(updateTemporaryOrder(boostData));
    }

    sheetRef.current?.open();
    console.log(sheetRef);
  };

  const renderItem = useCallback(
    ({ item }) => (
      <BoostCard
        rank={item.details.item_name}
        price={item.details.price}
        productType={item.product_type}
        handleUploadProduct={() => storeProductData(item)}
      />
    ),
    [temporaryData]
  );

  const keyExtractor = useCallback((item) => item.id, []);

  if (rankLoading) {
    return <ActivityIndicator size="large" />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <ListBoostingHeader
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      </View>
      <FlatList
        data={filteredBoosting}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        contentContainerStyle={styles.cardWrapper}
        showsVerticalScrollIndicator={false}
      />
      <OrderSheet ref={sheetRef} />
    </View>
  );
};

export default ListBoosting;

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 16,
    backgroundColor: "#fff",
  },

  body: {
    padding: 16,
  },

  cardWrapper: {
    gap: 8,
    padding: 16,
  },

  container: {
    flex: 1,
  },
});
