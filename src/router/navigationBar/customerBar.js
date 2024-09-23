import {
  DashboardActive,
  DashboardOff,
  ProductActive,
  ProductOff,
  ProfileActive,
  ProfileOff,
  OrderActive,
  OrderOff,
} from "../../assets/icon";
import { Beranda, Pembelian, CustomerProfile } from "../../pages/customer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Tab = createBottomTabNavigator();

export const CustomerTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "#378FFF",
        tabBarStyle: {
          paddingTop: 9,
          paddingBottom: 9,
          borderTopWidth: 1,
          borderTopColor: "#8E8E93",
          height: 55,
        },
        tabBarLabelStyle: {
          marginTop: 5,
        },
      }}
    >
      <Tab.Screen
        name="Beranda"
        component={Beranda}
        options={{
          tabBarLabel: "Beranda",
          tabBarIcon: ({ color, size, focused }) =>
            focused ? <DashboardActive /> : <DashboardOff />,
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Pembelian"
        component={Pembelian}
        options={{
          tabBarLabel: "Pembelian",
          tabBarIcon: ({ color, size, focused }) =>
            focused ? <OrderActive /> : <OrderOff />,
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Profil"
        component={CustomerProfile}
        options={{
          tabBarLabel: "Profil",
          tabBarIcon: ({ color, size, focused }) =>
            focused ? <ProfileActive /> : <ProfileOff />,
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};
