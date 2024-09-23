import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import ListFrame from "../../List/ListFrame";
import ListBox from "../../List/ListBox";
import ListItem from "../../List/ListItem";
import {
  Facebook,
  GooglePlay,
  Moonton,
  Star,
  Tiktok,
  Vk,
} from "../../../assets/icon";
import fonts from "../../../utilities/fonts";

const IngameDetailLayout = ({ data }) => {
  useEffect(() => {
    console.log(JSON.stringify(data, 0, 2));
  }, []);

  const loginMethodIcon = {
    TikTok: <Tiktok />,
    VK: <Vk />,
    Moonton: <Moonton />,
    Facebook: <Facebook />,
    "Google Play": <GooglePlay />,
  };

  return (
    <View style={styles.container}>
      <ListFrame header="Akun Ingame">
        <ListBox>
          <ListItem
            iconName={data?.rank}
            productType="unit"
            isDivide={false}
            value={data?.rank}
            optionalLabel={`Tier: ${data?.tier}`}
            IconLabel={Star}
            anotherValue={data?.star}
            type="acc"
          />
        </ListBox>
        <ListBox>
          <ListItem label="Nickname" value={data?.nickname} isDivide={true} />
          <ListItem label="User ID" value={data?.user_id} isDivide={false} />
        </ListBox>
      </ListFrame>

      <ListFrame header="Metode Log In">
        <ListBox>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text style={styles.label}>Log In Via</Text>
            <View
              style={{ flexDirection: "row", gap: 5, alignItems: "center" }}
            >
              {loginMethodIcon[data?.login_via]}
              <Text style={styles.value}>{data?.login_via}</Text>
            </View>
          </View>
        </ListBox>
      </ListFrame>

      <ListFrame header="Authentikasi Akun">
        <ListBox>
          <ListItem label="Email" value={data?.email} isDivide={true} />
          <ListItem label="Password" value={data?.password} isDivide={false} />
        </ListBox>
      </ListFrame>
    </View>
  );
};

export default IngameDetailLayout;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 16,
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
});
