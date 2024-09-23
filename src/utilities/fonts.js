import Metrics from "./screenDimensions";

const size = {
  font10: Metrics.screenWidth * (10 / 375),
  font12: Metrics.screenWidth * (12 / 375),
  font14: Metrics.screenWidth * (14 / 375),
  font16: Metrics.screenWidth * (16 / 375),
  font18: Metrics.screenWidth * (18 / 375),
  font20: Metrics.screenWidth * (20 / 375),
  font22: Metrics.screenWidth * (22 / 375),
  font24: Metrics.screenWidth * (24 / 375),
  font26: Metrics.screenWidth * (26 / 375),
  font28: Metrics.screenWidth * (28 / 375),
  font30: Metrics.screenWidth * (30 / 375),
  font32: Metrics.screenWidth * (32 / 375),
  font34: Metrics.screenWidth * (34 / 375),
  font36: Metrics.screenWidth * (36 / 375),
  font38: Metrics.screenWidth * (38 / 375),
};

const fontFamily = {
  extraBold: "Inter-ExtraBold",
  semiBold: "Inter-SemiBold",
  regular: "Inter-Regular",
  bold: "Inter-Bold",
  medium: "Inter-Medium",
};

export default { size, fontFamily };
