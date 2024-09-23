import {
  Animated,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useRef, useState } from "react";
import SliderItem from "../SliderItem";

import Carousel from "react-native-reanimated-carousel";

const { width: screenWidth } = Dimensions.get("window");
const Slider = () => {
  const sliderData = [
    {
      category: "BOOSTING",
      highlight: "RANK UP",
      description: "Naikkan peringkatmu sekarang!",
      bannerBg: "Wanwan",
    },
    {
      category: "BOOSTING",
      highlight: "DISCOUNT",
      description: "Penawaran spesial! Gunakan kesempatan ini!",
      bannerBg: "Selena",
    },
    {
      category: "BOOSTING",
      highlight: "TOP TIER",
      description: "Jadilah pemain top dengan bantuan kami!",
      bannerBg: "Freya",
    },
    {
      category: "BOOSTING",
      highlight: "EXCLUSIVE",
      description: "Dapatkan promo eksklusif untuk peringkat tinggi!",
      bannerBg: "Fanny",
    },
  ];

  return (
    <View style={styles.container}>
      <Carousel
        loop
        width={screenWidth}
        height={175}
        data={sliderData}
        autoPlay={true}
        scrollAnimationDuration={3000}
        renderItem={({ item }) => <SliderItem item={item} />}
      />
    </View>
  );
};

export default Slider;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    backgroundColor: "#fff",
    paddingTop: 8,
    paddingBottom: 30,
  },
});
