import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Login, Register } from "../../pages";
import ForgotPassword from "../../pages/ForgotPassword";

const Stack = createNativeStackNavigator();

const LoggedOut = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ForgotPassword"
        component={ForgotPassword}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default LoggedOut;
