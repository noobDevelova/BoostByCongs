import { StyleSheet, View } from "react-native";
import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
} from "react";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { Portal, PortalHost } from "@gorhom/portal";

const SheetFrame = forwardRef(({ children, optionalSnapPoints }, ref) => {
  // const snapPoints = useMemo(() => [60, "50%", "80%"], []);

  const bottomSheetRef = useRef(null);

  const renderBackdrop = useCallback(
    (props) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        opacity={0.4}
      />
    ),
    []
  );

  useImperativeHandle(ref, () => ({
    open: () => bottomSheetRef.current?.expand(),
    close: () => bottomSheetRef.current?.close(),
  }));

  return (
    <>
      <Portal>
        <BottomSheet
          // snapPoints={snapPoints}
          ref={bottomSheetRef}
          enablePanDownToClose
          index={-1}
          backdropComponent={renderBackdrop}
          style={styles.container}
          enableDynamicSizing
          animateOnMount={false}
          keyboardBehavior="interactive"
        >
          <BottomSheetView style={styles.sheetContainer}>
            {children}
          </BottomSheetView>
        </BottomSheet>
      </Portal>
      <PortalHost name="sheet_host" />
    </>
  );
});

export default SheetFrame;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingTop: 10,
  },
  sheetContainer: {
    paddingHorizontal: 12,
    // flex: 1,
    paddingBottom: 26,
  },
});
