import { captureRef } from "react-native-view-shot";

export const captureComponent = async (capturedRef, setFile) => {
  try {
    const resultFile = await captureRef(capturedRef);

    console.log(resultFile);

    setFile(resultFile);

    return resultFile;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
