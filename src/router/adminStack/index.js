import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AdminTabs } from "../navigationBar/adminBar";
import {
  PrivasiAdmin,
  EmailAdminSettings,
  ListRank,
  OrderDetail,
  IngameDetail,
} from "../../pages/admin";

const Stack = createNativeStackNavigator();

export const AdminStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="AdminTabs"
        component={AdminTabs}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PrivasiAdmin"
        component={PrivasiAdmin}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="EmailAdminSettings"
        component={EmailAdminSettings}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ListRank"
        component={ListRank}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="OrderDetail"
        component={OrderDetail}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="IngameDetail"
        component={IngameDetail}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};
