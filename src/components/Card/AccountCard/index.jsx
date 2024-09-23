import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import fonts from "../../../utilities/fonts";
import ButtonIcon from "../../ButtonIcon";
import { Edit, DeleteLight, Star, Document } from "../../../assets/icon";
import { useNavigation } from "@react-navigation/native";
import GradientBorder from "../../GradientBorder";
import { rankIcon } from "../../../utilities/ranksFormatter";
import { saveTemporaryOrder } from "../../../store/user/thunks";
import { useDispatch } from "react-redux";

const AccountCard = ({
  nickname,
  userId,
  level,
  rank,
  tier,
  star,
  id,
  handleDelete,
  ingameData,
}) => {
  const icon = rankIcon(rank, 40);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(false);

  const storeIngameAccount = async (selectedIngameAccount) => {
    const pickedAcc = { cust_ingame_acc: selectedIngameAccount };
    await dispatch(saveTemporaryOrder(pickedAcc));
  };

  const handleBoost = async () => {
    try {
      setLoading(true);
      await storeIngameAccount(ingameData);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      navigation.navigate("ListBoosting");
    }
  };

  return (
    <GradientBorder isBoosted={ingameData?.isBoosted}>
      <View style={styles.container}>
        <View>
          <View>
            <Text style={styles.title}>Nickname</Text>
            <Text style={styles.subTitle}>{nickname}</Text>
          </View>
          <View>
            <Text style={styles.title}>User ID</Text>
            <Text style={styles.subTitle}>{userId}</Text>
          </View>
          <View>
            <Text style={styles.title}>Level</Text>
            <Text style={styles.subTitle}>{level}</Text>
          </View>
        </View>
        <View style={styles.wrapper}>
          <View style={styles.btnWrapper}>
            <ButtonIcon
              Icon={Edit}
              onPress={() =>
                navigation.navigate("EditInGameAccount", { id: id })
              }
            />
            <ButtonIcon Icon={DeleteLight} onPress={() => handleDelete(id)} />
            <ButtonIcon
              Icon={Document}
              onPress={() =>
                navigation.navigate("InGameDetail", {
                  inGameDetailData: ingameData,
                })
              }
            />
          </View>
          <View style={styles.highligtAcc}>
            {icon}
            <View>
              <Text style={styles.rank}>
                {rank} {tier}
              </Text>
              <View style={styles.starWrapper}>
                <Star />
                <Text style={styles.rankStar}>{star}</Text>
              </View>
            </View>
          </View>
          <TouchableOpacity style={styles.boostBtn} onPress={handleBoost}>
            {isLoading ? (
              <ActivityIndicator size="small" />
            ) : (
              <Text style={styles.btnText}>Boost</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </GradientBorder>
  );
};

export default AccountCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#378FFF",
    padding: 14,
    borderRadius: 3,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    color: "#F2F4F7",
    fontSize: fonts.size.font12,
    fontFamily: fonts.fontFamily.medium,
    lineHeight: 18,
  },
  subTitle: {
    color: "#FCFCFD",
    fontSize: fonts.size.font16,
    fontFamily: fonts.fontFamily.bold,
    lineHeight: 28,
  },
  wrapper: {
    alignItems: "flex-end",
    justifyContent: "space-between",
  },
  btnWrapper: {
    flexDirection: "row",
    gap: 8,
  },
  highligtAcc: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
  },
  starWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  rank: {
    color: "#FCFCFD",
    fontSize: fonts.size.font16,
    fontFamily: fonts.fontFamily.bold,
    lineHeight: 22,
  },
  rankStar: {
    color: "#FCFCFD",
    fontSize: fonts.size.font12,
    fontFamily: fonts.fontFamily.bold,
    lineHeight: 18,
  },
  boostBtn: {
    backgroundColor: "#FCFCFD",
    paddingHorizontal: 31,
    paddingVertical: 9,
    borderRadius: 6,
  },
  btnText: {
    color: "#378FFF",
    fontSize: fonts.size.font14,
    fontFamily: fonts.fontFamily.medium,
    lineHeight: 18,
  },
});
