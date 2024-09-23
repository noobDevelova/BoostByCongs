import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LinearBtn from "../../../../components/Button";
import { updateTemporaryOrder } from "../../../../store/user/thunks";
import HeroesHeader from "../../../../components/Header/HeroesHeader";
import HeroesPagination from "../../../../components/Paginations/HeroesPagination";
import { OrderSheet } from "../../../../components";

const RequestHero = () => {
  const listHeroes = useSelector((state) => state.heroData.heroesItems);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRole, setSelectedRole] = useState("Semua");
  const dispatch = useDispatch();
  const temporaryData = useSelector((state) => state.userData.temporaryOrder);
  const [selectedHeroes, setSelectedHeroes] = useState([]);
  const sheetRef = useRef(null);

  useEffect(() => {
    // Inisialisasi selectedHeroes dengan data dari temporaryData
    if (temporaryData?.order_detail?.request_hero) {
      setSelectedHeroes(temporaryData.order_detail.request_hero);
    }
  }, [temporaryData]);

  const handleSelectHero = (hero) => {
    if (selectedHeroes.some((item) => item.heroid === hero.heroid)) {
      setSelectedHeroes(
        selectedHeroes.filter((item) => item.heroid !== hero.heroid)
      );
    } else if (selectedHeroes.length < 3) {
      setSelectedHeroes([...selectedHeroes, hero]);
    }
  };

  const filteredItems = listHeroes.filter(
    (item) =>
      (selectedRole === "Semua" ||
        item.role.toLowerCase() === selectedRole.toLowerCase()) &&
      (item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.role.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const storeHeroData = async () => {
    const pickedHero = { order_detail: { request_hero: selectedHeroes } };
    await dispatch(updateTemporaryOrder(pickedHero));
    sheetRef.current?.open();
  };

  return (
    <View style={styles.container}>
      <HeroesHeader
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedRole={selectedRole}
        setSelectedRole={setSelectedRole}
      />

      <HeroesPagination
        filteredItems={filteredItems}
        handleSelectHero={handleSelectHero}
        selectedHeroes={selectedHeroes}
      />

      <View style={styles.btnWrapper}>
        <LinearBtn title="Lanjut" onPress={() => storeHeroData()} />
      </View>
      <OrderSheet ref={sheetRef} />
    </View>
  );
};

export default RequestHero;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },

  btnWrapper: {
    paddingHorizontal: 16,
    marginBottom: 10,
  },
});
