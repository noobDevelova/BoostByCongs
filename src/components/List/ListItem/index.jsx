import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import React, { useEffect } from "react";
import fonts from "../../../utilities/fonts";
import StatusBadge from "../../Badge/StatusBadge";

import {
  Epic,
  Grandmaster,
  Legend,
  Mythic,
  MythicGlory,
  MythicHonor,
} from "../../../assets/img";
import RankIconContainer from "../../Card/RankIconContainer";
import { formatRank, rankIcon } from "../../../utilities/ranksFormatter";

const ListItem = ({
  isDivide = false,
  hasAction = false,
  optionalLabel,
  productType,
  iconName,
  anotherValue,
  IconLabel,
  textBox,
  IconAction,
  value,
  label,
  Icon,
  dataImg,
  status,
  type,
  handleAction,
}) => {
  const getIcon = (productType, iconName) => {
    if (!productType || !iconName) {
      return { firstIcon: null, secondIcon: null };
    }
    return formatRank(productType, iconName);
  };

  const icon = getIcon(productType, iconName);

  const iconRank =
    productType === "paket" && type === "product" ? (
      <RankIconContainer
        firstIcon={icon.firstIcon}
        secondIcon={icon.secondIcon}
      />
    ) : (
      optionalLabel && anotherValue && rankIcon(iconName, 40)
    );

  const IconComponent = Icon ? <Icon /> : iconRank;

  return (
    <View
      style={[
        styles.list,
        isDivide && styles.divider,
        IconComponent && [
          styles.listRow,
          { justifyContent: "flex-start", gap: 8, alignItems: "center" },
        ],
      ]}
    >
      {IconComponent && <View style={styles.iconWrapper}>{IconComponent}</View>}
      <View style={[IconComponent ? styles.listColumn : styles.listRow]}>
        {status && <StatusBadge status={status} />}
        {label && <Text style={styles.label}>{label}</Text>}
        <Text style={styles.value}>{value}</Text>
        {optionalLabel && (
          <Text style={styles.valueLight}>{optionalLabel}</Text>
        )}
        {anotherValue && IconLabel && (
          <View style={styles.listRow}>
            <IconLabel />
            <Text style={styles.valueLight}>{anotherValue}</Text>
          </View>
        )}
        {textBox && (
          <View style={styles.textBoxWrapper}>
            <Text style={styles.textBoxValue}>{textBox}</Text>
          </View>
        )}
      </View>
      {hasAction && (
        <View style={{ marginLeft: "auto" }}>
          <TouchableOpacity onPress={() => handleAction()}>
            <IconAction />
          </TouchableOpacity>
        </View>
      )}
      {dataImg && (
        <View style={{ marginLeft: "auto", flexDirection: "row" }}>
          {dataImg.map((url, index) => (
            <View key={index}>
              <Image
                style={styles.dataImage}
                source={{ uri: `https:${url}` }}
              />
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

export default ListItem;

const styles = StyleSheet.create({
  list: {
    paddingVertical: 8,
  },
  divider: {
    borderBottomWidth: 1,
    borderColor: "#EBEBF0",
  },
  label: {
    fontSize: fonts.size.font14,
    fontFamily: fonts.fontFamily.regular,
    lineHeight: 21,
  },
  value: {
    fontSize: fonts.size.font14,
    fontFamily: fonts.fontFamily.bold,
    lineHeight: 21,
  },
  valueLight: {
    fontSize: fonts.size.font12,
    fontFamily: fonts.fontFamily.regular,
    lineHeight: 21,
    color: "#808089",
  },
  listRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  listColumn: {
    flexDirection: "column",
    gap: 4,
    flexShrink: 1,
    flexWrap: "wrap",
  },
  iconWrapper: {
    marginBottom: "auto",
  },
  textBoxValue: {
    fontFamily: fonts.fontFamily.regular,
    fontSize: fonts.size.font12,
    lineHeight: 21,
    color: "#808089",
  },
  textBoxWrapper: {
    borderWidth: 1,
    borderColor: "#DDDDE3",
    borderRadius: 4,
    padding: 8,
  },
  dataImage: {
    width: 30,
    height: 30,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: "#fff",
    marginRight: -10,
  },
});
