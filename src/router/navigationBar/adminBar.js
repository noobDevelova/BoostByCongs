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
import {
  Dashboard,
  Product,
  AdminProfile,
  BoostingOrder,
} from "../../pages/admin";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Tab = createBottomTabNavigator();

export const AdminTabs = () => {
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
        name="Dashboard"
        component={Dashboard}
        options={{
          tabBarLabel: "Dashboard",
          tabBarIcon: ({ color, size, focused }) =>
            focused ? <DashboardActive /> : <DashboardOff />,
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Products"
        component={Product}
        options={{
          tabBarLabel: "Produk",
          tabBarIcon: ({ color, size, focused }) =>
            focused ? <ProductActive /> : <ProductOff />,
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Orders"
        component={BoostingOrder}
        options={{
          tabBarLabel: "Orders",
          tabBarIcon: ({ color, size, focused }) =>
            focused ? <OrderActive /> : <OrderOff />,
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Profil"
        component={AdminProfile}
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
