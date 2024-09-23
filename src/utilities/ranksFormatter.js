import {
  Elite,
  Epic,
  Grandmaster,
  Legend,
  Master,
  Mythic,
  MythicGlory,
  MythicHonor,
  MythicImmortal,
  Warrior,
} from "../assets/img";

export const rankIcon = (rank, width) => {
  const icons = {
    Warrior: <Warrior width={width} />,
    Elite: <Elite width={width} />,
    Master: <Master width={width} />,
    Grandmaster: <Grandmaster width={width} />,
    Epic: <Epic width={width} />,
    Legend: <Legend width={width} />,
    Mythic: <Mythic width={width} />,
    "Mythic Honor": <MythicHonor width={width} />,
    "Mythic Glory": <MythicGlory width={width} />,
    "Mythic Immortal": <MythicImmortal width={width} />,
  };

  return icons[rank];
};

const rankMappings = [
  { key: "Master", value: "Master" },
  { key: "Grandmaster", value: "Grandmaster" },
  { key: "Epic", value: "Epic" },
  { key: "Legend", value: "Legend" },
  { key: "Mythic Honor", value: "Mythic Honor" },
  { key: "Mythic Glory", value: "Mythic Glory" },
  { key: "Mythic Immortal", value: "Mythic Immortal" },
  { key: "Mythic", value: "Mythic" },
];

export const formatForProduct = (rank) => {
  const splitted = rank.split("-").map((s) => s.trim());
  const extractText = (str) => str.replace(/\s*\(.*?\)\s*/g, "").trim();

  let firstIcon = "";
  let secondIcon = "";

  if (splitted.length > 0) {
    firstIcon = extractText(splitted[0]);
  }

  if (splitted.length > 1) {
    secondIcon = extractText(splitted[1]);
  }

  return { firstIcon, secondIcon };
};

export const formatForUnit = (rank) => {
  let mapping = rankMappings.find((item) => item.key === rank);
  if (mapping) {
    return mapping.value;
  }

  mapping = rankMappings.find((item) => rank.includes(item.key));
  return mapping ? rankIcon[mapping.value] : null;
};

export const formatRank = (productType, itemName) => {
  if (productType === "unit" || !itemName.includes("-")) {
    return formatForUnit(itemName);
  } else {
    return formatForProduct(itemName);
  }
};
