import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { Cross, Share } from "../../../assets/icon";
import Constants from "expo-constants";
import { InvoicePaper } from "../../../components";
import { captureComponent } from "../../../utilities/captureComponent";
import { shareFile } from "../../../utilities/shareFileHandler";

const InvoiceScreen = ({ route, navigation }) => {
  const { orderData } = route.params;
  const [snapShotImage, setSnapShotImage] = useState(null);

  const capturePaper = useRef(null);

  const capture = async () => {
    try {
      const resultImage = await captureComponent(
        capturePaper,
        setSnapShotImage
      );
      await shareFile(resultImage, orderData?.id);

      console.log(resultImage);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.actionBtn}
          onPress={() => navigation.goBack()}
        >
          <Cross />
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionBtn} onPress={capture}>
          <Share />
        </TouchableOpacity>
      </View>
      <InvoicePaper data={orderData} ref={capturePaper} />
    </View>
  );
};

export default InvoiceScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#378FFF",
    paddingHorizontal: 16,
  },
  header: {
    marginTop: Constants.statusBarHeight + 28,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  actionBtn: {
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.24)",
    padding: 8,
    borderRadius: 100,
    marginBottom: 16,
  },
});
