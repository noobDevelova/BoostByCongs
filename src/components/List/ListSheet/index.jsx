import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect } from "react";
import {
  Epic,
  Grandmaster,
  Legend,
  Mythic,
  MythicGlory,
  MythicHonor,
} from "../../../assets/img";
import fonts from "../../../utilities/fonts";
import { Add, Edit } from "../../../assets/icon";
import {
  formatForProduct,
  formatForUnit,
  rankIcon,
} from "../../../utilities/ranksFormatter";
import RankIconContainer from "../../Card/RankIconContainer";

const ListSheet = ({
  no,
  headerText,
  value,
  info,
  data,
  imageData,
  handleAction,
  selectedData,
  countData,
  setCountData,
}) => {
  const ranks = {
    Grandmaster: <Grandmaster width={40} />,
    Epic: <Epic width={40} />,
    Legend: <Legend width={40} />,
    Mythic: <Mythic width={40} />,
    "Mythic Honor": <MythicHonor width={40} />,
    "Mythic Glory": <MythicGlory width={40} />,
  };

  const rankMappings = [
    { key: "Grandmaster", value: "Grandmaster" },
    { key: "Epic", value: "Epic" },
    { key: "Legend", value: "Legend" },
    { key: "Mythic Glory", value: "Mythic Glory" },
    { key: "Mythic Honor", value: "Mythic Honor" },
    { key: "Mythic", value: "Mythic" },
  ];

  const fixedRank = (rank) => {
    if (typeof rank === "string") {
      const mapping = rankMappings.find((mapping) =>
        rank.includes(mapping.key)
      );
      return mapping ? mapping.value : null;
    }
    return null;
  };

  const getRankIcon = (value) => {
    let icon;
    if (value.includes("-")) {
      icon = formatForProduct(value);
      return (
        <RankIconContainer
          firstIcon={icon.firstIcon}
          secondIcon={icon.secondIcon}
        />
      );
    } else {
      icon = formatForUnit(value);
      return rankIcon(icon, 30);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerWrapper}>
        <View style={styles.numberWrapper}>
          <Text style={styles.number}>{no}</Text>
        </View>
        <Text style={styles.headerText}>{headerText}</Text>
      </View>
      {value && (
        <View
          style={[
            styles.bodyWrapper,
            { flexDirection: "row", justifyContent: "space-around" },
          ]}
        >
          <View style={styles.bodyItem}>
            {getRankIcon(value)}
            <Text style={styles.valueText}>{value}</Text>
          </View>
        </View>
      )}
      {data && (
        <View style={styles.selectorWrapper}>
          {data?.map((item) => (
            <TouchableOpacity key={item.id} onPress={() => handleAction(item)}>
              <View
                style={[
                  styles.bodyWrapper,
                  selectedData?.id === item.id && {
                    borderWidth: 2,
                    borderColor: "#378FFF",
                  },
                ]}
              >
                <View style={styles.bodyItem}>
                  {ranks[item.rank]}
                  <View style={styles.textWrapper}>
                    <Text style={styles.valueText}>{item.nickname}</Text>
                    <Text style={styles.subValueText}>{item.user_id}</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      )}
      {imageData && (
        <View style={[styles.bodyWrapper, styles.imageWrapper]}>
          {imageData.length > 0 ? (
            <>
              {imageData.map((item) => (
                <View key={item.heroid}>
                  <Image
                    style={styles.dataImage}
                    source={{ uri: `https:${item.img}` }}
                  />
                </View>
              ))}
              <TouchableOpacity
                style={{ alignSelf: "flex-end" }}
                onPress={handleAction}
              >
                <View style={styles.iconWrapper}>
                  <Edit />
                </View>
              </TouchableOpacity>
            </>
          ) : (
            <TouchableOpacity style={styles.btnLink} onPress={handleAction}>
              <View style={styles.iconWrapper}>
                <Add />
              </View>
              <Text>Anda Belum Pick Hero</Text>
            </TouchableOpacity>
          )}
        </View>
      )}
      {info && (
        <View style={styles.footerWrapper}>
          <Text style={styles.textInfo}>{info}</Text>
        </View>
      )}
    </View>
  );
};

export default ListSheet;

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    marginBottom: 15,
  },

  headerWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 13,
  },

  numberWrapper: {
    backgroundColor: "#378FFF",
    borderRadius: 100,
    width: 24,
    height: 24,
    alignItems: "center",
    justifyContent: "center",
  },

  number: {
    lineHeight: 22.4,
    textAlign: "center",
    color: "#F8F9FD",
    fontSize: fonts.size.font16,
    fontFamily: fonts.fontFamily.medium,
  },

  headerText: {
    lineHeight: 22.4,
    fontSize: fonts.size.font16,
    fontFamily: fonts.fontFamily.medium,
  },
  bodyWrapper: {
    backgroundColor: "#F8F9FD",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#EDEDED",
    paddingVertical: 7,
  },
  bodyItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  valueText: {
    color: "#1C1C1E",
    fontSize: fonts.size.font16,
    fontFamily: fonts.fontFamily.bold,
    lineHeight: 22.4,
  },
  subValueText: {
    color: "#636366",
    fontSize: fonts.size.font14,
    fontFamily: fonts.fontFamily.medium,
  },
  selectorWrapper: {
    gap: 8,
  },
  dataImage: {
    width: 52,
    height: 52,
    borderRadius: 100,
  },
  imageWrapper: {
    flexDirection: "row",
    paddingVertical: 7,
    paddingHorizontal: 12,
    gap: 8,
    borderRadius: 100,
    alignItems: "center",
  },
  footerWrapper: {
    paddingHorizontal: 5,
  },
  textInfo: {
    fontSize: fonts.size.font12,
    fontFamily: fonts.fontFamily.regular,
    color: "#636366",
    lineHeight: 16.8,
  },

  btnLink: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  iconWrapper: {
    backgroundColor: "#378FFF",
    borderRadius: 100,
    padding: 10,
  },
});
