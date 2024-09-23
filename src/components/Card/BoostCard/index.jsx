import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import {
  Epic,
  Grandmaster,
  Legend,
  Master,
  Mythic,
  MythicGlory,
  MythicHonor,
  MythicImmortal,
} from "../../../assets/img";
import { Star } from "../../../assets/icon";
import fonts from "../../../utilities/fonts";
import ProductBadge from "../../Badge/ProductBadge";
import RankIconContainer from "../RankIconContainer";

const BoostCard = ({ rank, price, productType, handleUploadProduct }) => {
  const rankIcons = {
    Master: <Master />,
    Grandmaster: <Grandmaster />,
    Epic: <Epic />,
    Legend: <Legend />,
    Mythic: <Mythic />,
    "Mythic Honor": <MythicHonor />,
    "Mythic Glory": <MythicGlory />,
    "Mythic Immortal": <MythicImmortal />,
  };

  const rankMappings = [
    { key: "Master", value: "Master" },
    { key: "Grandmaster", value: "Grandmaster" },
    { key: "Epic", value: "Epic" },
    { key: "Legend", value: "Legend" },
    { key: "Mythic Honor", value: "Mythic Honor" },
    { key: "Mythic Glory", value: "Mythic Glory" },
    { key: "Mythic Immortal", value: "Mythic Immortal" },
    { key: "Mythic", value: "Mythic" },
  ];

  const fixedRank = (rank) => {
    let mapping = rankMappings.find((item) => item.key === rank);
    if (mapping) {
      return mapping.value;
    }

    mapping = rankMappings.find((item) => rank.includes(item.key));
    return mapping ? mapping.value : null;
  };

  const getRankIcons = (rank) => {
    const splitted = rank.split("-").map((s) => s.trim());
    const extractText = (str) => str.replace(/\s*\(.*?\)\s*/g, "").trim();

    let firstIcon = "";
    let secondIcon = "";

    if (splitted.length > 0) {
      firstIcon = extractText(splitted[0]);
    }

    if (splitted.length > 1) {
      secondIcon = extractText(splitted[1]);
    }

    return { firstIcon, secondIcon };
  };

  const { firstIcon, secondIcon } = getRankIcons(rank);

  return (
    <View style={styles.container}>
      <View style={styles.flexInline}>
        <View style={styles.iconWrapper}>
          {productType === "unit" || !rank.includes("-") ? (
            rankIcons[fixedRank(rank)]
          ) : (
            <RankIconContainer firstIcon={firstIcon} secondIcon={secondIcon} />
          )}
        </View>
        <Text style={styles.productName}>{rank}</Text>
        <View style={{ marginLeft: "auto" }}>
          <ProductBadge type={productType} />
        </View>
      </View>
      <View style={[styles.flexInline, { justifyContent: "space-between" }]}>
        <View style={[styles.flexInline, { gap: 4 }]}>
          {productType !== "paket" && <Star />}

          <Text style={styles.discountNum}>
            {(price + 1000).toLocaleString("id-ID", {
              style: "currency",
              currency: "IDR",
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            })}
          </Text>

          <Text style={styles.price}>
            {price.toLocaleString("id-ID", {
              style: "currency",
              currency: "IDR",
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            })}
          </Text>
        </View>
        <TouchableOpacity style={styles.btnCard} onPress={handleUploadProduct}>
          <Text style={styles.btnText}>Order</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default BoostCard;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    gap: 12,
  },
  flexInline: {
    flexDirection: "row",
    alignItems: "center",
  },
  productName: {
    marginLeft: 8,
    fontSize: fonts.size.font16,
    fontFamily: fonts.fontFamily.bold,
    lineHeight: 22,
    color: "#1c1c1e",
  },
  discountNum: {
    textDecorationLine: "line-through",
    color: "#636366",
    fontSize: fonts.size.font12,
    fontFamily: fonts.fontFamily.semiBold,
  },
  price: {
    fontSize: fonts.size.font14,
    fontFamily: fonts.fontFamily.semiBold,
    color: "#378FFF",
  },
  btnCard: {
    paddingHorizontal: 24,
    backgroundColor: "#378FFF",
    paddingVertical: 8,
    borderRadius: 100,
  },
  btnText: {
    color: "#fff",
    fontSize: fonts.size.font14,
    fontFamily: fonts.fontFamily.medium,
  },
});
