import { BackHandler, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useRef } from "react";
import LottieView from "lottie-react-native";
import Constants from "expo-constants";
import fonts from "../../../../utilities/fonts";
import LinearBtn from "../../../../components/Button";
import { useSelector } from "react-redux";

const SuccessOrder = ({ navigation }) => {
  const animation = useRef(null);

  const userOrders = useSelector((state) => state.userData.userOrders);
  const sortedOrders = [...userOrders]?.sort(
    (a, b) => b.order_date.toDate() - a.order_date.toDate()
  );
  const latestOrder = sortedOrders.length > 0 ? sortedOrders[0] : null;

  useEffect(() => {
    const backAction = () => {
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    const beforeRemoveListener = navigation.addListener("beforeRemove", (e) => {
      e.preventDefault();
    });

    return () => {
      backHandler.remove();
      navigation.removeListener("beforeRemove", beforeRemoveListener);
    };
  }, [navigation]);

  useEffect(() => {
    console.log(JSON.stringify(latestOrder, 0, 2));
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.iconWrapper}>
        <LottieView
          autoPlay
          style={{
            width: 230,
            height: 230,
          }}
          ref={animation}
          source={require("../../../../assets/animation/success-animation.json")}
        />
      </View>
      <Text style={styles.highlightText}>Boosting Berhasil!</Text>
      <Text style={styles.messageText}>
        Kirim bukti pembayaran ke WhatsApp admin di halaman berikutnya untuk
        memproses boosting kamu.
      </Text>
      <View style={styles.btnWrapper}>
        <LinearBtn
          title="Lihat Detail Order"
          onPress={() =>
            navigation.navigate("OrderDetail", { orderData: latestOrder })
          }
        />
      </View>
    </View>
  );
};

export default SuccessOrder;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: Constants.statusBarHeight + 50,
    paddingHorizontal: 16,
  },

  highlightText: {
    fontSize: fonts.size.font20,
    fontFamily: fonts.fontFamily.bold,
    marginTop: 16,
    textAlign: "center",
    color: "#0291DE",
    marginBottom: 12,
  },

  messageText: {
    textAlign: "center",
    fontSize: fonts.size.font14,
    fontFamily: fonts.fontFamily.medium,
    marginBottom: 30,
  },

  btnWrapper: {
    flexDirection: "row",
  },
});
