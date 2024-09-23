import * as Sharing from "expo-sharing";

export const shareFile = async (file, orderId) => {
  try {
    await Sharing.shareAsync(file, {
      dialogTitle: `Share Order ${orderId}`,
    });
  } catch (error) {
    console.log(error);
  }
};
