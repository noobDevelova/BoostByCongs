import { Dimensions, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Fanny, Freya, Selena, Wanwan } from "../../../assets/img";
import fonts from "../../../utilities/fonts";
import matrics from "../../../utilities/screenDimensions";

const { width: screenWidth } = Dimensions.get("window");

const SliderItem = ({ item }) => {
  const bannerBg = {
    Freya: <Freya />,
    Selena: <Selena />,
    Wanwan: <Wanwan />,
    Fanny: <Fanny />,
  };
  return (
    <View style={[styles.banner, styles.sliderItemContainer]}>
      <View style={styles.contentWrapper}>
        <View style={styles.textWrapper}>
          <Text style={styles.textBrand}>{item.category}</Text>
          <Text style={styles.textHighlight}>{item.highlight}</Text>
          <Text style={styles.desc}>{item.description}</Text>
        </View>
        {/* <TouchableOpacity style={styles.btnBanner}>
          <Text style={styles.btnText}>{item.btnTitle}</Text>
        </TouchableOpacity> */}
      </View>

      <View style={styles.bannerImg}>{bannerBg[item.bannerBg]}</View>
    </View>
  );
};

export default SliderItem;

const styles = StyleSheet.create({
  sliderItemContainer: {
    width: screenWidth - 32,
    // flexDirection: "row"
  },
  contentWrapper: {
    gap: 21,
    width: "55%",
  },

  textWrapper: {
    gap: 4,
  },

  textBrand: {
    fontSize: fonts.size.font12,
    fontFamily: fonts.fontFamily.medium,
    letterSpacing: 1,
    color: "#378FFF",
    lineHeight: 20,
  },
  textHighlight: {
    fontSize: fonts.size.font24,
    fontFamily: fonts.fontFamily.bold,
    lineHeight: 28,
    color: "#1C1C1E",
  },

  btnBanner: {
    backgroundColor: "#378FFF",
    paddingHorizontal: 24,
    paddingVertical: 8,
    borderRadius: 100,
  },

  btnText: {
    fontSize: fonts.size.font14,
    fontFamily: fonts.fontFamily.medium,
    color: "#fff",
    textAlign: "center",
  },

  desc: {
    fontSize: fonts.size.font12,
    fontFamily: fonts.fontFamily.regular,
    color: "#4E4E50",
    lineHeight: 16,
  },
  bannerImg: {
    position: "absolute",
    right: 0,
  },
  banner: {
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#F8F9FD",
    height: 175,
    paddingHorizontal: 20,
    justifyContent: "center",
  },
  bannerImg: {
    position: "absolute",
    right: 0,
  },
});
