const rankData = [
  {
    rankName: "Master",
    tier: ["IV", "III", "II", "I"],
    neededStarPerTier: 5,
  },
  {
    rankName: "Grandmaster",
    tier: ["V", "IV", "III", "II", "I"],
    neededStarPerTier: 5,
  },
  {
    rankName: "Epic",
    tier: ["V", "IV", "III", "II", "I"],
    neededStarPerTier: 5,
  },
  {
    rankName: "Legend",
    tier: ["V", "IV", "III", "II", "I"],
    neededStarPerTier: 5,
  },
  {
    rankName: "Mythic",
    maxStar: 25,
  },
  {
    rankName: "Mythic Honor",
    maxStar: 50,
  },
  {
    rankName: "Mythic Glory",
    maxStar: 100,
  },
];

const rankOrder = rankData.map((rank) => rank.rankName);

export const calculateStarsNeeded = (
  currentRank,
  currentTier,
  currentStars,
  targetRank
) => {
  const currentRankIndex = rankOrder.indexOf(currentRank);
  const targetRankIndex = rankOrder.indexOf(targetRank);

  if (targetRankIndex < currentRankIndex) {
    return {
      success: false,
      message: "Boost yang dipilih lebih rendah dari rank akun anda",
    };
  } else if (targetRankIndex - currentRankIndex > 1) {
    return {
      success: false,
      message: "Hanya bisa boost dengan rank yang sama",
    };
  } else if (targetRankIndex > currentRankIndex) {
    return {
      success: false,
      message: "Boost yang dipilih lebih tinggi rank akun anda",
    };
  }

  let totalStars = 1;

  for (let rank of rankData) {
    if (rank.rankName === currentRank) {
      if (rank.tier) {
        const tierIndex = rank.tier.indexOf(currentTier);
        totalStars +=
          (rank.tier.length - tierIndex - 1) * rank.neededStarPerTier +
          (rank.neededStarPerTier - currentStars);
      } else {
        totalStars += rank.maxStar - currentStars;
      }
    }
  }

  return {
    success: true,
    data: totalStars,
  };
};

export const validateRank = (currentRank, targetRank) => {
  const ranks = [
    "Master",
    "Grandmaster",
    "Epic",
    "Legend",
    "Mythic",
    "Mythic Honor",
    "Mythic Glory",
    "Mythic Immortal",
  ];

  const firstPosition = ranks.indexOf(targetRank[0]);
  const secondPosition = ranks.indexOf(targetRank[1]);
  const currentRankPosition = ranks.indexOf(currentRank);

  if (
    currentRankPosition < firstPosition ||
    currentRankPosition > secondPosition
  ) {
    return {
      valid: false,
      message: "Posisi rank anda kurang / melebihi boosting yang dituju.",
    };
  } else {
    return {
      valid: true,
    };
  }
};
