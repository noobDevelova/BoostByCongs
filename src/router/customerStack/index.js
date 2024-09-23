import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { CustomerTabs } from "../navigationBar/customerBar";
import {
  Privasi,
  EmailSettings,
  PasswordSettings,
  PhoneNumberSetting,
  MainInGame,
  AddInGameAccount,
  EditInGameAccount,
  RequestHero,
  Checkout,
  ListBoosting,
  OrderDetailScreen,
  SuccessOrder,
  InvoiceScreen,
  IngameDetail,
} from "../../pages/customer";
const Stack = createNativeStackNavigator();

export const CustomerStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="CustomerTabs"
        component={CustomerTabs}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Privasi"
        component={Privasi}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="EmailSetting"
        component={EmailSettings}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PasswordSettings"
        component={PasswordSettings}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PhoneNumberSetting"
        component={PhoneNumberSetting}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="InGame"
        component={MainInGame}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AddInGameAccount"
        component={AddInGameAccount}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="EditInGameAccount"
        component={EditInGameAccount}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="RequestHero"
        component={RequestHero}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Checkout"
        component={Checkout}
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <Stack.Screen
        name="ListBoosting"
        component={ListBoosting}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="OrderDetail"
        component={OrderDetailScreen}
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <Stack.Screen
        name="SuccessOrder"
        component={SuccessOrder}
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <Stack.Screen
        name="Invoice"
        component={InvoiceScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="InGameDetail"
        component={IngameDetail}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};
