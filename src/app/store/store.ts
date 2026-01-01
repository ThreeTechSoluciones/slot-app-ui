import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storageSession from "redux-persist/lib/storage/session";
import { AuthService } from "../services/AuthService";
import { errorHandler } from "../errorHandler/errorHandler";
import { UserService } from "../services/UserService";
import { StudentService } from "../services/StudentService";
import { PriceService } from "../services/PriceService";
import { PlanService } from "../services/PlanService";
import { authSlice } from "../slices/AuthSlice";
import { MonthlyFeeService } from "../services/MonthlyFeeService";
import { PaymentService } from "../services/PaymentService";
import { SlotService } from "../services/SlotService";

const reducers = combineReducers({
  [AuthService.reducerPath]: AuthService.reducer,
  [UserService.reducerPath]: UserService.reducer,
  [StudentService.reducerPath]: StudentService.reducer,
  [PriceService.reducerPath]: PriceService.reducer,
  [PlanService.reducerPath]: PlanService.reducer,
  [MonthlyFeeService.reducerPath]: MonthlyFeeService.reducer,
  [PaymentService.reducerPath]: PaymentService.reducer,
  [SlotService.reducerPath]: SlotService.reducer,
  [authSlice.reducerPath]: authSlice.reducer,
});

const persistConfig = {
  key: "root",
  version: 1,
  storage: storageSession,
  whitelist: ["auth"],
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })
      .concat(errorHandler)
      .concat(AuthService.middleware)
      .concat(UserService.middleware)
      .concat(StudentService.middleware)
      .concat(PriceService.middleware)
      .concat(PlanService.middleware),
      .concat(MonthlyFeeService.middleware)
      .concat(PaymentService.middleware),
      .concat(SlotService.middleware),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
