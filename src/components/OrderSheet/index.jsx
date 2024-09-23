import { StyleSheet, Text, View } from "react-native";
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import SheetFrame from "../SheetFrame";
import ListSheet from "../List/ListSheet";
import {
  calculateStarsNeeded,
  validateRank,
} from "../../utilities/rankCounter";

import { useNavigation } from "@react-navigation/native";
import { updateTemporaryOrder } from "../../store/user/thunks";
import LinearBtn from "../Button";
import DialogBox from "../DialogBox";
import { Warning } from "../../assets/icon";
import fonts from "../../utilities/fonts";
import { formatForProduct } from "../../utilities/ranksFormatter";
import { FIREBASE_AUTH } from "../../config";
import { useNotifications } from "react-native-notificated";

const OrderSheet = forwardRef(({}, ref) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const sheetRef = useRef(null);
  const { userIngameAccount, userDetail } = useSelector(
    (state) => state.userData
  );
  const temporaryData = useSelector((state) => state.userData.temporaryOrder);
  const [countedStar, setCountedStar] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [countedData, setCountedData] = useState(null);
  const [isVisible, setVisible] = useState(false);
  const emailStatus = FIREBASE_AUTH.currentUser.emailVerified;
  const phoneStatus = userDetail?.phone_number;
  const { notify } = useNotifications();

  const isAuthenticateToOrder = () => {
    if (!emailStatus || !phoneStatus || userIngameAccount.length < 1) {
      return {
        status: false,
        message: "Anda belum melengkapi profil akun anda",
      };
    } else {
      return {
        status: true,
      };
    }
  };

  const calculateEstimatedNeededRanks = async () => {
    const ranks = [
      "Grandmaster",
      "Epic",
      "Legend",
      "Mythic",
      "Mythic Honor",
      "Mythic Glory",
      "Mythic Immortal",
    ];

    const nextRankIndex = ranks.indexOf(temporaryData.cust_ingame_acc.rank) + 1;

    const estimatedNeedeedStars = await calculateStarsNeeded(
      temporaryData?.cust_ingame_acc?.rank,
      temporaryData?.cust_ingame_acc?.tier,
      Number(temporaryData?.cust_ingame_acc?.star),
      temporaryData?.order_detail?.details.item_name
    );

    if (estimatedNeedeedStars.success) {
      const result = {
        estimatedStar: estimatedNeedeedStars.data,
        nextRank: ranks[nextRankIndex],
      };

      setCountedData(result);

      return {
        success: true,
        data: result,
      };
    } else {
      return {
        success: false,
        message: estimatedNeedeedStars.message,
      };
    }
  };

  const handleSubmit = async () => {
    if (!temporaryData?.cust_ingame_acc) {
      setErrorMessage("Mohon pilih akun yang ingin di boost");
    } else if (temporaryData?.order_detail?.product_type !== "unit") {
      if (temporaryData?.order_detail?.details?.item_name?.includes("-")) {
        const splitRank = formatForProduct(
          temporaryData?.order_detail?.details?.item_name
        );
        const ranks = [splitRank.firstIcon, splitRank.secondIcon];
        const isValid = validateRank(
          temporaryData?.cust_ingame_acc?.rank,
          ranks
        );

        if (isValid.valid) {
          await storeFixedOrderDetail();
        } else {
          setErrorMessage(isValid.message);
        }
      } else {
        await storeFixedOrderDetail();
      }
    } else {
      const calc = await calculateEstimatedNeededRanks();

      if (calc.success) {
        setVisible(true);
      } else {
        setErrorMessage(calc.message);
      }
    }
  };

  const handleCloseDialog = () => {
    setVisible(false);
  };

  const navigatePickHero = () => {
    navigation.navigate("RequestHero");
    sheetRef?.current?.close();
  };

  const storeIngameAccount = async (selectedIngameAccount) => {
    const pickedAcc = { cust_ingame_acc: selectedIngameAccount };
    await dispatch(updateTemporaryOrder(pickedAcc));
    setErrorMessage("");
  };

  const storeFixedOrderDetail = async () => {
    let orderData;
    let totalPrice = 0;

    if (temporaryData?.order_detail?.product_type === "unit") {
      totalPrice = countedStar * temporaryData?.order_detail?.details?.price;

      orderData = {
        order_detail: {
          total_price: totalPrice,
          amount_stars: countedStar,
        },
      };

      await dispatch(updateTemporaryOrder(orderData));

      setVisible(false);

      sheetRef?.current?.close();

      navigation.navigate("Checkout");
    } else {
      orderData = {
        order_detail: {
          total_price: temporaryData?.order_detail?.details.price,
        },
      };
      await dispatch(updateTemporaryOrder(orderData));

      sheetRef?.current?.close();

      navigation.navigate("Checkout");
    }
  };

  useImperativeHandle(ref, () => ({
    open: () => {
      const isAuthenticate = isAuthenticateToOrder();
      if (!isAuthenticate.status) {
        notify("notification", {
          params: {
            title: `Profil anda belum dilengkapi`,
            messages:
              "Silahkan lengkapi profil anda terlebih dahulu sebelum order",
            status: "error",
          },
          config: {
            duration: 4000,
          },
        });
      } else {
        sheetRef.current?.open();
      }
    },
    close: () => {
      sheetRef.current?.close();
    },
  }));

  return (
    <SheetFrame ref={sheetRef}>
      <ListSheet
        no="1"
        headerText="Boosting"
        value={temporaryData?.order_detail?.details?.item_name}
      />
      <ListSheet
        no="2"
        headerText="Akun yang ingin di boost"
        data={userIngameAccount}
        handleAction={storeIngameAccount}
        selectedData={temporaryData?.cust_ingame_acc || null}
      />
      <ListSheet
        no="3"
        headerText="Request Hero"
        imageData={temporaryData?.order_detail?.request_hero || []}
        info="Jika tidak ada request hero, penjoki akan memilih hero random"
        handleAction={() => navigatePickHero()}
      />

      {(errorMessage || !temporaryData.cust_ingame_acc) && (
        <View style={styles.warningWrapper}>
          {errorMessage && <Warning />}
          <Text style={styles.warningText}>{errorMessage}</Text>
        </View>
      )}

      <LinearBtn title="Checkout" onPress={() => handleSubmit()} />

      <DialogBox
        variant="info"
        isVisible={isVisible}
        title="Berapa bintang yang anda inginkan?"
        message="Silahkan input jumlah bintang yang anda butuhkan pada counter dibawah ini"
        onCancel={handleCloseDialog}
        count={countedStar}
        setCount={setCountedStar}
        data={countedData}
        hasInput={true}
        onConfirm={storeFixedOrderDetail}
      />
    </SheetFrame>
  );
});

export default OrderSheet;

const styles = StyleSheet.create({
  warningText: {
    color: "#F2C94C",
    fontSize: fonts.size.font14,
    fontFamily: fonts.fontFamily.medium,
    flexShrink: 1,
    flexWrap: "wrap",
  },

  warningWrapper: {
    flexDirection: "row",
    gap: 5,
    marginBottom: 5,
    alignItems: "center",
  },
});
