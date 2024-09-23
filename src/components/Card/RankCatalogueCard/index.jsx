import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import {
  Epic,
  Grandmaster,
  Legend,
  Mythic,
  MythicGlory,
  MythicHonor,
} from "../../../assets/img";
import ButtonIcon from "../../ButtonIcon";
import { DottedSetting, Star } from "../../../assets/icon";
import fonts from "../../../utilities/fonts";
import MenuItem from "../../MenuItem";
import { Delete, EditItem } from "../../../assets/icon";
import { useDispatch } from "react-redux";
import { deleteRankCatalog } from "../../../store/ranks/thunks";
import { useNotifications } from "react-native-notificated";
import { formatRank, rankIcon } from "../../../utilities/ranksFormatter";
import RankIconContainer from "../RankIconContainer";

const RankCard = ({ data, onEdit }) => {
  const [showMenu, setShowMenu] = useState(false);
  const dispatch = useDispatch();
  const { notify } = useNotifications();

  const formattedRank = formatRank(
    data?.product_type,
    data?.details?.item_name
  );

  const icon =
    data?.product_type === "unit" ? (
      rankIcon(formattedRank, 40)
    ) : (
      <RankIconContainer
        firstIcon={formattedRank.firstIcon}
        secondIcon={formattedRank.secondIcon}
      />
    );

  const handleShowMenu = () => {
    setShowMenu(!showMenu);
  };

  const handleDelete = (id) => {
    try {
      dispatch(deleteRankCatalog(id));
      setShowMenu(!showMenu);
      notify("notification", {
        params: {
          messages: `Menghapus Boosting ${data.details.item_name}`,
          title: "Berhasil",
          status: "success",
        },
        config: {
          duration: 2000,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = () => {
    onEdit(data);
    setShowMenu(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.bar} />
      <View style={styles.wrapper}>
        <View style={styles.imgWrapper}>{icon}</View>
        <View style={styles.titleWrapper}>
          <Text style={styles.rank}>{data.details.item_name}</Text>
          <View style={styles.priceWrapper}>
            {data.product_type === "unit" && <Star />}
            <Text style={styles.price}>
              {data.details.price.toLocaleString("id-ID", {
                style: "currency",
                currency: "IDR",
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              })}
            </Text>
          </View>
        </View>
      </View>
      <ButtonIcon Icon={DottedSetting} onPress={handleShowMenu} />
      {showMenu && (
        <View style={styles.menuFrame}>
          <MenuItem title="Edit" Icon={EditItem} onPress={handleEdit} />
          <MenuItem
            title="Hapus"
            Icon={Delete}
            onPress={() => handleDelete(data.id)}
          />
        </View>
      )}
    </View>
  );
};

export default RankCard;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderWidth: 1,
    borderColor: "#A6A6A6",
    borderRadius: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  wrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  imgWrapper: {
    backgroundColor: "#378FFF",
    borderRadius: 6,
    width: 60,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
  },
  priceWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  titleWrapper: {
    flexDirection: "column",
    gap: 5,
  },
  rank: {
    fontSize: fonts.size.font16,
    fontFamily: fonts.fontFamily.semiBold,
    lineHeight: 19,
  },
  price: {
    fontSize: fonts.size.font14,
    fontFamily: fonts.fontFamily.medium,
    color: "#8E8E93",
  },
  bar: {
    position: "absolute",
    width: 4,
    height: 40,
    backgroundColor: "#378FFF",
    borderTopRightRadius: 100,
    borderBottomRightRadius: 100,
  },
  menuFrame: {
    position: "absolute",
    right: 40,
    backgroundColor: "#FFFFFF",
    paddingVertical: 8,
    borderRadius: 8,
  },

  sheetTitle: {
    fontSize: fonts.size.font16,
    fontFamily: fonts.fontFamily.medium,
    marginBottom: 18,
  },
});
