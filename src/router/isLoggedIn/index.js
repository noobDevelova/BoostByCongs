import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUserDetail,
  fetchUserIngameAccount,
  fetchUserOrders,
} from "../../store/user/thunks";
import { ActivityIndicator, View, Text } from "react-native";
import { CustomerStack } from "../customerStack";
import { AdminStack } from "../adminStack";
import { fetchRankCatalog } from "../../store/ranks/thunks";
import {
  fetchAdminDeviceToken,
  fetchAllOrderData,
} from "../../store/orders/thunks";
import { fetchHeroesData } from "../../store/heroes/thunks";
import LottieView from "lottie-react-native";
import matrics from "../../utilities/screenDimensions";

const LoggedIn = () => {
  const loading = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const { userDetail, userLoading, userError } = useSelector(
    (state) => state.userData
  );
  const { orderLoading, adminDeviceToken } = useSelector(
    (state) => state.orderData
  );
  const { heroesLoading } = useSelector((state) => state.heroData);
  const { rankLoading } = useSelector((state) => state.rankCatalogData);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        await dispatch(fetchUserDetail()).unwrap();
        await dispatch(fetchUserIngameAccount()).unwrap();
        await dispatch(fetchRankCatalog()).unwrap();
        await dispatch(fetchAllOrderData()).unwrap();
        await dispatch(fetchHeroesData()).unwrap();
        await dispatch(fetchAdminDeviceToken()).unwrap();
        await dispatch(fetchUserOrders()).unwrap();
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
        console.log(adminDeviceToken);
      }
    };

    fetchData();
  }, [dispatch]);

  if (isLoading || userLoading || heroesLoading || rankLoading) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          // justifyContent: "center",
          paddingHorizontal: 16,
        }}
      >
        <LottieView
          autoPlay
          style={{
            width: matrics.screenWidth - 51,
            height: matrics.screenHeight - 100,
          }}
          ref={loading}
          source={require("../../assets/animation/skeleton.json")}
        />
      </View>
    );
  }

  if (userError) {
    return (
      <View>
        <Text>Error: {userError}</Text>
      </View>
    );
  }

  if (userDetail?.role === "admin") {
    return <AdminStack />;
  } else if (userDetail?.role === "customer") {
    return <CustomerStack />;
  }

  return null;
};

export default LoggedIn;
