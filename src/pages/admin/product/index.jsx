import { StyleSheet, Text, View } from "react-native";
import React from "react";
import fonts from "../../../utilities/fonts";
import { ProductCard } from "../../../components";
import { Honor } from "../../../assets/img";
const Product = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.screenTitle}>Produk</Text>
      <View style={styles.cardWrapper}>
        <ProductCard
          Icon={Honor}
          title="Paket Rank"
          btnTitle="Lihat Paket Rank"
          navigateTo={() => navigation.navigate("ListRank")}
        />
      </View>
    </View>
  );
};

export default Product;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 36,
    paddingHorizontal: 18,
    flex: 1,
    backgroundColor: "#F9F9F9",
  },
  screenTitle: {
    fontSize: fonts.size.font20,
    fontFamily: fonts.fontFamily.bold,
  },
  cardWrapper: {
    marginTop: 11,
    gap: 6,
  },
});
