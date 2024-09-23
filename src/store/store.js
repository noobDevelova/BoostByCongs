import { configureStore } from "@reduxjs/toolkit";
import heroReducer from "./heroes/heroesSlice";
import userPersistedReducer from "./user/userSlice";
import authReducer from "./auth/authSlice";
import rankCatalogReducer from "./ranks/ranksSlice";
import orderReducer from "./orders/orderSlice";
import persistStore from "redux-persist/es/persistStore";

const store = configureStore({
  reducer: {
    auth: authReducer,
    heroData: heroReducer,
    userData: userPersistedReducer,
    rankCatalogData: rankCatalogReducer,
    orderData: orderReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

export default store;
