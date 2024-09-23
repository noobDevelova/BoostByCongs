import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import matrics from "../../../utilities/screenDimensions";

const HeroesPagination = ({
  filteredItems,
  handleSelectHero,
  selectedHeroes,
}) => {
  const numColumns = 6;
  const itemWidth = (matrics.screenWidth - (numColumns + 1) * 10) / numColumns;
  return (
    <View style={styles.container}>
      <FlatList
        style={styles.listContainer}
        ListFooterComponent={
          <View
            style={[
              selectedHeroes.length > 0 ? { height: 20 } : { height: 20 },
            ]}
          />
        }
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        data={filteredItems}
        keyExtractor={(item, index) => index.toString()}
        numColumns={numColumns}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleSelectHero(item)}>
            <View style={[styles.card, { width: itemWidth }]}>
              <Image
                style={[
                  styles.dataImage,
                  selectedHeroes.some((hero) => hero.heroid === item.heroid) &&
                    styles.selectedCard,
                ]}
                source={{ uri: "https:" + item.img }}
              />
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default HeroesPagination;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    flex: 1,
  },

  listContainer: {
    paddingTop: 10,
    paddingBottom: 100,
  },

  selectedCard: {
    borderWidth: 4,
    borderColor: "#378FFF",
    borderRadius: 100,
  },

  dataImage: {
    width: 52,
    height: 52,
    borderRadius: 50,
  },

  card: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    gap: 10,
    margin: 3,
  },
});
