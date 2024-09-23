import { NavigationContainer } from "@react-navigation/native";
import { useEffect } from "react";
import * as Fonts from "expo-font";
import { LoggedIn, LoggedOut } from "./src/router";
import { onAuthStateChanged } from "firebase/auth";
import { FIREBASE_AUTH } from "./src/config";
import { Provider } from "react-redux";
import store, { persistor } from "./src/store/store.js";
import { ActivityIndicator } from "react-native";
import { CUSTOM_FONTS } from "./src/hooks/useFonts.js";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "./src/store/auth/authSlice.js";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { createNotifications } from "react-native-notificated";
import { notificationConfig } from "./src/utilities/notificationConfig.js";
import * as Notifications from "expo-notifications";
import { PersistGate } from "redux-persist/integration/react";
import { PortalProvider } from "@gorhom/portal";

const { NotificationsProvider } = createNotifications(notificationConfig);

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

const AppWrapper = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (user) => {
      console.log("onAuthStateChanged called with user: ", user);
      dispatch(setUser(user));
    });

    return () => {
      unsubscribe();
    };
  }, [dispatch]);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <PortalProvider>
        <NavigationContainer>
          <NotificationsProvider />
          {isAuthenticated ? <LoggedIn /> : <LoggedOut />}
        </NavigationContainer>
      </PortalProvider>
    </GestureHandlerRootView>
  );
};

export default function App() {
  const [fontsLoaded] = Fonts.useFonts(CUSTOM_FONTS);

  if (!fontsLoaded) {
    return <ActivityIndicator />;
  }

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <StatusBar barStyle="light-content" style="dark" />
        <AppWrapper />
      </PersistGate>
    </Provider>
  );
}
